import type { TreeNode, RfRow, GroupRowData, LeafRowData, RfmRowData } from './types';

interface BuildInput {
  tree: TreeNode[];
  expanded: Record<string, boolean>;
  editingCurveId: string | null;
  edits: Record<number, Partial<RfRow>>;
  archivedCurves: Set<string>;
  archivedRows: Set<number>;
  editableFields: string[];
  enableRowArchive: boolean;
  busy: boolean;
  changedCount: number;
  rfById: Record<number, RfRow>;
}

function cur(orig: string, edit: Partial<RfRow> | undefined, field: keyof RfRow): string {
  if (edit && field in edit) return String(edit[field] ?? '');
  return String(orig ?? '');
}

function dirty(orig: string, edit: Partial<RfRow> | undefined, field: keyof RfRow): boolean {
  if (!edit || !(field in edit)) return false;
  return String(edit[field] ?? '') !== String(orig ?? '');
}

export function buildFlatRows(input: BuildInput): RfmRowData[] {
  const {
    tree, expanded, editingCurveId, edits, archivedCurves, archivedRows,
    editableFields, enableRowArchive, busy, changedCount, rfById,
  } = input;

  const out: RfmRowData[] = [];

  const walk = (nodes: TreeNode[], pathPrefix: string, depth: number) => {
    for (const node of nodes) {
      const key = pathPrefix ? `${pathPrefix}>${node.key}` : node.key;
      const isCurve = node.level === 'curve';

      if (isCurve && archivedCurves.has(key)) continue;

      const isExpanded = !!expanded[key];
      const liveRows = isCurve ? (node.rows ?? []).filter(r => !archivedRows.has(r.risk_factor_id)) : [];
      const isEditing = isCurve && editingCurveId === key;

      const groupRow: GroupRowData = {
        _id: key,
        _type: 'group',
        _level: node.level,
        _key: key,
        _label: node.label,
        _depth: depth,
        _expanded: isExpanded,
        _isCurve: isCurve,
        _leafCount: liveRows.length,
        _curveInfo: node.curve,
        _treeNode: node,
        _isEditing: isEditing,
        _changedCount: changedCount,
        _saveDisabled: changedCount === 0 || busy,
        _busy: busy,
      };
      out.push(groupRow);

      if (isExpanded) {
        if (isCurve) {
          for (const r of liveRows) {
            const e = edits[r.risk_factor_id];
            const leafRow: LeafRowData = {
              _id: `${key}>${r.risk_factor_id}`,
              _type: 'leaf',
              _depth: depth + 1,
              _curveKey: key,
              _isEditingCurve: isEditing,
              risk_factor_id: r.risk_factor_id,
              risk_factor_name: r.risk_factor_name,
              alt_clearing_house: r.alt_clearing_house,
              future_tenor: r.future_tenor,
              term_code: r.term_code,
              shock_type: r.shock_type,
              tenor_dimension: r.tenor_dimension,
              _curFutureTenor: cur(r.future_tenor, e, 'future_tenor'),
              _curTermCd: cur(r.term_code, e, 'term_code'),
              _curShockType: cur(r.shock_type, e, 'shock_type'),
              _curTenorDim: cur(r.tenor_dimension, e, 'tenor_dimension'),
              _dirtyFutureTenor: dirty(r.future_tenor, e, 'future_tenor'),
              _dirtyTermCd: dirty(r.term_code, e, 'term_code'),
              _dirtyShockType: dirty(r.shock_type, e, 'shock_type'),
              _dirtyTenorDim: dirty(r.tenor_dimension, e, 'tenor_dimension'),
              _canEditFutureTenor: editableFields.includes('future_tenor'),
              _canEditTermCd: editableFields.includes('term_code'),
              _canEditShockType: editableFields.includes('shock_type'),
              _canEditTenorDim: editableFields.includes('tenor_dimension'),
              _showRowArchive: enableRowArchive && !isEditing,
              _rfData: rfById[r.risk_factor_id] ?? r,
            };
            out.push(leafRow);
          }
        } else if (node.children) {
          walk(node.children, key, depth + 1);
        }
      }
    }
  };

  walk(tree, '', 0);
  return out;
}
