import { useMemo, useRef, useCallback, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Box, Button, IconButton, Paper, MenuItem } from '@mui/material';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import { AgGridReact } from 'ag-grid-react';
import type { ColDef, GetDataPath, GridApi, GridReadyEvent, IGroupCellRendererParams } from 'ag-grid-community';
import type { RfRow, RfmGridContext } from './types';

// ---- Curve-level inner renderer (label only; all actions are in Actions column) ----
function CurveInnerRenderer(params: any) {
  if (!params.node?.group) return null;
  return <span>{params.value}</span>;
}

// ---- Editable cell renderer for leaf rows ----
interface EditableCellProps {
  value: any;
  data: RfRow;
  context: RfmGridContext;
  field: string;
  type?: 'text' | 'select';
  options?: string[];
}

function EditableCell({ value, data, context: ctx, field, type = 'text', options }: EditableCellProps) {
  if (!data) return null;
  const curveKey = data._path.slice(0, 5).join('>');
  const isEditing = ctx.editingCurveKey === curveKey;
  const currentValue = (ctx.edits[data.risk_factor_id]?.[field as keyof RfRow] as string) ?? String(value ?? '');
  const orig = String((data as any)[field] ?? '');
  const isDirty = isEditing && currentValue !== orig;

  if (!isEditing) return <span>{String(value ?? '')}</span>;

  const inputSx = {
    width: '100%',
    boxSizing: 'border-box',
    px: '7px',
    py: '3px',
    borderRadius: '5px',
    border: isDirty ? '1.5px solid #1c8783' : '1px solid #ccc',
    bgcolor: isDirty ? '#eef7e0' : '#fff',
    fontSize: 13,
    outline: 'none',
    fontFamily: 'inherit',
  };

  if (type === 'select' && options) {
    return (
      <Box
        component="select"
        value={currentValue}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => ctx.onEditCell(data.risk_factor_id, field, e.target.value)}
        sx={inputSx}
      >
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </Box>
    );
  }

  return (
    <Box
      component="input"
      value={currentValue}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => ctx.onEditCell(data.risk_factor_id, field, e.target.value)}
      sx={inputSx}
    />
  );
}

function makeEditableRenderer(field: string, type: 'text' | 'select' = 'text', options?: string[]) {
  return (params: any) => (
    <EditableCell value={params.value} data={params.data} context={params.context} field={field} type={type} options={options} />
  );
}

// ---- Actions column: ⋮ menu for curve rows, Archive for leaf rows ----
function ActionsRenderer(params: any) {
  const [menuAnchor, setMenuAnchor] = useState<{ top: number; left: number } | null>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const ctx = params.context as RfmGridContext;
  const node = params.node;

  useEffect(() => {
    if (!menuAnchor) return;
    const handler = (e: MouseEvent) => {
      if (!btnRef.current?.contains(e.target as Node)) setMenuAnchor(null);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [menuAnchor]);

  // Curve-level group row → Save/Cancel when editing, ⋮ menu otherwise
  if (node.group && node.level === 4) {
    const curveKey = (node.getRoute?.() ?? []).join('>');
    const isEditing = ctx.editingCurveKey === curveKey;

    if (isEditing) {
      return (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', height: '100%', gap: '6px', pr: 1 }}>
          <Button
            size="small"
            disabled={ctx.busy}
            onClick={ctx.onCancelEdit}
            sx={{ fontSize: 12, textTransform: 'none', color: '#333', borderColor: '#ccc', minWidth: 0 }}
            variant="outlined"
          >
            Cancel
          </Button>
          <Button
            size="small"
            disabled={ctx.busy || !ctx.hasDirtyEdits}
            onClick={ctx.onSave}
            variant="contained"
            sx={{ fontSize: 12, textTransform: 'none', bgcolor: '#004d2c', fontWeight: 600, minWidth: 0, '&:hover': { bgcolor: '#0a5c38' }, '&.Mui-disabled': { bgcolor: '#004d2c', color: '#fff', opacity: 0.4 } }}
          >
            Save
          </Button>
        </Box>
      );
    }

    const rfIds: number[] = (node.allLeafChildren ?? [])
      .map((n: any) => n.data?.risk_factor_id)
      .filter((id: any) => id != null);

    const openMenu = (e: React.MouseEvent) => {
      e.stopPropagation();
      const rect = btnRef.current?.getBoundingClientRect();
      if (rect) setMenuAnchor({ top: rect.bottom + 4, left: rect.right - 148 });
    };

    return (
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', height: '100%', pr: 1 }}>
        <IconButton ref={btnRef} onClick={openMenu} size="small" sx={{ color: '#555', fontSize: 20, lineHeight: 1 }}>
          ⋮
        </IconButton>
        {menuAnchor && createPortal(
          <Paper
            elevation={3}
            sx={{ position: 'fixed', top: menuAnchor.top, left: menuAnchor.left, zIndex: 9999, minWidth: 148, borderRadius: 2, overflow: 'hidden' }}
            onMouseDown={e => e.stopPropagation()}
          >
            <MenuItem onClick={() => { ctx.onStartEdit(curveKey); setMenuAnchor(null); }} sx={{ fontSize: 13 }}>
              Edit
            </MenuItem>
            <MenuItem onClick={() => { ctx.onArchiveCurve(curveKey, rfIds); setMenuAnchor(null); }} sx={{ fontSize: 13, color: '#c0392b' }}>
              Archive Curve
            </MenuItem>
          </Paper>,
          document.body
        )}
      </Box>
    );
  }

  // Leaf row → Archive icon button
  const data = params.data as RfRow;
  if (!data || node.group) return null;
  const curveKey = data._path.slice(0, 5).join('>');
  if (ctx.editingCurveKey === curveKey) return null;

  return (
    <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', height: '100%', pr: 1 }}>
      <IconButton
        size="small"
        title="Archive"
        onClick={() => ctx.onArchiveRow(data.risk_factor_id, data.risk_factor_name)}
        sx={{ color: '#aaa' }}
      >
        <ArchiveOutlinedIcon sx={{ fontSize: 16 }} />
      </IconButton>
    </Box>
  );
}

// ---- Grid ----
interface RfmGridProps {
  rowData: RfRow[];
  context: RfmGridContext;
  onGridReady?: (api: GridApi) => void;
}

export function RfmGrid({ rowData, context, onGridReady }: RfmGridProps) {
  const gridApiRef = useRef<GridApi | null>(null);

  const autoGroupColumnDef = useMemo<ColDef<RfRow>>(() => ({
    headerName: 'Grouped',
    minWidth: 225,
    resizable: true,
    suppressMovable: true,
    suppressSizeToFit: true,
    cellRenderer: 'agGroupCellRenderer',
    cellRendererParams: {
      suppressCount: false,
      innerRenderer: CurveInnerRenderer,
    },
  }), []);

  const colDefs = useMemo<ColDef<RfRow>[]>(() => [
    {
      colId: 'name',
      field: 'risk_factor_name',
      headerName: 'Name',
      flex: 2,
      minWidth: 200,
      suppressMovable: true,
    },
    {
      colId: 'clearingHouse',
      field: 'alt_clearing_house',
      headerName: 'Clearing House',
      flex: 1.3,
      minWidth: 100,
      suppressMovable: true,
    },
    {
      colId: 'futureTenor',
      field: 'future_tenor',
      headerName: 'Future Tenor',
      flex: 1,
      minWidth: 90,
      suppressMovable: true,
      cellRenderer: makeEditableRenderer('future_tenor'),
    },
    {
      colId: 'termCode',
      field: 'term_code',
      headerName: 'Term Code',
      flex: 1,
      minWidth: 90,
      suppressMovable: true,
      cellRenderer: makeEditableRenderer('term_code'),
    },
    {
      colId: 'shockType',
      field: 'shock_type',
      headerName: 'Shock Type',
      flex: 1.2,
      minWidth: 100,
      suppressMovable: true,
      cellRenderer: makeEditableRenderer('shock_type', 'select', ['Absolute', 'Relative', 'Log']),
    },
    {
      colId: 'tenorDim',
      field: 'tenor_dimension',
      headerName: 'Tenor Dim',
      flex: 1,
      minWidth: 90,
      suppressMovable: true,
      cellRenderer: makeEditableRenderer('tenor_dimension'),
    },
    {
      colId: 'rfId',
      field: 'risk_factor_id',
      headerName: 'RF ID',
      flex: 0.95,
      minWidth: 80,
      suppressMovable: true,
    },
    {
      colId: 'actions',
      headerName: 'Actions',
      width: 160,
      resizable: false,
      suppressMovable: true,
      suppressSizeToFit: true,
      cellRenderer: ActionsRenderer,
    },
  ], []);

  // Redraw rows when context changes so renderers pick up new edit state
  const prevContextRef = useRef(context);
  useEffect(() => {
    const prev = prevContextRef.current;
    if (
      prev.editingCurveKey !== context.editingCurveKey ||
      prev.edits !== context.edits ||
      prev.busy !== context.busy
    ) {
      gridApiRef.current?.redrawRows();
    }
    prevContextRef.current = context;
  }, [context]);

  const handleGridReady = useCallback((e: GridReadyEvent) => {
    gridApiRef.current = e.api;
    onGridReady?.(e.api);
  }, [onGridReady]);

  const getDataPath: GetDataPath<RfRow> = useCallback((row) => row._path, []);

  return (
    <AgGridReact<RfRow>
      className="rfm-grid ag-theme-quartz"
      rowData={rowData}
      columnDefs={colDefs}
      context={context}
      treeData
      getDataPath={getDataPath}
      autoGroupColumnDef={autoGroupColumnDef}
      groupDefaultExpanded={1}
      getRowId={(params) => String(params.data.risk_factor_id)}
      rowHeight={46}
      headerHeight={46}
      domLayout="autoHeight"
      suppressMovableColumns
      suppressCellFocus
      animateRows={false}
      onGridReady={handleGridReady}
    />
  );
}
