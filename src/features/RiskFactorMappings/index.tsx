import { useState, useMemo, useRef, useCallback, useEffect } from 'react';
import {
  Button, Box, Typography, Paper,
  Dialog, DialogTitle, DialogContent, DialogActions,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import { AppHeader } from '../../components/AppHeader';
import { RfmGrid } from './RfmGrid';
import { CreateDialog } from './CreateDialog';
import { getRiskFactorMappings, saveRiskFactorMappings, archiveRiskFactorMappings } from '../../api/riskFactorApi';
import type { RfRow, RfmGridContext } from './types';

type DialogState =
  | { type: 'archiveCurve'; curveKey: string; rfIds: number[] }
  | { type: 'archiveRow'; rfId: number; name: string };

export default function RiskFactorMappings() {
  const allRowsRef = useRef<RfRow[]>([]);
  const rfByIdRef = useRef<Record<number, RfRow>>({});
  const archivedCurvesRef = useRef<Set<string>>(new Set());
  const archivedRowsRef = useRef<Set<number>>(new Set());

  const [treeVersion, setTreeVersion] = useState(0);
  const [createOpen, setCreateOpen] = useState(false);
  const [editingCurveKey, setEditingCurveKey] = useState<string | null>(null);
  const [edits, setEdits] = useState<Record<number, Partial<RfRow>>>({});
  const [busy, setBusy] = useState(false);
  const [dialog, setDialog] = useState<DialogState | null>(null);
  const [lastRequest, setLastRequest] = useState<{ method: string; url: string; body: unknown } | null>(null);
  const [snack, setSnack] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    getRiskFactorMappings().then(rows => {
      allRowsRef.current = rows;
      rows.forEach(r => { rfByIdRef.current[r.risk_factor_id] = r; });
      setTreeVersion(v => v + 1);
    });
  }, []);

  const snackTimerRef = useRef<ReturnType<typeof setTimeout>>();
  const showSnack = useCallback((msg: string, type: 'success' | 'error' = 'success') => {
    clearTimeout(snackTimerRef.current);
    setSnack({ msg, type });
    snackTimerRef.current = setTimeout(() => setSnack(null), 3600);
  }, []);
  useEffect(() => () => clearTimeout(snackTimerRef.current), []);

  // Filtered row data — excludes archived curves and rows
  const rowData = useMemo(() => allRowsRef.current.filter(r => {
    if (archivedRowsRef.current.has(r.risk_factor_id)) return false;
    const curveKey = r._path.slice(0, 5).join('>');
    if (archivedCurvesRef.current.has(curveKey)) return false;
    return true;
  }), [treeVersion]); // eslint-disable-line react-hooks/exhaustive-deps

  // ---- Edit callbacks ----
  const onStartEdit = useCallback((curveKey: string) => {
    setEditingCurveKey(curveKey);
    setEdits({});
  }, []);

  const onCancelEdit = useCallback(() => {
    setEditingCurveKey(null);
    setEdits({});
  }, []);

  const onEditCell = useCallback((rfId: number, field: string, value: string) => {
    setEdits(prev => ({ ...prev, [rfId]: { ...prev[rfId], [field]: value } }));
  }, []);

  const onSave = useCallback(async () => {
    if (!editingCurveKey) { onCancelEdit(); return; }
    const curveRows = allRowsRef.current.filter(r => r._path.slice(0, 5).join('>') === editingCurveKey);
    const payload = curveRows.reduce<object[]>((out, orig) => {
      const e = edits[orig.risk_factor_id];
      const dirty = e && Object.keys(e).some(f => String((e as any)[f]) !== String((orig as any)[f]));
      if (!dirty) return out;
      const { _path, ...rest } = { ...orig, ...e, risk_factor_id: orig.risk_factor_id };
      void _path;
      out.push(rest);
      return out;
    }, []);
    const dirtyCount = payload.length;
    setBusy(true);
    setLastRequest({ method: 'POST', url: '/var/riskfactor/mappings/save', body: payload });
    await saveRiskFactorMappings(payload);
    curveRows.forEach(orig => {
      const e = edits[orig.risk_factor_id];
      if (e) Object.assign(rfByIdRef.current[orig.risk_factor_id] ?? {}, e);
    });
    setBusy(false);
    setEditingCurveKey(null);
    setEdits({});
    showSnack(`${dirtyCount} risk factor${dirtyCount > 1 ? 's' : ''} updated`);
  }, [editingCurveKey, edits, onCancelEdit, showSnack]);

  // ---- Archive callbacks ----
  const onArchiveCurve = useCallback((curveKey: string, rfIds: number[]) => {
    setDialog({ type: 'archiveCurve', curveKey, rfIds });
  }, []);

  const onArchiveRow = useCallback((rfId: number, name: string) => {
    setDialog({ type: 'archiveRow', rfId, name });
  }, []);

  const confirmArchiveCurve = useCallback(async () => {
    if (dialog?.type !== 'archiveCurve') return;
    const { curveKey, rfIds } = dialog;
    setBusy(true);
    setLastRequest({ method: 'POST', url: '/var/riskfactor/mappings/archive', body: { risk_factor_ids: rfIds } });
    await archiveRiskFactorMappings({ risk_factor_ids: rfIds });
    archivedCurvesRef.current.add(curveKey);
    if (editingCurveKey === curveKey) setEditingCurveKey(null);
    setBusy(false);
    setDialog(null);
    setTreeVersion(v => v + 1);
    showSnack(`Curve archived`);
  }, [dialog, editingCurveKey, showSnack]);

  const confirmArchiveRow = useCallback(async () => {
    if (dialog?.type !== 'archiveRow') return;
    const { rfId } = dialog;
    setBusy(true);
    setLastRequest({ method: 'POST', url: '/var/riskfactor/mappings/archive', body: { risk_factor_ids: [rfId] } });
    await archiveRiskFactorMappings({ risk_factor_ids: [rfId] });
    archivedRowsRef.current.add(rfId);
    setBusy(false);
    setDialog(null);
    setTreeVersion(v => v + 1);
    showSnack(`Risk factor ${rfId} archived`);
  }, [dialog, showSnack]);

  const closeDialog = useCallback(() => { if (!busy) setDialog(null); }, [busy]);

  const onCreated = useCallback((rows: RfRow[]) => {
    rows.forEach(r => {
      allRowsRef.current.push(r);
      rfByIdRef.current[r.risk_factor_id] = r;
    });
    setTreeVersion(v => v + 1);
    showSnack(`${rows.length} risk factor${rows.length > 1 ? 's' : ''} created`);
  }, [showSnack]);

  // ---- Grid context ----
  const hasDirtyEdits = useMemo(() => {
    return Object.keys(edits).some(idStr => {
      const rfId = parseInt(idStr);
      const orig = rfByIdRef.current[rfId];
      if (!orig) return false;
      const e = edits[rfId];
      return e && Object.keys(e).some(f => String((e as any)[f]) !== String((orig as any)[f]));
    });
  }, [edits]);

  const gridContext = useMemo<RfmGridContext>(() => ({
    editingCurveKey,
    edits,
    onStartEdit,
    onCancelEdit,
    onSave,
    onEditCell,
    onArchiveCurve,
    onArchiveRow,
    busy,
    hasDirtyEdits,
    dirtyTint: '#eef7e0',
  }), [editingCurveKey, edits, onStartEdit, onCancelEdit, onSave, onEditCell, onArchiveCurve, onArchiveRow, busy, hasDirtyEdits]);

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f4f4f4' }}>
      <AppHeader />

      <Box sx={{ maxWidth: 1480, mx: 'auto', px: '28px', pt: '26px', pb: '90px' }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 2, mb: '18px' }}>
          <Typography variant="h1" sx={{ fontSize: 26, fontWeight: 600, color: '#4c6a92', letterSpacing: '-0.01em', m: 0 }}>
            Risk Factor Mappings
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon sx={{ fontSize: 19 }} />}
            onClick={() => setCreateOpen(true)}
            sx={{
              height: 40, px: 2, borderRadius: 999, fontSize: 14, fontWeight: 600,
              bgcolor: '#004d2c', textTransform: 'none',
              '&:hover': { bgcolor: '#0a5c38' },
            }}
          >
            Create
          </Button>
        </Box>

        <Paper elevation={0} sx={{ border: '1px solid #e0e0e0', borderRadius: '18px', boxShadow: '0 2px 8px rgba(0,0,0,.08)', overflow: 'hidden', p: '12px 16px' }}>
          <RfmGrid rowData={rowData} context={gridContext} />
        </Paper>

        {/* API preview panel */}
        {lastRequest && (
          <Box sx={{ mt: '22px', bgcolor: '#0e1a13', borderRadius: '14px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,.08)' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '11px', p: '12px 16px', bgcolor: '#0a140f', borderBottom: '1px solid rgba(255,255,255,.07)' }}>
              <Box component="span" sx={{ bgcolor: '#0a5c38', color: '#dff3df', fontFamily: "'Roboto Mono', monospace", fontSize: 11, fontWeight: 600, letterSpacing: '.06em', px: '9px', py: '3px', borderRadius: '6px' }}>
                {lastRequest.method}
              </Box>
              <Box component="span" sx={{ fontFamily: "'Roboto Mono', monospace", color: '#9fd3a8', fontSize: 13 }}>
                {lastRequest.url}
              </Box>
              <Box component="span" sx={{ ml: 'auto', color: '#5e7466', fontSize: 10.5, letterSpacing: '.1em', textTransform: 'uppercase' }}>
                Request payload
              </Box>
            </Box>
            <Box component="pre" sx={{ m: 0, p: '16px 18px', color: '#cfe9d2', fontFamily: "'Roboto Mono', monospace", fontSize: 12.5, lineHeight: 1.6, overflow: 'auto', maxHeight: 300 }}>
              {JSON.stringify(lastRequest.body, null, 2)}
            </Box>
          </Box>
        )}
      </Box>

      <CreateDialog open={createOpen} onClose={() => setCreateOpen(false)} onCreated={onCreated} />

      {/* Archive Curve dialog */}
      <Dialog open={dialog?.type === 'archiveCurve'} onClose={closeDialog} maxWidth="xs" fullWidth>
        <DialogTitle>Archive Curve</DialogTitle>
        <DialogContent>
          <Typography>
            Archive all {dialog?.type === 'archiveCurve' ? dialog.rfIds.length : 0} risk factors in this curve? This cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} disabled={busy}>Cancel</Button>
          <Button onClick={confirmArchiveCurve} disabled={busy} color="error" variant="contained">
            {busy ? 'Archiving…' : 'Archive'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Archive Row dialog */}
      <Dialog open={dialog?.type === 'archiveRow'} onClose={closeDialog} maxWidth="xs" fullWidth>
        <DialogTitle>Archive Risk Factor</DialogTitle>
        <DialogContent>
          <Typography>
            Archive <strong>{dialog?.type === 'archiveRow' ? dialog.name : ''}</strong>? This cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} disabled={busy}>Cancel</Button>
          <Button onClick={confirmArchiveRow} disabled={busy} color="error" variant="contained">
            {busy ? 'Archiving…' : 'Archive'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      {snack && (
        <Box sx={{ position: 'fixed', left: '50%', bottom: 30, zIndex: 1400, animation: 'rfm-pop .2s cubic-bezier(0.4,0,0.2,1)' }}>
          <Box sx={{
            display: 'flex', alignItems: 'center', gap: '10px',
            px: '20px', py: '13px', borderRadius: '12px',
            boxShadow: '0 6px 24px rgba(15,23,42,.14)', color: '#fff',
            bgcolor: snack.type === 'error' ? '#d96a4a' : '#0a5c38',
            transform: 'translateX(-50%)',
          }}>
            {snack.type === 'error' ? <ErrorIcon sx={{ fontSize: 21 }} /> : <CheckCircleIcon sx={{ fontSize: 21 }} />}
            <Typography sx={{ fontFamily: 'inherit', fontSize: 14, fontWeight: 500 }}>{snack.msg}</Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
}
