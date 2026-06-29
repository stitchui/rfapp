import { useMemo, useRef, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import type { ColDef, GridApi, GridReadyEvent, IHeaderParams } from 'ag-grid-community';
import type { RfmRowData, RfmGridContext } from './types';
import { NameRenderer } from './renderers/NameRenderer';
import { DataCellRenderer } from './renderers/DataCellRenderer';
import { ActionsRenderer } from './renderers/ActionsRenderer';

function RfmColumnHeader({ displayName, showEditIcon }: IHeaderParams & { showEditIcon?: boolean }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 5, height: '100%',
      paddingLeft: 12, paddingRight: 12,
      fontWeight: 600, fontSize: 11.5, letterSpacing: '.07em',
      textTransform: 'uppercase' as const, color: '#5f6f85',
    }}>
      {displayName}
      {showEditIcon && (
        <span className="material-symbols-rounded" style={{ fontSize: 14, color: '#1c8783' }}>
          edit
        </span>
      )}
    </div>
  );
}

function ActionsColumnHeader({ displayName }: IHeaderParams) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'flex-end',
      height: '100%', paddingRight: 16,
      fontWeight: 600, fontSize: 11.5, letterSpacing: '.07em',
      textTransform: 'uppercase' as const, color: '#8b97a4',
    }}>
      {displayName}
    </div>
  );
}

interface RfmGridProps {
  rowData: RfmRowData[];
  context: RfmGridContext;
  editableFields: string[];
  onGridReady?: (api: GridApi) => void;
}

export function RfmGrid({ rowData, context, editableFields, onGridReady }: RfmGridProps) {
  const gridApiRef = useRef<GridApi | null>(null);

  const colDefs = useMemo<ColDef<RfmRowData>[]>(() => [
    {
      colId: 'name',
      headerName: 'Risk Factor',
      flex: 2.6,
      minWidth: 280,
      cellRenderer: NameRenderer,
      headerComponent: RfmColumnHeader,
      headerComponentParams: { showEditIcon: false },
      suppressMovable: true,
    },
    {
      colId: 'clearingHouse',
      headerName: 'Clearing House',
      flex: 1.3,
      minWidth: 100,
      cellRenderer: DataCellRenderer,
      cellRendererParams: { field: 'clearingHouseCd', type: 'static' },
      headerComponent: RfmColumnHeader,
      suppressMovable: true,
    },
    {
      colId: 'futureTenor',
      headerName: 'Future Tenor',
      flex: 1,
      minWidth: 90,
      cellRenderer: DataCellRenderer,
      cellRendererParams: { field: 'futureTenorCd', type: 'text' },
      headerComponent: RfmColumnHeader,
      headerComponentParams: { showEditIcon: editableFields.includes('futureTenorCd') },
      suppressMovable: true,
    },
    {
      colId: 'termCode',
      headerName: 'Term Code',
      flex: 1,
      minWidth: 90,
      cellRenderer: DataCellRenderer,
      cellRendererParams: { field: 'termCd', type: 'text' },
      headerComponent: RfmColumnHeader,
      headerComponentParams: { showEditIcon: editableFields.includes('termCd') },
      suppressMovable: true,
    },
    {
      colId: 'shockType',
      headerName: 'Shock Type',
      flex: 1.2,
      minWidth: 100,
      cellRenderer: DataCellRenderer,
      cellRendererParams: { field: 'shockTypeCd', type: 'select', options: ['Absolute', 'Relative', 'Log'] },
      headerComponent: RfmColumnHeader,
      headerComponentParams: { showEditIcon: editableFields.includes('shockTypeCd') },
      suppressMovable: true,
    },
    {
      colId: 'tenorDim',
      headerName: 'Tenor Dim',
      flex: 1,
      minWidth: 90,
      cellRenderer: DataCellRenderer,
      cellRendererParams: { field: 'tenorDimensionCd', type: 'text' },
      headerComponent: RfmColumnHeader,
      headerComponentParams: { showEditIcon: editableFields.includes('tenorDimensionCd') },
      suppressMovable: true,
    },
    {
      colId: 'rfId',
      headerName: 'RF ID',
      flex: 0.95,
      minWidth: 80,
      cellRenderer: DataCellRenderer,
      cellRendererParams: { field: 'rfId', type: 'static', mono: true },
      headerComponent: RfmColumnHeader,
      suppressMovable: true,
    },
    {
      colId: 'actions',
      headerName: 'Actions',
      width: 156,
      suppressSizeToFit: true,
      resizable: false,
      cellRenderer: ActionsRenderer,
      headerComponent: ActionsColumnHeader,
      suppressMovable: true,
    },
  ], [editableFields]);

  // Force row refresh when row data changes to ensure getRowClass / getRowStyle are reapplied
  useEffect(() => {
    if (gridApiRef.current) {
      gridApiRef.current.redrawRows();
    }
  }, [rowData]);

  const handleGridReady = (event: GridReadyEvent) => {
    gridApiRef.current = event.api;
    onGridReady?.(event.api);
  };

  return (
    <AgGridReact<RfmRowData>
      className="rfm-grid ag-theme-quartz"
      rowData={rowData}
      columnDefs={colDefs}
      context={context}
      getRowId={params => params.data._id}
      rowHeight={46}
      headerHeight={46}
      domLayout="autoHeight"
      suppressMovableColumns
      suppressColumnVirtualisation
      suppressCellFocus
      animateRows={false}
      onGridReady={handleGridReady}
      getRowClass={params => {
        const d = params.data;
        if (!d) return 'rfm-row-default';
        if (d._type === 'group' && d._isCurve && d._isEditing) return 'rfm-row-curve-editing';
        if (d._type === 'leaf' && d._isEditingCurve) return 'rfm-row-leaf-editing';
        return 'rfm-row-default';
      }}
    />
  );
}
