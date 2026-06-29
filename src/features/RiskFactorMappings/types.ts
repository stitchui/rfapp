export type RfmLevel = 'class' | 'subclass' | 'type' | 'currency' | 'curve';

export interface CurveInfo {
  rfClassCd: string;
  rfSubclassCd: string;
  rfTypeCd: string;
  currencyCd: string;
  curveNm: string;
}

export interface RfRow {
  rfId: number;
  rfNm: string;
  altRfNm: string;
  rfClassCd: string;
  rfSubclassCd: string;
  rfTypeCd: string;
  currencyCd: string;
  curveNm: string;
  curveInstrumentTypeNm: string;
  clearingHouseCd: string;
  futureTenorCd: string;
  termCd: string;
  shockTypeCd: string;
  tenorDimensionCd: string;
  validFromTs: string;
  validToTs: string | null;
  sourceNm: string;
}

export interface TreeNode {
  key: string;
  label: string;
  level: RfmLevel;
  children?: TreeNode[];
  curve?: CurveInfo;
  rows?: RfRow[];
}

// ---- Flat grid row types (one of these per AG Grid row) ----

export interface GroupRowData {
  _id: string;
  _type: 'group';
  _level: RfmLevel;
  _key: string;
  _label: string;
  _depth: number;
  _expanded: boolean;
  _isCurve: boolean;
  _leafCount: number;
  _curveInfo?: CurveInfo;
  _treeNode?: TreeNode;
  _isEditing: boolean;
  _changedCount: number;
  _saveDisabled: boolean;
  _busy: boolean;
}

export interface LeafRowData {
  _id: string;
  _type: 'leaf';
  _depth: number;
  _curveKey: string;
  _isEditingCurve: boolean;
  // RF data
  rfId: number;
  rfNm: string;
  clearingHouseCd: string;
  futureTenorCd: string;
  termCd: string;
  shockTypeCd: string;
  tenorDimensionCd: string;
  // Current values (edit overrides original)
  _curFutureTenor: string;
  _curTermCd: string;
  _curShockType: string;
  _curTenorDim: string;
  // Dirty flags
  _dirtyFutureTenor: boolean;
  _dirtyTermCd: boolean;
  _dirtyShockType: boolean;
  _dirtyTenorDim: boolean;
  // Editable flags (from preset)
  _canEditFutureTenor: boolean;
  _canEditTermCd: boolean;
  _canEditShockType: boolean;
  _canEditTenorDim: boolean;
  _showRowArchive: boolean;
  _rfData: RfRow;
}

export type RfmRowData = GroupRowData | LeafRowData;

// ---- AG Grid context (callbacks only) ----

export interface RfmGridContext {
  onToggle: (key: string) => void;
  onStartEdit: (curveKey: string) => void;
  onCancelEdit: () => void;
  onSave: () => void;
  onEditCell: (rfId: number, field: string, value: string) => void;
  onArchiveCurve: (key: string, node: TreeNode) => void;
  onArchiveRow: (rfData: RfRow) => void;
  dirtyTint: string;
}

// ---- Dialogs ----

export type DialogType = 'archiveCurve' | 'archiveRow' | 'discard' | 'create';

export interface DialogState {
  type: DialogType;
  curveKey?: string;
  curveNode?: TreeNode;
  rfData?: RfRow;
  nextCurve?: string | null;
}

// ---- Create dialog state ----

export interface CreateState {
  cls: string;
  sub: string;
  typ: string;
  curve: string;
  fetched: boolean;
  items: string[];
  selected: Record<string, boolean>;
}

export type EditablePreset =
  | 'All four (Future Tenor, Term, Shock, Tenor Dim)'
  | 'Term Code + Shock Type'
  | 'Shock Type only';

export const PRESET_FIELDS: Record<EditablePreset, string[]> = {
  'All four (Future Tenor, Term, Shock, Tenor Dim)': ['futureTenorCd', 'termCd', 'shockTypeCd', 'tenorDimensionCd'],
  'Term Code + Shock Type': ['termCd', 'shockTypeCd'],
  'Shock Type only': ['shockTypeCd'],
};
