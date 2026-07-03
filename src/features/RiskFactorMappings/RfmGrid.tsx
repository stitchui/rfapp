import { useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import type { ColDef, GetDataPath, ICellRendererParams } from 'ag-grid-community';
import type { RfRow } from './types';

const getDataPath: GetDataPath<RfRow> = (row) => row._path;

const autoGroupColumnDef: ColDef<RfRow> = {
  headerName: 'Grouped',
  minWidth: 225,
  resizable: true,
  suppressMovable: true,
  suppressSizeToFit: true,
  cellRenderer: 'agGroupCellRenderer',
  cellRendererParams: {
    suppressCount: false,
    // Leaf rows (depth 5) show nothing in the group column — Name column handles it
    innerRenderer: (params: ICellRendererParams) => {
      if (!params.node.group) return '';
      return params.value ?? '';
    },
  },
};

interface RfmGridProps {
  rowData: RfRow[];
}

export function RfmGrid({ rowData }: RfmGridProps) {
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
    },
    {
      colId: 'termCode',
      field: 'term_code',
      headerName: 'Term Code',
      flex: 1,
      minWidth: 90,
      suppressMovable: true,
    },
    {
      colId: 'shockType',
      field: 'shock_type',
      headerName: 'Shock Type',
      flex: 1.2,
      minWidth: 100,
      suppressMovable: true,
    },
    {
      colId: 'tenorDim',
      field: 'tenor_dimension',
      headerName: 'Tenor Dim',
      flex: 1,
      minWidth: 90,
      suppressMovable: true,
    },
    {
      colId: 'rfId',
      field: 'risk_factor_id',
      headerName: 'RF ID',
      flex: 0.95,
      minWidth: 80,
      suppressMovable: true,
    },
  ], []);

  return (
    <AgGridReact<RfRow>
      className="rfm-grid ag-theme-quartz"
      rowData={rowData}
      columnDefs={colDefs}
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
    />
  );
}
