import type { ICellRendererParams } from 'ag-grid-community';
import type { RfmRowData, GroupRowData, LeafRowData, RfmGridContext } from '../types';

const LEVEL_STYLES: Record<string, React.CSSProperties> = {
  class:    { fontWeight: 700, fontSize: 14.5, color: '#1a2740' },
  subclass: { fontWeight: 600, fontSize: 14,   color: '#3d516b' },
  type:     { fontWeight: 600, fontSize: 13.5, color: '#3d516b' },
  currency: { fontWeight: 600, fontSize: 13.5, color: '#486c94' },
  curve:    { fontWeight: 600, fontSize: 14,   color: '#1a2740' },
};

export function NameRenderer(params: ICellRendererParams<RfmRowData, unknown, RfmGridContext>) {
  const data = params.data;
  if (!data) return null;

  if (data._type === 'leaf') {
    const leaf = data as LeafRowData;
    const indent = 12 + leaf._depth * 22 + 8;
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 9, paddingLeft: indent, height: '100%', paddingRight: 12, overflow: 'hidden' }}>
        <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#d8e2eb', flexShrink: 0 }} />
        <span style={{ fontFamily: "'Roboto Mono', monospace", fontSize: 12.5, color: '#486c94', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {leaf.rfNm}
        </span>
      </div>
    );
  }

  const group = data as GroupRowData;
  const indent = 12 + group._depth * 22;
  const labelStyle = LEVEL_STYLES[group._level] ?? LEVEL_STYLES.type;

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6, paddingLeft: indent, paddingRight: 12, height: '100%' }}>
      <button
        onClick={() => params.context.onToggle(group._key)}
        style={{
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          width: 24, height: 24, border: 'none', background: 'transparent',
          cursor: 'pointer', padding: 0, borderRadius: 6, flexShrink: 0,
        }}
      >
        <span
          className="material-symbols-rounded"
          style={{
            fontSize: 20, color: '#687687',
            display: 'inline-flex',
            transition: 'transform 180ms cubic-bezier(0.4,0,0.2,1)',
            transform: group._expanded ? 'rotate(90deg)' : 'none',
          }}
        >
          chevron_right
        </span>
      </button>

      <span style={labelStyle}>{group._label}</span>

      {group._isCurve && (
        <span style={{ fontFamily: "'Roboto Mono', monospace", fontSize: 12.5, fontWeight: 500, color: '#8b97a4' }}>
          ({group._leafCount})
        </span>
      )}
    </div>
  );
}
