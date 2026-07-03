import type { RfRow } from './types';
import apiResponse from '../../api/mockRfData.json';

type ApiRow = typeof apiResponse.data[0];

function mapApiRow(row: ApiRow): RfRow {
  return {
    _path: [row.risk_factor_class, row.rf_subclass, row.rf_type, row.currency, row.curve_name, row.risk_factor_name],
    risk_factor_id: row.risk_factor_id,
    risk_factor_name: row.risk_factor_name,
    rf_alternative_name: row.rf_alternative_name,
    risk_factor_class: row.risk_factor_class,
    rf_subclass: row.rf_subclass,
    rf_type: row.rf_type,
    currency: row.currency,
    curve_name: row.curve_name,
    instrument_type: row.instrument_type,
    alt_clearing_house: row.alt_clearing_house,
    future_tenor: row.future_tenor.trim(),
    term_code: row.term_code,
    shock_type: row.shock_type,
    tenor_dimension: String(row.tenor_dimension),
    valid_from: row.valid_from,
    valid_to: row.valid_to.startsWith('2200') ? null : row.valid_to,
    source_name: row.source_name,
    base_curve: row.base_curve,
    basis_curve: row.basis_curve,
    currency_pair: row.currency_pair,
    curve_type: row.curve_type,
    effective_currency: row.effective_currency,
    margin_type: row.margin_type,
    sequence_number: row.sequence_number,
    vol_expiry: row.vol_expiry,
    vol_parameter_name: row.vol_parameter_name,
    vol_quote_moneyness: row.vol_quote_moneyness,
    vol_strike: row.vol_strike,
    vol_tenor: row.vol_tenor,
    node_selector_name: row.node_selector_name,
    expiry_month: row.expiry_month,
  };
}

export function buildLeafRows(): RfRow[] {
  return apiResponse.data.map(mapApiRow);
}
