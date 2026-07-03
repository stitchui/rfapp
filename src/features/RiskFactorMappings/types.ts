export interface RfRow {
  // path for AG Grid treeData: [class, subclass, type, currency, curve_name, rf_name]
  _path: string[];
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

export interface RfmGridContext {
  editingCurveKey: string | null;
  edits: Record<number, Partial<RfRow>>;
  onStartEdit: (curveKey: string) => void;
  onCancelEdit: () => void;
  onSave: () => void;
  onEditCell: (rfId: number, field: string, value: string) => void;
  onArchiveCurve: (curveKey: string, rfIds: number[]) => void;
  onArchiveRow: (rfId: number, name: string) => void;
  busy: boolean;
  dirtyTint: string;
}
