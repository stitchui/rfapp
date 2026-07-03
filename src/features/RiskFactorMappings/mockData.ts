import type { TreeNode, RfRow, CurveInfo, RfmLevel } from './types';
import apiResponse from '../../api/mockRfData.json';

type ApiRow = typeof apiResponse.data[0];

function mapApiRow(row: ApiRow): RfRow {
  return {
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

export function buildInitialTree(): TreeNode[] {
  const result: TreeNode[] = [];

  const findOrCreate = (arr: TreeNode[], key: string, level: RfmLevel): TreeNode => {
    let node = arr.find(n => n.key === key);
    if (!node) {
      node = { key, label: key, level, children: [] };
      arr.push(node);
    }
    return node;
  };

  for (const apiRow of apiResponse.data) {
    const rfRow = mapApiRow(apiRow);
    const { risk_factor_class: cls, rf_subclass: sub, rf_type: typ, currency: ccy, curve_name: curve } = apiRow;

    const clsNode  = findOrCreate(result, cls, 'class');
    const subNode  = findOrCreate(clsNode.children!, sub, 'subclass');
    const typNode  = findOrCreate(subNode.children!, typ, 'type');
    const ccyNode  = findOrCreate(typNode.children!, ccy, 'currency');

    let curveNode = ccyNode.children!.find(n => n.key === curve);
    if (!curveNode) {
      const curveInfo: CurveInfo = {
        risk_factor_class: cls, rf_subclass: sub, rf_type: typ,
        currency: ccy, curve_name: curve,
      };
      curveNode = { key: curve, label: curve, level: 'curve', curve: curveInfo, rows: [] };
      ccyNode.children!.push(curveNode);
    }

    curveNode.rows!.push(rfRow);
  }

  return result;
}

export function indexRfRows(tree: TreeNode[], out: Record<number, RfRow> = {}): Record<number, RfRow> {
  for (const node of tree) {
    if (node.level === 'curve' && node.rows) {
      node.rows.forEach(r => { out[r.risk_factor_id] = r; });
    } else if (node.children) {
      indexRfRows(node.children, out);
    }
  }
  return out;
}

export function insertCurve(
  tree: TreeNode[], cls: string, sub: string, typ: string,
  ccy: string, curve: string, rows: RfRow[]
): void {
  const findOrCreate = (arr: TreeNode[], key: string, lvl: RfmLevel): TreeNode => {
    let node = arr.find(n => n.key === key);
    if (!node) {
      node = { key, label: key, level: lvl, children: [] };
      arr.push(node);
    }
    if (!node.children) node.children = [];
    return node;
  };

  const clsNode = findOrCreate(tree, cls, 'class');
  const subNode = findOrCreate(clsNode.children!, sub, 'subclass');
  const typNode = findOrCreate(subNode.children!, typ, 'type');
  const ccyNode = findOrCreate(typNode.children!, ccy, 'currency');

  const existing = ccyNode.children!.find(n => n.key === curve);
  if (existing && existing.rows) {
    existing.rows = existing.rows.concat(rows);
  } else {
    ccyNode.children!.push({
      key: curve, label: curve, level: 'curve',
      curve: { risk_factor_class: cls, rf_subclass: sub, rf_type: typ, currency: ccy, curve_name: curve },
      rows,
    });
  }
}
