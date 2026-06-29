import type { TreeNode, RfRow, CurveInfo } from './types';

interface TenorSpec {
  code: string;
  ft: string;
  shock?: string;
  td?: string;
}

function makeCurveNode(
  cls: string, sub: string, typ: string, ccy: string,
  curve: string, ch: string, baseId: number, tenors: TenorSpec[]
): TreeNode {
  const curveInfo: CurveInfo = { rfClassCd: cls, rfSubclassCd: sub, rfTypeCd: typ, currencyCd: ccy, curveNm: curve };
  const rows: RfRow[] = tenors.map((t, i) => ({
    rfId: baseId + i,
    rfNm: `USSTS.${cls}_${ccy}_${curve.replace(/[^A-Za-z0-9]/g, '')}.${t.code}`,
    altRfNm: '',
    rfClassCd: cls, rfSubclassCd: sub, rfTypeCd: typ,
    currencyCd: ccy, curveNm: curve, curveInstrumentTypeNm: curve,
    clearingHouseCd: ch,
    futureTenorCd: t.ft,
    termCd: t.code,
    shockTypeCd: t.shock ?? 'Absolute',
    tenorDimensionCd: t.td ?? '1',
    validFromTs: '2025-01-02',
    validToTs: null,
    sourceNm: 'NEVA',
  }));
  return { key: curve, label: curve, level: 'curve', curve: curveInfo, rows };
}

const swap: TenorSpec[] = [
  { code: '2M', ft: '0' }, { code: '3Y', ft: '0' }, { code: '5Y', ft: '0' },
  { code: '10Y', ft: '0' }, { code: '25Y', ft: '0' }, { code: '30Y', ft: '1' },
];

export function buildInitialTree(): TreeNode[] {
  return [
    {
      key: 'IR', label: 'IR', level: 'class', children: [
        {
          key: 'Base', label: 'Base', level: 'subclass', children: [
            {
              key: 'OTC', label: 'OTC', level: 'type', children: [
                {
                  key: 'AED', label: 'AED', level: 'currency', children: [
                    makeCurveNode('IR', 'Base', 'OTC', 'AED', 'Swap', 'LCH', 100001, swap),
                    makeCurveNode('IR', 'Base', 'OTC', 'AED', 'Basis', 'LCH', 100020, [
                      { code: '3M', ft: '0' }, { code: '1Y', ft: '0' },
                      { code: '5Y', ft: '0' }, { code: '10Y', ft: '0' },
                    ]),
                  ],
                },
                {
                  key: 'USD', label: 'USD', level: 'currency', children: [
                    makeCurveNode('IR', 'Base', 'OTC', 'USD', 'Swap', 'CME', 100040, swap),
                  ],
                },
              ],
            },
            {
              key: 'CCS', label: 'CCS', level: 'type', children: [
                {
                  key: 'EUR', label: 'EUR', level: 'currency', children: [
                    makeCurveNode('IR', 'Base', 'CCS', 'EUR', 'XCcy Basis', 'LCH', 100061, [
                      { code: '1Y', ft: '0' }, { code: '5Y', ft: '0' }, { code: '10Y', ft: '0' },
                    ]),
                  ],
                },
              ],
            },
          ],
        },
        {
          key: 'Vol', label: 'Vol', level: 'subclass', children: [
            {
              key: 'OTC', label: 'OTC', level: 'type', children: [
                {
                  key: 'USD', label: 'USD', level: 'currency', children: [
                    makeCurveNode('IR', 'Vol', 'OTC', 'USD', 'ATM Vol', 'CME', 100081, [
                      { code: '1Yx1Y', ft: '0', shock: 'Relative' },
                      { code: '1Yx5Y', ft: '0', shock: 'Relative' },
                      { code: '5Yx5Y', ft: '0', shock: 'Relative' },
                    ]),
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      key: 'FX', label: 'FX', level: 'class', children: [
        {
          key: 'Spot', label: 'Spot', level: 'subclass', children: [
            {
              key: 'G10', label: 'G10', level: 'type', children: [
                {
                  key: 'EURUSD', label: 'EURUSD', level: 'currency', children: [
                    makeCurveNode('FX', 'Spot', 'G10', 'EURUSD', 'Spot', '—', 100101, [
                      { code: 'SP', ft: '0' },
                    ]),
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ];
}

export function indexRfRows(tree: TreeNode[], out: Record<number, RfRow> = {}): Record<number, RfRow> {
  for (const node of tree) {
    if (node.level === 'curve' && node.rows) {
      node.rows.forEach(r => { out[r.rfId] = r; });
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
  const findOrCreate = (arr: TreeNode[], key: string, lvl: TreeNode['level']): TreeNode => {
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
      curve: { rfClassCd: cls, rfSubclassCd: sub, rfTypeCd: typ, currencyCd: ccy, curveNm: curve },
      rows,
    });
  }
}
