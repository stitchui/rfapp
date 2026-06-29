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
      const liveRows = isCurve ? (node.rows ?? []).filter(r => !archivedRows.has(r.rfId)) : [];
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
            const e = edits[r.rfId];
            const leafRow: LeafRowData = {
              _id: `${key}>${r.rfId}`,
              _type: 'leaf',
              _depth: depth + 1,
              _curveKey: key,
              _isEditingCurve: isEditing,
              rfId: r.rfId,
              rfNm: r.rfNm,
              clearingHouseCd: r.clearingHouseCd,
              futureTenorCd: r.futureTenorCd,
              termCd: r.termCd,
              shockTypeCd: r.shockTypeCd,
              tenorDimensionCd: r.tenorDimensionCd,
              _curFutureTenor: cur(r.futureTenorCd, e, 'futureTenorCd'),
              _curTermCd: cur(r.termCd, e, 'termCd'),
              _curShockType: cur(r.shockTypeCd, e, 'shockTypeCd'),
              _curTenorDim: cur(r.tenorDimensionCd, e, 'tenorDimensionCd'),
              _dirtyFutureTenor: dirty(r.futureTenorCd, e, 'futureTenorCd'),
              _dirtyTermCd: dirty(r.termCd, e, 'termCd'),
              _dirtyShockType: dirty(r.shockTypeCd, e, 'shockTypeCd'),
              _dirtyTenorDim: dirty(r.tenorDimensionCd, e, 'tenorDimensionCd'),
              _canEditFutureTenor: editableFields.includes('futureTenorCd'),
              _canEditTermCd: editableFields.includes('termCd'),
              _canEditShockType: editableFields.includes('shockTypeCd'),
              _canEditTenorDim: editableFields.includes('tenorDimensionCd'),
              _showRowArchive: enableRowArchive && !isEditing,
              _rfData: rfById[r.rfId] ?? r,
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
