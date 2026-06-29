import type { ICellRendererParams } from 'ag-grid-community';
import type { RfmRowData, LeafRowData, RfmGridContext } from '../types';

export interface DataCellParams {
  field: 'clearingHouseCd' | 'futureTenorCd' | 'termCd' | 'shockTypeCd' | 'tenorDimensionCd' | 'rfId';
  type: 'static' | 'text' | 'select';
  options?: string[];
  mono?: boolean;
}

type Props = ICellRendererParams<RfmRowData, unknown, RfmGridContext> & DataCellParams;

interface FieldState { cur: string; dirty: boolean; canEdit: boolean; }

function getFieldState(leaf: LeafRowData, field: DataCellParams['field']): FieldState {
  switch (field) {
    case 'clearingHouseCd': return { cur: leaf.clearingHouseCd, dirty: false, canEdit: false };
    case 'rfId':            return { cur: String(leaf.rfId),    dirty: false, canEdit: false };
    case 'futureTenorCd':   return { cur: leaf._curFutureTenor, dirty: leaf._dirtyFutureTenor, canEdit: leaf._canEditFutureTenor };
    case 'termCd':          return { cur: leaf._curTermCd,      dirty: leaf._dirtyTermCd,      canEdit: leaf._canEditTermCd };
    case 'shockTypeCd':     return { cur: leaf._curShockType,   dirty: leaf._dirtyShockType,   canEdit: leaf._canEditShockType };
    case 'tenorDimensionCd':return { cur: leaf._curTenorDim,    dirty: leaf._dirtyTenorDim,    canEdit: leaf._canEditTenorDim };
  }
}

export function DataCellRenderer({ data, context, field, type, options, mono }: Props) {
  if (!data || data._type !== 'leaf') return null;
  const leaf = data as LeafRowData;
  const { cur, dirty, canEdit } = getFieldState(leaf, field);
  const isEditable = leaf._isEditingCurve && canEdit && type !== 'static';

  const wrap: React.CSSProperties = {
    padding: '0 12px', height: '100%', display: 'flex', alignItems: 'center', overflow: 'hidden',
  };

  if (!isEditable) {
    return (
      <div style={wrap}>
        <span style={{
          fontFamily: mono ? "'Roboto Mono', monospace" : 'inherit',
          fontSize: mono ? 12.5 : 13.5,
          color: field === 'clearingHouseCd' ? '#486c94' : '#3d4a5c',
          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
        }}>
          {cur}
        </span>
      </div>
    );
  }

  const inputBase: React.CSSProperties = {
    width: '100%', height: 30, fontFamily: 'inherit', fontSize: 13, color: '#1a2740',
    border: dirty ? '1px solid #1c8783' : '1px solid #e0e0e0',
    borderRadius: 7, padding: '0 9px', outline: 'none',
    background: dirty ? (context.dirtyTint ?? '#eef7e0') : '#fff',
    transition: 'border-color 120ms, background 120ms',
  };

  if (type === 'select') {
    return (
      <div style={wrap}>
        <select
          value={cur}
          onChange={e => context.onEditCell(leaf.rfId, field, e.target.value)}
          style={{ ...inputBase, cursor: 'pointer' }}
        >
          {options?.map(opt => <option key={opt} value={opt}>{opt}</option>)}
        </select>
      </div>
    );
  }

  return (
    <div style={wrap}>
      <input
        type="text"
        value={cur}
        onChange={e => context.onEditCell(leaf.rfId, field, e.target.value)}
        style={inputBase}
      />
    </div>
  );
}
