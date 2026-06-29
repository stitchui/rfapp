import { useState } from 'react';
import { IconButton, Menu, MenuItem, Button } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import type { ICellRendererParams } from 'ag-grid-community';
import type { RfmRowData, GroupRowData, LeafRowData, RfmGridContext } from '../types';

type Props = ICellRendererParams<RfmRowData, unknown, RfmGridContext>;

export function ActionsRenderer({ data, context }: Props) {
  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);

  if (!data) return null;

  const wrapStyle: React.CSSProperties = {
    display: 'flex', alignItems: 'center', justifyContent: 'flex-end',
    height: '100%', paddingRight: 14, gap: 7,
  };

  if (data._type === 'leaf') {
    const leaf = data as LeafRowData;
    if (!leaf._showRowArchive) return <div style={wrapStyle} />;
    return (
      <div style={wrapStyle}>
        <IconButton
          size="small"
          title="Archive risk factor"
          onClick={() => context.onArchiveRow(leaf._rfData)}
          sx={{ opacity: 0.7, '&:hover': { opacity: 1, bgcolor: '#f8fafc' } }}
        >
          <Inventory2OutlinedIcon sx={{ fontSize: 18, color: '#8b97a4' }} />
        </IconButton>
      </div>
    );
  }

  const group = data as GroupRowData;
  if (!group._isCurve) return <div style={wrapStyle} />;

  if (group._isEditing) {
    return (
      <div style={wrapStyle}>
        <Button
          variant="outlined"
          size="small"
          onClick={context.onCancelEdit}
          sx={{
            height: 30, px: 1.875, borderRadius: 999, fontSize: 13, fontWeight: 500,
            borderColor: '#e0e0e0', color: '#3d516b', minWidth: 0, textTransform: 'none',
            '&:hover': { bgcolor: '#f8fafc', borderColor: '#e0e0e0' },
          }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          size="small"
          disabled={group._saveDisabled}
          onClick={context.onSave}
          sx={{
            height: 30, px: 2, borderRadius: 999, fontSize: 13, fontWeight: 600,
            bgcolor: '#004d2c', minWidth: 0, textTransform: 'none',
            '&:hover': { bgcolor: '#0a5c38' },
            '&.Mui-disabled': { bgcolor: '#004d2c', color: '#fff', opacity: 0.42 },
          }}
        >
          {group._busy ? 'Saving…' : 'Save'}
        </Button>
      </div>
    );
  }

  return (
    <div style={wrapStyle}>
      <IconButton
        size="small"
        onClick={e => setMenuAnchor(e.currentTarget)}
        sx={{ '&:hover': { bgcolor: '#f8fafc' } }}
      >
        <MoreVertIcon sx={{ fontSize: 21, color: '#687687' }} />
      </IconButton>

      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={() => setMenuAnchor(null)}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem
          onClick={() => {
            setMenuAnchor(null);
            context.onStartEdit(group._key);
          }}
          sx={{ color: '#3d516b' }}
        >
          <EditIcon sx={{ fontSize: 18, color: '#687687', mr: 1.25 }} />
          Edit
        </MenuItem>
        <MenuItem
          onClick={() => {
            setMenuAnchor(null);
            context.onArchiveCurve(group._key, group._treeNode!);
          }}
          sx={{ color: '#d96a4a', '&:hover': { bgcolor: '#fdf1ec !important' } }}
        >
          <Inventory2OutlinedIcon sx={{ fontSize: 18, mr: 1.25 }} />
          Archive
        </MenuItem>
      </Menu>
    </div>
  );
}
