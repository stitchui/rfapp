import { useMemo, useRef, useCallback, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Box, Button, IconButton, Paper, MenuItem } from '@mui/material';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import { AgGridReact } from 'ag-grid-react';

// ---- Curve-level inner renderer (label only; all actions are in Actions column) ----
function CurveInnerRenderer(params) {
  if (!params.node?.group) return null;
  return <span>{params.value}</span>;
}

// ---- Editable cell renderer for leaf rows ----
function EditableCell({ value, data, context: ctx, field, type = 'text', options }) {
  if (!data) return null;
  const curveKey = data._path.slice(0, 5).join('>');
  const isEditing = ctx.editingCurveKey === curveKey;
  const currentValue = (ctx.edits[data.risk_factor_id]?.[field]) ?? String(value ?? '');
  const orig = String(data[field] ?? '');
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
        onChange={e => ctx.onEditCell(data.risk_factor_id, field, e.target.value)}
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
      onChange={e => ctx.onEditCell(data.risk_factor_id, field, e.target.value)}
      sx={inputSx}
    />
  );
}

function makeEditableRenderer(field, type = 'text', options) {
  return (params) => (
    <EditableCell value={params.value} data={params.data} context={params.context} field={field} type={type} options={options} />
  );
}

// ---- Actions column: ⋮ menu for curve rows, Archive for leaf rows ----
function ActionsRenderer(params) {
  const [menuAnchor, setMenuAnchor] = useState(null);
  const btnRef = useRef(null);
  const ctx = params.context;
  const node = params.node;

  useEffect(() => {
    if (!menuAnchor) return;
    const handler = (e) => {
      if (!btnRef.current?.contains(e.target)) setMenuAnchor(null);
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

    const rfIds = (node.allLeafChildren ?? [])
      .map(n => n.data?.risk_factor_id)
      .filter(id => id != null);

    const openMenu = (e) => {
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
  const data = params.data;
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
export function RfmGrid({ rowData, context, onGridReady }) {
  const gridApiRef = useRef(null);

  const autoGroupColumnDef = useMemo(() => ({
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

  const colDefs = useMemo(() => [
    { colId: 'name', field: 'risk_factor_name', headerName: 'Name', flex: 2, minWidth: 200, suppressMovable: true },
    { colId: 'clearingHouse', field: 'alt_clearing_house', headerName: 'Clearing House', flex: 1.3, minWidth: 100, suppressMovable: true },
    { colId: 'futureTenor', field: 'future_tenor', headerName: 'Future Tenor', flex: 1, minWidth: 90, suppressMovable: true, cellRenderer: makeEditableRenderer('future_tenor') },
    { colId: 'termCode', field: 'term_code', headerName: 'Term Code', flex: 1, minWidth: 90, suppressMovable: true, cellRenderer: makeEditableRenderer('term_code') },
    { colId: 'shockType', field: 'shock_type', headerName: 'Shock Type', flex: 1.2, minWidth: 100, suppressMovable: true, cellRenderer: makeEditableRenderer('shock_type', 'select', ['Absolute', 'Relative', 'Log']) },
    { colId: 'tenorDim', field: 'tenor_dimension', headerName: 'Tenor Dim', flex: 1, minWidth: 90, suppressMovable: true, cellRenderer: makeEditableRenderer('tenor_dimension') },
    { colId: 'rfId', field: 'risk_factor_id', headerName: 'RF ID', flex: 0.95, minWidth: 80, suppressMovable: true },
    { colId: 'actions', headerName: 'Actions', width: 160, resizable: false, suppressMovable: true, suppressSizeToFit: true, cellRenderer: ActionsRenderer },
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

  const handleGridReady = useCallback((e) => {
    gridApiRef.current = e.api;
    onGridReady?.(e.api);
  }, [onGridReady]);

  const getDataPath = useCallback((row) => row._path, []);

  return (
    <AgGridReact
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
