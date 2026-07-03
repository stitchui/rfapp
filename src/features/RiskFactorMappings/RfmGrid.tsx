import { useMemo, useRef, useCallback, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';
import type { ColDef, GetDataPath, GridApi, GridReadyEvent, IGroupCellRendererParams } from 'ag-grid-community';
import type { RfRow, RfmGridContext } from './types';

// ---- Curve-level inner renderer (label only; all actions are in Actions column) ----
function CurveInnerRenderer(params: IGroupCellRendererParams) {
  const node = params.node;
  if (!node.group) return null;
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

  const inputStyle: React.CSSProperties = {
    width: '100%', boxSizing: 'border-box',
    padding: '3px 7px', borderRadius: 5,
    border: isDirty ? '1.5px solid #1c8783' : '1px solid #ccc',
    background: isDirty ? '#eef7e0' : '#fff',
    fontSize: 13, outline: 'none',
  };

  if (type === 'select' && options) {
    return (
      <select
        value={currentValue}
        onChange={e => ctx.onEditCell(data.risk_factor_id, field, e.target.value)}
        style={inputStyle}
      >
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    );
  }

  return (
    <input
      value={currentValue}
      onChange={e => ctx.onEditCell(data.risk_factor_id, field, e.target.value)}
      style={inputStyle}
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
        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', height: '100%', gap: 6, paddingRight: 8 }}>
          <button disabled={ctx.busy} onClick={ctx.onCancelEdit} style={{ padding: '3px 12px', borderRadius: 6, border: '1px solid #ccc', cursor: 'pointer', background: '#fff', color: '#333', fontSize: 12, opacity: ctx.busy ? 0.5 : 1 }}>
            Cancel
          </button>
          <button disabled={ctx.busy || !ctx.hasDirtyEdits} onClick={ctx.onSave} style={{ padding: '3px 12px', borderRadius: 6, border: 'none', cursor: ctx.hasDirtyEdits && !ctx.busy ? 'pointer' : 'not-allowed', background: '#004d2c', color: '#fff', fontSize: 12, fontWeight: 600, opacity: ctx.busy || !ctx.hasDirtyEdits ? 0.4 : 1 }}>
            Save
          </button>
        </div>
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
      <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', height: '100%', paddingRight: 8 }}>
        <button ref={btnRef} onClick={openMenu} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '2px 8px', borderRadius: 4, fontSize: 20, color: '#555', lineHeight: 1 }} title="Actions">
          ⋮
        </button>
        {menuAnchor && createPortal(
          <div
            style={{ position: 'fixed', top: menuAnchor.top, left: menuAnchor.left, zIndex: 9999, background: '#fff', border: '1px solid #e0e0e0', borderRadius: 8, boxShadow: '0 4px 16px rgba(0,0,0,.12)', minWidth: 148, overflow: 'hidden' }}
            onMouseDown={e => e.stopPropagation()}
          >
            <div onClick={() => { ctx.onStartEdit(curveKey); setMenuAnchor(null); }} style={{ padding: '10px 16px', cursor: 'pointer', fontSize: 13 }} onMouseEnter={e => (e.currentTarget.style.background = '#f5f5f5')} onMouseLeave={e => (e.currentTarget.style.background = '')}>
              Edit
            </div>
            <div onClick={() => { ctx.onArchiveCurve(curveKey, rfIds); setMenuAnchor(null); }} style={{ padding: '10px 16px', cursor: 'pointer', fontSize: 13, color: '#c0392b' }} onMouseEnter={e => (e.currentTarget.style.background = '#fff5f5')} onMouseLeave={e => (e.currentTarget.style.background = '')}>
              Archive Curve
            </div>
          </div>,
          document.body
        )}
      </div>
    );
  }

  // Leaf row → Archive button
  const data = params.data as RfRow;
  if (!data || node.group) return null;
  const curveKey = data._path.slice(0, 5).join('>');
  if (ctx.editingCurveKey === curveKey) return null;

  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', height: '100%', paddingRight: 8 }}>
      <button
        onClick={() => ctx.onArchiveRow(data.risk_factor_id, data.risk_factor_name)}
        style={{ background: 'none', border: '1px solid #e0e0e0', borderRadius: 5, cursor: 'pointer', padding: '3px 8px', fontSize: 12, color: '#888' }}
      >
        Archive
      </button>
    </div>
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
