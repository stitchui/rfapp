export type RfmLevel = 'class' | 'subclass' | 'type' | 'currency' | 'curve';

export interface CurveInfo {
  risk_factor_class: string;
  rf_subclass: string;
  rf_type: string;
  currency: string;
  curve_name: string;
}

export interface RfRow {
  risk_factor_id: number;
  risk_factor_name: string;
  rf_alternative_name: string;
  risk_factor_class: string;
  rf_subclass: string;
  rf_type: string;
  currency: string;
  curve_name: string;
  instrument_type: string;
  alt_clearing_house: string;
  future_tenor: string;
  term_code: string;
  shock_type: string;
  tenor_dimension: string;
  valid_from: string;
  valid_to: string | null;
  source_name: string;
  // additional API fields
  base_curve: string;
  basis_curve: string;
  currency_pair: string;
  curve_type: string;
  effective_currency: string;
  margin_type: string;
  sequence_number: number;
  vol_expiry: string;
  vol_parameter_name: string;
  vol_quote_moneyness: string;
  vol_strike: string;
  vol_tenor: string;
  node_selector_name: string;
  expiry_month: string;
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
  // RF data (API field names)
  risk_factor_id: number;
  risk_factor_name: string;
  alt_clearing_house: string;
  future_tenor: string;
  term_code: string;
  shock_type: string;
  tenor_dimension: string;
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
  onEditCell: (risk_factor_id: number, field: string, value: string) => void;
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
  'All four (Future Tenor, Term, Shock, Tenor Dim)': ['future_tenor', 'term_code', 'shock_type', 'tenor_dimension'],
  'Term Code + Shock Type': ['term_code', 'shock_type'],
  'Shock Type only': ['shock_type'],
};
