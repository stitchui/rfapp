import { useState, useMemo, useRef, useCallback, useEffect } from 'react';
import { Button, Box, Typography, Snackbar, Paper } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import { AppHeader } from '../../components/AppHeader';
import { RfmGrid } from './RfmGrid';
import { buildFlatRows } from './buildFlatRows';
import { buildInitialTree, indexRfRows, insertCurve } from './mockData';
import {
  ArchiveCurveDialog, ArchiveRowDialog, DiscardDialog, CreateDialog,
} from './dialogs';
import type {
  RfRow, TreeNode, DialogState, CreateState,
  RfmGridContext, EditablePreset, PRESET_FIELDS as _PF,
} from './types';
import { PRESET_FIELDS } from './types';

// ---- Props (configurable like the design's "tweak presets") ----
interface Props {
  editablePreset?: EditablePreset;
  enableRowArchive?: boolean;
  showApiPreview?: boolean;
  dirtyTint?: string;
}

const DEFAULT_PRESET: EditablePreset = 'All four (Future Tenor, Term, Shock, Tenor Dim)';

let _nextId = 900001;

export default function RiskFactorMappings({
  editablePreset = DEFAULT_PRESET,
  enableRowArchive = true,
  showApiPreview = true,
  dirtyTint = '#eef7e0',
}: Props) {
  // Mutable refs for tree data (mutated in place on archive/create)
  const treeRef    = useRef(buildInitialTree());
  const rfByIdRef  = useRef<Record<number, RfRow>>(indexRfRows(treeRef.current));
  const archivedCurvesRef = useRef<Set<string>>(new Set());
  const archivedRowsRef   = useRef<Set<number>>(new Set());
  // Triggers re-render when tree structure changes
  const [treeVersion, setTreeVersion] = useState(0);

  // Grid / edit state
  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    'IR': true, 'IR>Base': true, 'IR>Base>OTC': true, 'IR>Base>OTC>AED': true,
  });
  const [editingCurveId, setEditingCurveId] = useState<string | null>(null);
  const [edits, setEdits] = useState<Record<number, Partial<RfRow>>>({});
  const [busy, setBusy] = useState(false);

  // Dialog / snack state
  const [dialog, setDialog] = useState<DialogState | null>(null);
  const [snack, setSnack] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);
  const [lastRequest, setLastRequest] = useState<{ method: string; url: string; body: unknown } | null>(null);

  // Create dialog
  const [create, setCreate] = useState<CreateState>({
    cls: 'IR', sub: 'Base', typ: 'OTC', curve: 'Swap',
    fetched: false, items: [], selected: {},
  });

  const editableFields = PRESET_FIELDS[editablePreset] ?? PRESET_FIELDS[DEFAULT_PRESET];

  // ---- Changed rows computation ----
  const changedCount = useMemo(() => {
    return Object.keys(edits).reduce((count, idStr) => {
      const rfId = parseInt(idStr);
      const orig = rfByIdRef.current[rfId];
      if (!orig) return count;
      const e = edits[rfId];
      const changed = e && Object.keys(e).some(f => String(e[f as keyof typeof e]) !== String(orig[f as keyof RfRow]));
      return changed ? count + 1 : count;
    }, 0);
  }, [edits]);

  // ---- Flat row data for AG Grid ----
  const rowData = useMemo(() => buildFlatRows({
    tree: treeRef.current,
    expanded,
    editingCurveId,
    edits,
    archivedCurves: archivedCurvesRef.current,
    archivedRows: archivedRowsRef.current,
    editableFields,
    enableRowArchive,
    busy,
    changedCount,
    rfById: rfByIdRef.current,
  }), [expanded, editingCurveId, edits, editableFields, enableRowArchive, busy, changedCount, treeVersion]); // eslint-disable-line react-hooks/exhaustive-deps

  // ---- Snackbar helper ----
  const snackTimerRef = useRef<ReturnType<typeof setTimeout>>();
  const showSnack = useCallback((msg: string, type: 'success' | 'error' = 'success') => {
    clearTimeout(snackTimerRef.current);
    setSnack({ msg, type });
    snackTimerRef.current = setTimeout(() => setSnack(null), 3600);
  }, []);
  useEffect(() => () => clearTimeout(snackTimerRef.current), []);

  // ---- Grid context callbacks ----
  const onToggle = useCallback((key: string) => {
    setExpanded(prev => ({ ...prev, [key]: !prev[key] }));
  }, []);

  const onStartEdit = useCallback((curveKey: string) => {
    if (editingCurveId && editingCurveId !== curveKey && changedCount > 0) {
      setDialog({ type: 'discard', nextCurve: curveKey });
      return;
    }
    setEditingCurveId(curveKey);
    setEdits({});
  }, [editingCurveId, changedCount]);

  const onCancelEdit = useCallback(() => {
    setEditingCurveId(null);
    setEdits({});
  }, []);

  const getChangedRows = useCallback((): RfRow[] => {
    return Object.keys(edits).reduce<RfRow[]>((out, idStr) => {
      const rfId = parseInt(idStr);
      const orig = rfByIdRef.current[rfId];
      if (!orig) return out;
      const e = edits[rfId];
      const changed = e && Object.keys(e).some(f => String(e[f as keyof typeof e]) !== String(orig[f as keyof RfRow]));
      if (changed) out.push({ ...orig, ...e, rfId: orig.rfId });
      return out;
    }, []);
  }, [edits]);

  const onSave = useCallback(() => {
    const changed = getChangedRows();
    if (!changed.length) return;
    setBusy(true);
    setLastRequest({ method: 'POST', url: '/riskfactor/mappings/edit', body: changed });
    setTimeout(() => {
      changed.forEach(row => {
        const o = rfByIdRef.current[row.rfId];
        if (o) Object.assign(o, row);
      });
      setBusy(false);
      setEditingCurveId(null);
      setEdits({});
      showSnack(`${changed.length} risk factor${changed.length > 1 ? 's' : ''} updated`);
    }, 900);
  }, [getChangedRows, showSnack]);

  const onEditCell = useCallback((rfId: number, field: string, value: string) => {
    setEdits(prev => ({
      ...prev,
      [rfId]: { ...prev[rfId], [field]: value },
    }));
  }, []);

  const onArchiveCurve = useCallback((key: string, node: TreeNode) => {
    setDialog({ type: 'archiveCurve', curveKey: key, curveNode: node });
  }, []);

  const onArchiveRow = useCallback((rfData: RfRow) => {
    setDialog({ type: 'archiveRow', rfData });
  }, []);

  const gridContext = useMemo<RfmGridContext>(() => ({
    onToggle, onStartEdit, onCancelEdit, onSave, onEditCell,
    onArchiveCurve, onArchiveRow, dirtyTint,
  }), [onToggle, onStartEdit, onCancelEdit, onSave, onEditCell, onArchiveCurve, onArchiveRow, dirtyTint]);

  // ---- Dialog handlers ----
  const closeDialog = useCallback(() => {
    if (!busy) setDialog(null);
  }, [busy]);

  const confirmArchiveCurve = useCallback(() => {
    if (!dialog?.curveKey || !dialog.curveNode?.curve) return;
    const curveKey = dialog.curveKey;
    const curveNode = dialog.curveNode;
    const body = curveNode.curve!;
    setBusy(true);
    setLastRequest({ method: 'POST', url: '/riskfactor/mappings/archive-curve', body });
    setTimeout(() => {
      archivedCurvesRef.current.add(curveKey);
      const newEditingId = editingCurveId === curveKey ? null : editingCurveId;
      setBusy(false);
      setDialog(null);
      setEditingCurveId(newEditingId);
      setTreeVersion(v => v + 1);
      showSnack(`Curve "${body.curveNm}" archived`);
    }, 900);
  }, [dialog, editingCurveId, showSnack]);

  const confirmArchiveRow = useCallback(() => {
    if (!dialog?.rfData) return;
    const { rfData } = dialog;
    setBusy(true);
    setLastRequest({ method: 'POST', url: '/riskfactor/mappings/archive-row', body: { rfId: rfData.rfId } });
    setTimeout(() => {
      archivedRowsRef.current.add(rfData.rfId);
      setBusy(false);
      setDialog(null);
      setTreeVersion(v => v + 1);
      showSnack(`Risk factor ${rfData.rfId} archived`);
    }, 800);
  }, [dialog, showSnack]);

  const confirmDiscard = useCallback(() => {
    const next = dialog?.nextCurve ?? null;
    setEditingCurveId(next);
    setEdits({});
    setDialog(null);
  }, [dialog]);

  const confirmCreate = useCallback(() => {
    const chosen = create.items.filter(n => create.selected[n]);
    if (!chosen.length) return;
    const ccy = 'AED';
    const rows: RfRow[] = chosen.map(n => ({
      rfId: _nextId++,
      rfNm: n, altRfNm: '',
      rfClassCd: create.cls, rfSubclassCd: create.sub, rfTypeCd: create.typ,
      currencyCd: ccy, curveNm: create.curve, curveInstrumentTypeNm: create.curve,
      clearingHouseCd: 'LCH',
      futureTenorCd: '0', termCd: n.split('.').pop() ?? '',
      shockTypeCd: 'Absolute', tenorDimensionCd: '1',
      validFromTs: new Date().toISOString().slice(0, 10), validToTs: null, sourceNm: 'NEVA',
    }));
    setBusy(true);
    setLastRequest({ method: 'POST', url: '/riskfactor/mappings/create', body: rows });
    setTimeout(() => {
      insertCurve(treeRef.current, create.cls, create.sub, create.typ, ccy, create.curve, rows);
      rows.forEach(r => { rfByIdRef.current[r.rfId] = r; });
      const p = create.cls, p2 = `${p}>${create.sub}`, p3 = `${p2}>${create.typ}`, p4 = `${p3}>${ccy}`;
      setExpanded(prev => ({ ...prev, [p]: true, [p2]: true, [p3]: true, [p4]: true }));
      setBusy(false);
      setDialog(null);
      setTreeVersion(v => v + 1);
      showSnack(`${rows.length} risk factor${rows.length > 1 ? 's' : ''} created in ${create.curve}`);
    }, 900);
  }, [create, showSnack]);

  // ---- Create dialog helpers ----
  const openCreate = useCallback(() => {
    setCreate({ cls: 'IR', sub: 'Base', typ: 'OTC', curve: 'Swap', fetched: false, items: [], selected: {} });
    setDialog({ type: 'create' });
  }, []);

  const setCreateField = useCallback((field: keyof CreateState, value: string) => {
    setCreate(prev => ({ ...prev, [field]: value, fetched: false, items: [], selected: {} }));
  }, []);

  const fetchNeva = useCallback(() => {
    setBusy(true);
    setTimeout(() => {
      const ccy = 'AED';
      const tenors = ['2M', '3Y', '5Y', '10Y', '25Y'];
      const items = tenors.map(t => `USSTS.${create.cls}_${ccy}_${create.curve.replace(/[^A-Za-z0-9]/g, '')}.${t}`);
      const selected: Record<string, boolean> = {};
      items.forEach(n => { selected[n] = true; });
      setCreate(prev => ({ ...prev, fetched: true, items, selected }));
      setBusy(false);
    }, 700);
  }, [create.cls, create.curve]);

  const toggleCreateItem = useCallback((name: string) => {
    setCreate(prev => ({ ...prev, selected: { ...prev.selected, [name]: !prev.selected[name] } }));
  }, []);

  const toggleAll = useCallback(() => {
    setCreate(prev => {
      const allSelected = prev.items.every(n => prev.selected[n]);
      const selected: Record<string, boolean> = {};
      prev.items.forEach(n => { selected[n] = !allSelected; });
      return { ...prev, selected };
    });
  }, []);

  // ---- Render ----
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f4f4f4' }}>
      <AppHeader />

      <Box sx={{ maxWidth: 1480, mx: 'auto', px: '28px', pt: '26px', pb: '90px' }}>
        {/* Page header */}
        <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 2, mb: '18px' }}>
          <Typography variant="h1" sx={{
            fontSize: 26, fontWeight: 600, color: '#4c6a92', letterSpacing: '-0.01em', m: 0,
          }}>
            Risk Factor Mappings
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon sx={{ fontSize: 19 }} />}
            onClick={openCreate}
            sx={{
              height: 40, px: 2, borderRadius: 999, fontSize: 14, fontWeight: 600,
              bgcolor: '#004d2c', textTransform: 'none',
              '&:hover': { bgcolor: '#0a5c38' },
            }}
          >
            Create
          </Button>
        </Box>

        {/* Grid card */}
        <Paper elevation={0} sx={{
          border: '1px solid #e0e0e0', borderRadius: '18px',
          boxShadow: '0 2px 8px rgba(0,0,0,.08)', overflow: 'hidden',
        }}>
          <RfmGrid
            rowData={rowData}
            context={gridContext}
            editableFields={editableFields}
          />
        </Paper>

        {/* API preview panel */}
        {showApiPreview && lastRequest && (
          <Box sx={{ mt: '22px', bgcolor: '#0e1a13', borderRadius: '14px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,.08)' }}>
            <Box sx={{
              display: 'flex', alignItems: 'center', gap: '11px',
              p: '12px 16px', bgcolor: '#0a140f', borderBottom: '1px solid rgba(255,255,255,.07)',
            }}>
              <Box component="span" sx={{
                bgcolor: '#0a5c38', color: '#dff3df',
                fontFamily: "'Roboto Mono', monospace", fontSize: 11, fontWeight: 600,
                letterSpacing: '.06em', px: '9px', py: '3px', borderRadius: '6px',
              }}>
                {lastRequest.method}
              </Box>
              <Box component="span" sx={{ fontFamily: "'Roboto Mono', monospace", color: '#9fd3a8', fontSize: 13 }}>
                {lastRequest.url}
              </Box>
              <Box component="span" sx={{ ml: 'auto', color: '#5e7466', fontSize: 10.5, letterSpacing: '.1em', textTransform: 'uppercase' }}>
                Request payload
              </Box>
            </Box>
            <Box component="pre" sx={{
              m: 0, p: '16px 18px', color: '#cfe9d2',
              fontFamily: "'Roboto Mono', monospace", fontSize: 12.5, lineHeight: 1.6,
              overflow: 'auto', maxHeight: 300,
            }}>
              {JSON.stringify(lastRequest.body, null, 2)}
            </Box>
          </Box>
        )}
      </Box>

      {/* Dialogs */}
      <ArchiveCurveDialog
        open={dialog?.type === 'archiveCurve'}
        dialog={dialog}
        busy={busy}
        onCancel={closeDialog}
        onConfirm={confirmArchiveCurve}
      />
      <ArchiveRowDialog
        open={dialog?.type === 'archiveRow'}
        dialog={dialog}
        busy={busy}
        onCancel={closeDialog}
        onConfirm={confirmArchiveRow}
      />
      <DiscardDialog
        open={dialog?.type === 'discard'}
        busy={busy}
        onCancel={closeDialog}
        onConfirm={confirmDiscard}
      />
      <CreateDialog
        open={dialog?.type === 'create'}
        busy={busy}
        create={create}
        onCancel={closeDialog}
        onConfirm={confirmCreate}
        onSetField={setCreateField}
        onFetchNeva={fetchNeva}
        onToggleItem={toggleCreateItem}
        onToggleAll={toggleAll}
      />

      {/* Snackbar */}
      {snack && (
        <Box sx={{
          position: 'fixed', left: '50%', bottom: 30, zIndex: 1400,
          animation: 'rfm-pop .2s cubic-bezier(0.4,0,0.2,1)',
        }}>
          <Box sx={{
            display: 'flex', alignItems: 'center', gap: '10px',
            px: '20px', py: '13px', borderRadius: '12px',
            boxShadow: '0 6px 24px rgba(15,23,42,.14)', color: '#fff',
            bgcolor: snack.type === 'error' ? '#d96a4a' : '#0a5c38',
            transform: 'translateX(-50%)',
          }}>
            {snack.type === 'error'
              ? <ErrorIcon sx={{ fontSize: 21 }} />
              : <CheckCircleIcon sx={{ fontSize: 21 }} />
            }
            <Typography sx={{ fontFamily: 'inherit', fontSize: 14, fontWeight: 500 }}>
              {snack.msg}
            </Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
}
