import mockRfData from './mockRfData.json';
import mockDropdownData from './mockDropdownData.json';
import mockCloneData from './mockCloneData.json';

function mapApiRow(row) {
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

// Replace these with axiosInstance calls to match work codebase:
//   export const getRiskFactorMappings = async () => {
//     const req = await axiosInstance.get('/var/riskfactor/mappings');
//     return req.data;
//   };

export const getRiskFactorMappings = async () => {
  await delay(600);
  return mockRfData.data.map(mapApiRow);
};

export const getRiskFactorTimeseriesDropdowns = async () => {
  return mockDropdownData.data;
};

export const getRiskFactorTimeseries = async ({ risk_factor_class, currency, curve_name } = {}) => {
  await delay(800);
  return mockCloneData.data.map(r => ({
    _path: [r.risk_factor_class, r.rf_subclass, r.rf_type, r.currency, r.curve_name, r.risk_factor_name],
    risk_factor_id: 0,
    risk_factor_name: r.risk_factor_name,
    rf_alternative_name: r.rf_alternative_name,
    risk_factor_class: r.risk_factor_class,
    rf_subclass: r.rf_subclass,
    rf_type: r.rf_type,
    currency: r.currency,
    curve_name: r.curve_name,
    instrument_type: r.instrument_type,
    alt_clearing_house: r.alt_clearing_house,
    future_tenor: r.future_tenor.trim(),
    term_code: r.term_code,
    shock_type: r.shock_type,
    tenor_dimension: String(r.tenor_dimension),
    valid_from: r.valid_from,
    valid_to: null,
    source_name: r.source_name,
    base_curve: r.base_curve,
    basis_curve: r.basis_curve,
    currency_pair: r.currency_pair,
    curve_type: r.curve_type,
    effective_currency: r.effective_currency,
    margin_type: r.margin_type,
    sequence_number: r.sequence_number,
    vol_expiry: r.vol_expiry,
    vol_parameter_name: r.vol_parameter_name,
    vol_quote_moneyness: r.vol_quote_moneyness,
    vol_strike: r.vol_strike,
    vol_tenor: r.vol_tenor,
    node_selector_name: r.node_selector_name,
    expiry_month: r.expiry_month,
  }));
};

// axiosInstance.post('/var/riskfactor/mappings/save', riskFactors)
export const saveRiskFactorMappings = async (riskFactors) => {
  await delay(900);
  console.log('POST /var/riskfactor/mappings/save', riskFactors);
};

// axiosInstance.post('/var/riskfactor/mappings/archive', { risk_factor_ids })
export const archiveRiskFactorMappings = async ({ risk_factor_ids }) => {
  await delay(800);
  console.log('POST /var/riskfactor/mappings/archive', { risk_factor_ids });
};

const delay = (ms) => new Promise(res => setTimeout(res, ms));
