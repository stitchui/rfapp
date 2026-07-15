import { useState, useMemo, useRef, useCallback, useEffect } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Box, Button, FormControl, InputLabel, Select, MenuItem,
  Typography, CircularProgress,
} from '@mui/material';
import { AgGridReact } from 'ag-grid-react';
import { getRiskFactorTimeseriesDropdowns, getRiskFactorTimeseries, saveRiskFactorMappings } from '../../api/riskFactorApi';

const EMPTY = { rfClass: '', currency: '', curve: '' };

export function CreateDialog({ open, onClose, onCreated }) {
  const [sel, setSel] = useState(EMPTY);
  const [niwaRows, setNiwaRows] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [busy, setBusy] = useState(false);
  const [fetched, setFetched] = useState(false);
  const [tree, setTree] = useState({});
  const gridApiRef = useRef(null);

  useEffect(() => {
    if (open && Object.keys(tree).length === 0) {
      getRiskFactorTimeseriesDropdowns().then(data => setTree(data));
    }
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  const classOptions = Object.keys(tree);
  const currencyOptions = sel.rfClass ? (tree[sel.rfClass]?.currency ?? []) : [];
  const curveOptions = sel.rfClass ? (tree[sel.rfClass]?.curve_name ?? []) : [];

  const handleClassChange = (val) => setSel({ ...EMPTY, rfClass: val });
  const handleCurrencyChange = (val) => setSel(s => ({ ...s, currency: val }));
  const handleCurveChange = (val) => setSel(s => ({ ...s, curve: val }));

  const handleFetch = async () => {
    setLoading(true);
    setFetched(false);
    setNiwaRows([]);
    setSelectedRows([]);
    const rows = await getRiskFactorTimeseries({
      rfClass: sel.rfClass, currency: sel.currency, curve: sel.curve,
    });
    setNiwaRows(rows);
    setLoading(false);
    setFetched(true);
  };

  const handleSelectionChanged = useCallback((e) => {
    setSelectedRows(e.api.getSelectedRows());
  }, []);

  const handleCreate = async () => {
    if (!selectedRows.length) return;
    setBusy(true);
    const rows = gridApiRef.current?.getSelectedRows() ?? selectedRows;
    const payload = rows.map(r => {
      const { _path, ...rest } = r;
      void _path;
      return { ...rest, risk_factor_id: 0 };
    });
    await saveRiskFactorMappings(payload);
    setBusy(false);
    onCreated(rows);
    handleClose();
  };

  const handleClose = () => {
    setSel(EMPTY);
    setNiwaRows([]);
    setSelectedRows([]);
    setFetched(false);
    onClose();
  };

  const colDefs = useMemo(() => [
    {
      colId: 'checkbox',
      checkboxSelection: true,
      headerCheckboxSelection: true,
      width: 48,
      resizable: false,
      suppressMovable: true,
      suppressSizeToFit: true,
    },
    { field: 'risk_factor_name', headerName: 'Name', flex: 2, minWidth: 200, editable: true },
    { field: 'alt_clearing_house', headerName: 'Clearing House', flex: 1, minWidth: 100, editable: true },
    { field: 'future_tenor', headerName: 'Future Tenor', flex: 1, minWidth: 90, editable: true },
    { field: 'term_code', headerName: 'Term Code', flex: 1, minWidth: 90, editable: true },
    {
      field: 'shock_type', headerName: 'Shock Type', flex: 1.2, minWidth: 100, editable: true,
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: { values: ['Absolute', 'Relative', 'Log'] },
    },
    { field: 'tenor_dimension', headerName: 'Tenor Dim', flex: 1, minWidth: 90, editable: true },
    { field: 'risk_factor_id', headerName: 'RF ID', flex: 0.8, minWidth: 70, valueFormatter: () => '0' },
  ], []);

  const handleGridReady = useCallback((e) => {
    gridApiRef.current = e.api;
  }, []);

  const SelectField = ({ label, value, options, onChange, disabled }) => (
    <FormControl size="small" sx={{ minWidth: 140, flex: 1 }} disabled={disabled || options.length === 0}>
      <InputLabel sx={{ fontSize: 13 }}>{label}</InputLabel>
      <Select value={value} label={label} onChange={e => onChange(e.target.value)} sx={{ fontSize: 13 }}>
        {options.map(o => <MenuItem key={o} value={o} sx={{ fontSize: 13 }}>{o}</MenuItem>)}
      </Select>
    </FormControl>
  );

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xl" PaperProps={{ sx: { borderRadius: 3, height: '85vh' } }}>
      <DialogTitle sx={{ fontSize: 18, fontWeight: 600, pb: 1 }}>Create Risk Factor</DialogTitle>

      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: '12px !important' }}>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'flex-end' }}>
          <SelectField label="Class" value={sel.rfClass} options={classOptions} onChange={handleClassChange} />
          <SelectField label="Currency" value={sel.currency} options={currencyOptions} onChange={handleCurrencyChange} disabled={!sel.rfClass} />
          <SelectField label="Curve" value={sel.curve} options={curveOptions} onChange={handleCurveChange} disabled={!sel.rfClass} />
          <Button
            variant="outlined"
            disabled={!sel.rfClass || loading}
            onClick={handleFetch}
            startIcon={loading ? <CircularProgress size={14} /> : null}
            sx={{ height: 40, textTransform: 'none', fontSize: 13, whiteSpace: 'nowrap', borderColor: '#004d2c', color: '#004d2c', '&:hover': { borderColor: '#0a5c38', bgcolor: '#f0f7f4' } }}
          >
            {loading ? 'Fetching…' : 'Fetch NIWA Data'}
          </Button>
        </Box>

        {fetched && (
          <Box sx={{ flex: 1, minHeight: 0 }}>
            {niwaRows.length === 0 ? (
              <Typography sx={{ color: '#888', fontSize: 14, mt: 2 }}>No records found for the selected filters.</Typography>
            ) : (
              <Box sx={{ height: '100%' }}>
                <Typography sx={{ fontSize: 12, color: '#666', mb: 1 }}>
                  {niwaRows.length} records found · {selectedRows.length} selected
                </Typography>
                <div className="ag-theme-quartz" style={{ height: 'calc(100% - 28px)' }}>
                  <AgGridReact
                    rowData={niwaRows}
                    columnDefs={colDefs}
                    rowSelection="multiple"
                    suppressRowClickSelection
                    onSelectionChanged={handleSelectionChanged}
                    onGridReady={handleGridReady}
                    getRowId={p => p.data.risk_factor_name}
                    rowHeight={42}
                    headerHeight={42}
                    stopEditingWhenCellsLoseFocus
                  />
                </div>
              </Box>
            )}
          </Box>
        )}
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2, borderTop: '1px solid #e0e0e0', gap: 1 }}>
        <Button onClick={handleClose} disabled={busy} sx={{ textTransform: 'none' }}>Cancel</Button>
        <Button
          variant="contained"
          disabled={selectedRows.length === 0 || busy}
          onClick={handleCreate}
          startIcon={busy ? <CircularProgress size={14} sx={{ color: '#fff' }} /> : null}
          sx={{ textTransform: 'none', bgcolor: '#004d2c', '&:hover': { bgcolor: '#0a5c38' }, '&.Mui-disabled': { bgcolor: '#004d2c', color: '#fff', opacity: 0.4 } }}
        >
          {busy ? 'Creating…' : `Create${selectedRows.length > 0 ? ` (${selectedRows.length})` : ''}`}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
