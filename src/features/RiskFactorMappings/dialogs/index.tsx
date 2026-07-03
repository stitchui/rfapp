import {
  Dialog, DialogContent, DialogActions, DialogTitle,
  Button, Box, Typography, Checkbox, FormControlLabel,
  Select, MenuItem, FormControl, InputLabel, CircularProgress,
} from '@mui/material';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import type { DialogState, CreateState } from '../types';

// ---- Archive Curve Dialog ----

interface ArchiveCurveProps {
  open: boolean;
  dialog: DialogState | null;
  busy: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export function ArchiveCurveDialog({ open, dialog, busy, onCancel, onConfirm }: ArchiveCurveProps) {
  const node = dialog?.curveNode;
  const rowCount = node?.rows?.length ?? 0;
  const curveName = node?.curve?.curve_name ?? '';

  return (
    <Dialog open={open} onClose={busy ? undefined : onCancel} maxWidth="xs" fullWidth>
      <DialogContent sx={{ pt: 3.5, pb: 2 }}>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
          <Box sx={{
            flexShrink: 0, width: 44, height: 44, borderRadius: '12px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            bgcolor: '#fdeee9', color: '#d96a4a',
          }}>
            <Inventory2OutlinedIcon />
          </Box>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600, fontSize: 19, color: '#1a2740', mb: 1 }}>
              Archive Curve
            </Typography>
            <Typography sx={{ fontSize: 14.5, color: '#687687', lineHeight: 1.55 }}>
              Are you sure you want to archive curve &ldquo;{curveName}&rdquo; and all {rowCount} related
              risk factor rows? This sets valid_to to the current timestamp — no rows are deleted.
            </Typography>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 3, gap: 1 }}>
        <Button variant="outlined" onClick={onCancel} disabled={busy}
          sx={{ borderRadius: 999, fontSize: 14, fontWeight: 500, borderColor: '#e0e0e0', color: '#3d516b', textTransform: 'none' }}>
          Cancel
        </Button>
        <Button variant="contained" onClick={onConfirm} disabled={busy}
          sx={{ borderRadius: 999, fontSize: 14, fontWeight: 600, bgcolor: '#d96a4a', textTransform: 'none',
            '&:hover': { bgcolor: '#c45c3c' },
            '&.Mui-disabled': { bgcolor: '#d96a4a', color: '#fff', opacity: 0.6 } }}>
          {busy ? 'Archiving…' : 'Archive'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

// ---- Archive Row Dialog ----

interface ArchiveRowProps {
  open: boolean;
  dialog: DialogState | null;
  busy: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export function ArchiveRowDialog({ open, dialog, busy, onCancel, onConfirm }: ArchiveRowProps) {
  const rf = dialog?.rfData;

  return (
    <Dialog open={open} onClose={busy ? undefined : onCancel} maxWidth="xs" fullWidth>
      <DialogContent sx={{ pt: 3.5, pb: 2 }}>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
          <Box sx={{
            flexShrink: 0, width: 44, height: 44, borderRadius: '12px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            bgcolor: '#fdeee9', color: '#d96a4a',
          }}>
            <Inventory2OutlinedIcon />
          </Box>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600, fontSize: 19, color: '#1a2740', mb: 1 }}>
              Archive Risk Factor
            </Typography>
            <Typography sx={{ fontSize: 14.5, color: '#687687', lineHeight: 1.55 }}>
              Archive &ldquo;{rf?.risk_factor_name}&rdquo; (RF ID {rf?.risk_factor_id})? This sets its valid_to timestamp;
              the record is retained.
            </Typography>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 3, gap: 1 }}>
        <Button variant="outlined" onClick={onCancel} disabled={busy}
          sx={{ borderRadius: 999, fontSize: 14, fontWeight: 500, borderColor: '#e0e0e0', color: '#3d516b', textTransform: 'none' }}>
          Cancel
        </Button>
        <Button variant="contained" onClick={onConfirm} disabled={busy}
          sx={{ borderRadius: 999, fontSize: 14, fontWeight: 600, bgcolor: '#d96a4a', textTransform: 'none',
            '&:hover': { bgcolor: '#c45c3c' },
            '&.Mui-disabled': { bgcolor: '#d96a4a', color: '#fff', opacity: 0.6 } }}>
          {busy ? 'Archiving…' : 'Archive'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

// ---- Discard Changes Dialog ----

interface DiscardProps {
  open: boolean;
  busy: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export function DiscardDialog({ open, busy, onCancel, onConfirm }: DiscardProps) {
  return (
    <Dialog open={open} onClose={busy ? undefined : onCancel} maxWidth="xs" fullWidth>
      <DialogContent sx={{ pt: 3.5, pb: 2 }}>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
          <Box sx={{
            flexShrink: 0, width: 44, height: 44, borderRadius: '12px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            bgcolor: '#fef4e3', color: '#cf7d38',
          }}>
            <WarningAmberIcon />
          </Box>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600, fontSize: 19, color: '#1a2740', mb: 1 }}>
              Unsaved changes
            </Typography>
            <Typography sx={{ fontSize: 14.5, color: '#687687', lineHeight: 1.55 }}>
              You have unsaved changes on the current curve. Discard them and continue editing the other curve?
            </Typography>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 3, gap: 1 }}>
        <Button variant="outlined" onClick={onCancel}
          sx={{ borderRadius: 999, fontSize: 14, fontWeight: 500, borderColor: '#e0e0e0', color: '#3d516b', textTransform: 'none' }}>
          Cancel
        </Button>
        <Button variant="contained" onClick={onConfirm}
          sx={{ borderRadius: 999, fontSize: 14, fontWeight: 600, bgcolor: '#004d2c', textTransform: 'none',
            '&:hover': { bgcolor: '#0a5c38' } }}>
          Discard changes
        </Button>
      </DialogActions>
    </Dialog>
  );
}

// ---- Create Risk Factor Dialog ----

interface CreateDialogProps {
  open: boolean;
  busy: boolean;
  create: CreateState;
  onCancel: () => void;
  onConfirm: () => void;
  onSetField: (field: keyof CreateState, value: string) => void;
  onFetchNeva: () => void;
  onToggleItem: (name: string) => void;
  onToggleAll: () => void;
}

const CLASS_OPTIONS   = ['IR', 'FX', 'EQ', 'CR', 'CM'];
const SUB_OPTIONS     = ['Base', 'Vol', 'Spot', 'Basis'];
const TYPE_OPTIONS    = ['OTC', 'Listed', 'CCS', 'G10'];
const CURVE_OPTIONS   = ['Swap', 'Basis', 'XCcy Basis', 'ATM Vol', 'Spot'];

export function CreateDialog({
  open, busy, create, onCancel, onConfirm, onSetField, onFetchNeva, onToggleItem, onToggleAll,
}: CreateDialogProps) {
  const chosenCount = create.items.filter(n => create.selected[n]).length;
  const allSelected = create.items.length > 0 && create.items.every(n => create.selected[n]);
  const createDisabled = !create.fetched || chosenCount === 0 || busy;

  const selStyle = {
    '& .MuiOutlinedInput-root': {
      borderRadius: 999, height: 42, fontSize: 14,
    },
    '& .MuiInputLabel-root': { fontSize: 11.5, fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' },
  };

  return (
    <Dialog open={open} onClose={busy ? undefined : onCancel} maxWidth="sm" fullWidth
      PaperProps={{ sx: { maxWidth: 580 } }}>
      <DialogTitle sx={{
        borderBottom: '1px solid #eef2f6', pb: 2, pt: 2.75,
        fontSize: 19, fontWeight: 600, color: '#1a2740',
      }}>
        Create Risk Factor
        <Typography sx={{ fontSize: 13.5, color: '#687687', fontWeight: 400, mt: 0.5, lineHeight: 1.4 }}>
          Define the curve, then fetch NEVA risk factors to load into the grid.
        </Typography>
      </DialogTitle>

      <DialogContent sx={{ py: 2.75 }}>
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1.875, mb: 2 }}>
          {([
            { label: 'Class',    field: 'cls',   opts: CLASS_OPTIONS  },
            { label: 'Subclass', field: 'sub',   opts: SUB_OPTIONS    },
            { label: 'Type',     field: 'typ',   opts: TYPE_OPTIONS   },
            { label: 'Curve',    field: 'curve', opts: CURVE_OPTIONS  },
          ] as const).map(({ label, field, opts }) => (
            <FormControl key={field} size="small" sx={selStyle}>
              <InputLabel>{label}</InputLabel>
              <Select
                label={label}
                value={create[field] as string}
                onChange={e => onSetField(field, e.target.value)}
              >
                {opts.map(o => <MenuItem key={o} value={o}>{o}</MenuItem>)}
              </Select>
            </FormControl>
          ))}
        </Box>

        <Button
          variant="outlined"
          startIcon={
            <AutorenewIcon sx={{
              fontSize: 18,
              animation: busy && !create.fetched ? 'rfm-spin 0.9s linear infinite' : 'none',
            }} />
          }
          disabled={busy}
          onClick={onFetchNeva}
          sx={{
            borderRadius: 999, fontSize: 14, fontWeight: 500,
            borderColor: '#004d2c', color: '#004d2c', textTransform: 'none',
            '&:hover': { bgcolor: '#f1f7f2', borderColor: '#004d2c' },
          }}
        >
          {busy && !create.fetched ? 'Fetching…' : create.fetched ? 'Re-fetch NEVA data' : 'Fetch NEVA data'}
        </Button>

        {create.fetched && (
          <Box sx={{ mt: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
              <Typography sx={{ fontSize: 13, color: '#687687' }}>
                {chosenCount} of {create.items.length} selected
              </Typography>
              <Button
                size="small"
                onClick={onToggleAll}
                sx={{
                  fontSize: 13, fontWeight: 600, textTransform: 'none', color: '#3d516b',
                  borderRadius: '6px', minWidth: 0,
                  '&:hover': { bgcolor: '#f8fafc' },
                }}
              >
                {allSelected ? 'Deselect all' : 'Select all'}
              </Button>
            </Box>
            <Box sx={{
              maxHeight: 220, overflow: 'auto',
              border: '1px solid #eef2f6', borderRadius: '10px',
            }}>
              {create.items.map(name => (
                <Box
                  key={name}
                  component="label"
                  sx={{
                    display: 'flex', alignItems: 'center', gap: 1.375,
                    px: 1.75, py: 1.25,
                    borderBottom: '1px solid #eef2f6',
                    cursor: 'pointer',
                    '&:last-child': { borderBottom: 'none' },
                    '&:hover': { bgcolor: '#f8fbff' },
                  }}
                >
                  <Checkbox
                    checked={!!create.selected[name]}
                    onChange={() => onToggleItem(name)}
                    size="small"
                    sx={{
                      p: 0,
                      color: '#d8e2eb',
                      '&.Mui-checked': { color: '#0a5c38' },
                    }}
                  />
                  <Typography sx={{ fontFamily: "'Roboto Mono', monospace", fontSize: 13, color: '#3d516b' }}>
                    {name}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        )}
      </DialogContent>

      <DialogActions sx={{ px: 3.5, py: 2, borderTop: '1px solid #eef2f6', bgcolor: '#f8fafc', gap: 1 }}>
        <Button variant="outlined" onClick={onCancel}
          sx={{ borderRadius: 999, fontSize: 14, fontWeight: 500, borderColor: '#e0e0e0', color: '#3d516b', textTransform: 'none' }}>
          Cancel
        </Button>
        <Button
          variant="contained"
          disabled={createDisabled}
          onClick={onConfirm}
          startIcon={busy && create.fetched ? <CircularProgress size={14} sx={{ color: '#fff' }} /> : undefined}
          sx={{
            borderRadius: 999, fontSize: 14, fontWeight: 600, bgcolor: '#004d2c', textTransform: 'none',
            '&:hover': { bgcolor: '#0a5c38' },
            '&.Mui-disabled': { bgcolor: '#004d2c', color: '#fff', opacity: 0.42 },
          }}
        >
          {busy && create.fetched ? 'Creating…' : chosenCount ? `Create (${chosenCount})` : 'Create'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
