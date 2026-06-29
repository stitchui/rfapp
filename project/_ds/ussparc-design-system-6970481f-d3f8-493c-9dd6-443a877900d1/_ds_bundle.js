/* @ds-bundle: {"format":3,"namespace":"USSPARCDesignSystem_697048","components":[{"name":"DashboardCard","sourcePath":"components/cards/DashboardCard.jsx"},{"name":"MetricCell","sourcePath":"components/cards/MetricCell.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"GradientDivider","sourcePath":"components/core/GradientDivider.jsx"},{"name":"DataTable","sourcePath":"components/data/DataTable.jsx"},{"name":"FilterSelect","sourcePath":"components/forms/FilterSelect.jsx"},{"name":"SegmentedToggle","sourcePath":"components/forms/SegmentedToggle.jsx"},{"name":"AppHeader","sourcePath":"components/layout/AppHeader.jsx"}],"sourceHashes":{"components/cards/DashboardCard.jsx":"6357aca292d0","components/cards/MetricCell.jsx":"00c07b512394","components/core/Badge.jsx":"bf4aa049f225","components/core/Button.jsx":"3c3cc2e90e13","components/core/GradientDivider.jsx":"86a9944f8705","components/data/DataTable.jsx":"34e90a988082","components/forms/FilterSelect.jsx":"8876295dcb59","components/forms/SegmentedToggle.jsx":"9a4c20eb7700","components/layout/AppHeader.jsx":"6193f5466d8a","ui_kits/risk-dashboard/App.jsx":"108b864cd333","ui_kits/risk-dashboard/charts.jsx":"c3e2438aef64","ui_kits/risk-dashboard/data.jsx":"3d543080caa5","ui_kits/risk-dashboard/panels.jsx":"c45bd992bf56","ui_kits/risk-dashboard/parts.jsx":"dad9660d27ea"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.USSPARCDesignSystem_697048 = window.USSPARCDesignSystem_697048 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/cards/MetricCell.jsx
try { (() => {
/**
 * KPI metric tile: a label, a large figure, a signed change, and the
 * signature corner triangle (teal for favourable / coral for adverse).
 * Mirrors the VALUE AT RISK / STRESS TESTING cells.
 */
function MetricCell({
  label,
  value,
  unit,
  change,
  direction = 'positive',
  // 'positive' | 'negative'
  style
}) {
  const adverse = direction === 'negative';
  const corner = adverse ? 'var(--negative-corner)' : 'var(--teal-corner)';
  const changeColor = adverse ? 'var(--negative)' : 'var(--positive)';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      background: 'var(--surface-card)',
      borderRight: '1px solid var(--border-divider)',
      borderBottom: '1px solid var(--border-divider)',
      borderBottomRightRadius: 12,
      boxShadow: 'var(--shadow-metric)',
      padding: '8px 14px 10px',
      fontFamily: 'var(--font-sans)',
      overflow: 'hidden',
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": true,
    style: {
      position: 'absolute',
      top: 0,
      right: 0,
      width: 0,
      height: 0,
      borderTop: `22px solid ${corner}`,
      borderLeft: '22px solid transparent',
      opacity: 0.9
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      color: 'var(--slate-600)',
      fontSize: 'var(--fs-sm)',
      fontWeight: 'var(--fw-medium)',
      marginBottom: 6
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--fs-figure)',
      fontWeight: 'var(--fw-medium)',
      color: 'var(--ink-900)',
      lineHeight: 1
    }
  }, value, unit ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '1.4rem'
    }
  }, unit) : null), change ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--fs-base)',
      fontWeight: 'var(--fw-medium)',
      color: changeColor
    }
  }, change) : null));
}
Object.assign(__ds_scope, { MetricCell });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/MetricCell.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Small status / label chip. The signature use is the lime "REL" / "Local"
 * environment badge in the header, plus neutral and semantic tones.
 */
function Badge({
  children,
  tone = 'lime',
  style,
  ...rest
}) {
  const tones = {
    lime: {
      background: 'var(--accent-lime)',
      color: '#fff'
    },
    green: {
      background: 'var(--green-700)',
      color: '#fff'
    },
    neutral: {
      background: 'var(--surface-toggle)',
      color: 'var(--slate-600)',
      border: '1px solid var(--border-soft)'
    },
    positive: {
      background: 'rgba(28,135,131,0.12)',
      color: 'var(--positive)'
    },
    negative: {
      background: 'rgba(217,106,74,0.14)',
      color: 'var(--negative)'
    }
  };
  const t = tones[tone] || tones.lime;
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      padding: '2px 8px',
      borderRadius: 'var(--radius-xs)',
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--fs-2xs)',
      fontWeight: 'var(--fw-bold)',
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      lineHeight: 1.4,
      ...t,
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * USSPARC primary action button.
 * Variants mirror the dashboard: solid green (primary), pale-mint GO,
 * outline, and ghost. Sizes sm / md.
 */
function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon = null,
  iconRight = null,
  disabled = false,
  type = 'button',
  onClick,
  style,
  ...rest
}) {
  const sizes = {
    sm: {
      height: 32,
      padding: '0 14px',
      font: 'var(--fs-sm)'
    },
    md: {
      height: 40,
      padding: '0 20px',
      font: 'var(--fs-base)'
    }
  };
  const s = sizes[size] || sizes.md;
  const variants = {
    primary: {
      background: 'var(--green-800)',
      color: '#fff',
      border: '1px solid var(--green-800)'
    },
    go: {
      background: 'var(--go-mint)',
      color: 'var(--go-mint-ink)',
      border: '1px solid var(--go-mint)',
      fontWeight: 'var(--fw-semibold)',
      letterSpacing: '0.04em'
    },
    outline: {
      background: 'transparent',
      color: 'var(--green-800)',
      border: '1px solid var(--green-800)'
    },
    ghost: {
      background: 'transparent',
      color: 'var(--slate-600)',
      border: '1px solid transparent'
    }
  };
  const v = variants[variant] || variants.primary;
  return /*#__PURE__*/React.createElement("button", _extends({
    type: type,
    disabled: disabled,
    onClick: onClick,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      height: s.height,
      padding: s.padding,
      borderRadius: 'var(--radius-pill)',
      fontFamily: 'var(--font-sans)',
      fontSize: s.font,
      fontWeight: v.fontWeight || 'var(--fw-medium)',
      letterSpacing: v.letterSpacing || 'normal',
      lineHeight: 1,
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.45 : 1,
      whiteSpace: 'nowrap',
      transition: 'filter var(--dur-base) var(--ease-standard), background var(--dur-base) var(--ease-standard)',
      ...v,
      ...style
    },
    onMouseEnter: e => {
      if (!disabled) e.currentTarget.style.filter = 'brightness(0.93)';
    },
    onMouseLeave: e => {
      e.currentTarget.style.filter = 'none';
    }
  }, rest), icon ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      fontSize: 18
    }
  }, icon) : null, children, iconRight ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      fontSize: 18
    }
  }, iconRight) : null);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/GradientDivider.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Brand divider: a hairline that fades from transparent to brand blue
 * (#486c94) at the centre and back. Horizontal or vertical.
 */
function GradientDivider({
  orientation = 'horizontal',
  length,
  style,
  ...rest
}) {
  const horizontal = orientation === 'horizontal';
  return /*#__PURE__*/React.createElement("div", _extends({
    role: "separator",
    "aria-orientation": orientation,
    style: {
      border: 'none',
      background: horizontal ? 'var(--divider-h)' : 'var(--divider-v)',
      height: horizontal ? '1.7px' : length || 'auto',
      width: horizontal ? length || '100%' : '1.7px',
      alignSelf: 'stretch',
      margin: horizontal ? '8px 0' : '0 8px',
      flexShrink: 0,
      ...style
    }
  }, rest));
}
Object.assign(__ds_scope, { GradientDivider });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/GradientDivider.jsx", error: String((e && e.message) || e) }); }

// components/cards/DashboardCard.jsx
try { (() => {
const AVATARS = {
  entity: {
    fill: 'var(--avatar-entity-fill)',
    ring: 'var(--avatar-entity-ring)',
    icon: 'apartment'
  },
  products: {
    fill: 'var(--avatar-products-fill)',
    ring: 'var(--avatar-products-ring)',
    icon: 'description'
  },
  risk: {
    fill: 'var(--avatar-risk-fill)',
    ring: 'var(--avatar-risk-ring)',
    icon: 'shield'
  }
};

/**
 * The white dashboard card shell. Two title treatments:
 *  - titleVariant="card"    → UPPERCASE brand-blue title with a coloured
 *                             concern avatar + gradient divider (Entity / Products).
 *  - titleVariant="section" → quieter slate title for chart/table panels.
 */
function DashboardCard({
  title,
  titleVariant = 'card',
  avatar,
  icon,
  actions,
  children,
  padded = true,
  style
}) {
  const av = avatar ? AVATARS[avatar] : null;
  const isCard = titleVariant === 'card';
  return /*#__PURE__*/React.createElement("section", {
    style: {
      background: 'var(--surface-card)',
      border: '1px solid var(--border-card)',
      borderRadius: 'var(--radius-xl)',
      boxShadow: 'var(--shadow-card)',
      fontFamily: 'var(--font-sans)',
      overflow: 'hidden',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: padded ? '18px 20px' : 0
    }
  }, isCard ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      marginBottom: 16
    }
  }, av ? /*#__PURE__*/React.createElement("div", {
    style: {
      width: 48,
      height: 48,
      borderRadius: '50%',
      background: av.fill,
      border: `5px solid ${av.ring}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
      marginRight: 14
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "material-symbols-rounded",
    style: {
      color: '#fff',
      fontSize: 24
    }
  }, icon || av.icon)) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      paddingTop: 2
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontSize: 'var(--fs-2xl)',
      fontWeight: 'var(--fw-semibold)',
      letterSpacing: 'var(--ls-cardtitle)',
      textTransform: 'uppercase',
      color: 'var(--slate-600)',
      lineHeight: 1.15
    }
  }, title), actions ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 2
    }
  }, actions) : null), /*#__PURE__*/React.createElement(__ds_scope.GradientDivider, {
    style: {
      marginTop: 5
    }
  }))) : /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontSize: 'var(--fs-xl)',
      fontWeight: 'var(--fw-medium)',
      color: 'var(--slate-700)'
    }
  }, title), actions ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6
    }
  }, actions) : null), children));
}
Object.assign(__ds_scope, { DashboardCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/DashboardCard.jsx", error: String((e && e.message) || e) }); }

// components/data/DataTable.jsx
try { (() => {
/**
 * Quiet analytics table in the ag-grid "quartz" style used across USSPARC:
 * tinted header, hairline row rules, centred numeric columns, optional bold
 * total row. Purely presentational.
 */
function DataTable({
  columns = [],
  rows = [],
  totalRow,
  dense = false,
  style
}) {
  const rh = dense ? 36 : 42;
  const align = c => c.align || (c.numeric ? 'right' : 'left');
  return /*#__PURE__*/React.createElement("div", {
    style: {
      border: '1px solid var(--border-hair)',
      borderRadius: 'var(--radius-sm)',
      overflow: 'hidden',
      fontFamily: 'var(--font-sans)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("table", {
    style: {
      width: '100%',
      borderCollapse: 'collapse',
      tableLayout: 'fixed'
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", {
    style: {
      background: 'var(--surface-subtle)'
    }
  }, columns.map((c, i) => /*#__PURE__*/React.createElement("th", {
    key: c.key || i,
    style: {
      textAlign: align(c),
      padding: '0 12px',
      height: rh,
      fontSize: '0.86rem',
      fontWeight: 600,
      color: 'var(--slate-500)',
      width: c.width,
      whiteSpace: 'nowrap'
    }
  }, c.header)))), /*#__PURE__*/React.createElement("tbody", null, rows.map((r, ri) => /*#__PURE__*/React.createElement("tr", {
    key: ri,
    style: {
      borderTop: '1px solid var(--border-hair)',
      transition: 'background var(--dur-fast)'
    },
    onMouseEnter: e => e.currentTarget.style.background = 'var(--surface-hover)',
    onMouseLeave: e => e.currentTarget.style.background = 'transparent'
  }, columns.map((c, ci) => /*#__PURE__*/React.createElement("td", {
    key: c.key || ci,
    style: {
      textAlign: align(c),
      padding: '0 12px',
      height: rh,
      fontSize: '0.84rem',
      color: ci === 0 ? 'var(--slate-700)' : '#455669',
      fontFamily: c.numeric ? 'var(--font-mono)' : 'var(--font-sans)',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, c.render ? c.render(r[c.key], r) : r[c.key])))), totalRow ? /*#__PURE__*/React.createElement("tr", {
    style: {
      borderTop: '2px solid var(--border-divider)'
    }
  }, columns.map((c, ci) => /*#__PURE__*/React.createElement("td", {
    key: c.key || ci,
    style: {
      textAlign: align(c),
      padding: '0 12px',
      height: rh,
      fontSize: '0.86rem',
      fontWeight: 700,
      color: 'var(--ink-900)',
      fontFamily: c.numeric ? 'var(--font-mono)' : 'var(--font-sans)',
      whiteSpace: 'nowrap'
    }
  }, totalRow[c.key]))) : null)));
}
Object.assign(__ds_scope, { DataTable });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/DataTable.jsx", error: String((e && e.message) || e) }); }

// components/forms/FilterSelect.jsx
try { (() => {
const {
  useState,
  useRef,
  useEffect
} = React;
/**
 * The signature USSPARC filter control: a dark-green pill with an optional
 * floating label and a circular chevron button on the right. Used across the
 * dashboard query bar (COB, Entity Scope, Regulator, Market Risk).
 */
function FilterSelect({
  label,
  value,
  options = [],
  onChange,
  placeholder = 'Select',
  width = 240,
  style
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const onDoc = e => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);
  const selected = options.find(o => (o.value ?? o) === value);
  const display = selected ? selected.label ?? selected : '';
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    style: {
      position: 'relative',
      width,
      fontFamily: 'var(--font-sans)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => setOpen(o => !o),
    style: {
      width: '100%',
      height: 44,
      borderRadius: 'var(--radius-pill)',
      background: 'var(--green-900)',
      border: 'none',
      color: 'var(--on-green-text)',
      textAlign: 'left',
      cursor: 'pointer',
      padding: label ? '0 56px 0 27px' : '0 56px 0 27px',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    }
  }, label ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: display ? '0.65rem' : '0.9rem',
      color: display ? 'var(--on-green-muted)' : 'var(--on-green-text)',
      fontWeight: 500,
      lineHeight: 1.1,
      transition: 'font-size var(--dur-base) var(--ease-standard)'
    }
  }, label) : null, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '0.9rem',
      fontWeight: 500,
      color: 'var(--on-green-text)',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, display || (label ? '' : placeholder)), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": true,
    style: {
      position: 'absolute',
      right: 18,
      top: '50%',
      transform: `translateY(-50%) rotate(${open ? 180 : 0}deg)`,
      transition: 'transform var(--dur-base) var(--ease-standard)',
      width: 23,
      height: 23,
      borderRadius: '50%',
      border: '2px solid rgba(172,182,202,0.5)',
      background: 'rgba(0,0,0,0.1)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'var(--on-green-muted)',
      fontSize: 16
    },
    className: "material-symbols-rounded"
  }, "keyboard_arrow_down")), open ? /*#__PURE__*/React.createElement("ul", {
    style: {
      position: 'absolute',
      top: 'calc(100% + 6px)',
      left: 0,
      right: 0,
      margin: 0,
      padding: 6,
      listStyle: 'none',
      background: '#fff',
      borderRadius: 'var(--radius-md)',
      boxShadow: 'var(--shadow-pop)',
      zIndex: 40,
      maxHeight: 280,
      overflowY: 'auto'
    }
  }, options.map(o => {
    const ov = o.value ?? o;
    const ol = o.label ?? o;
    const active = ov === value;
    return /*#__PURE__*/React.createElement("li", {
      key: ov
    }, /*#__PURE__*/React.createElement("button", {
      type: "button",
      onClick: () => {
        onChange && onChange(ov);
        setOpen(false);
      },
      style: {
        width: '100%',
        textAlign: 'left',
        border: 'none',
        background: active ? 'var(--surface-toggle)' : 'transparent',
        color: 'var(--slate-700)',
        padding: '9px 12px',
        borderRadius: 'var(--radius-sm)',
        fontSize: 'var(--fs-base)',
        cursor: 'pointer'
      },
      onMouseEnter: e => e.currentTarget.style.background = 'var(--surface-subtle)',
      onMouseLeave: e => e.currentTarget.style.background = active ? 'var(--surface-toggle)' : 'transparent'
    }, ol));
  })) : null);
}
Object.assign(__ds_scope, { FilterSelect });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/FilterSelect.jsx", error: String((e && e.message) || e) }); }

// components/forms/SegmentedToggle.jsx
try { (() => {
/**
 * Segmented pill toggle. Two presentations:
 *  - variant="text"  → the VaR / SVaR switch (active = dark navy, white text)
 *  - variant="icon"  → the chart/list view switch (track pill, active = white
 *                      tile with blue icon)
 */
function SegmentedToggle({
  options = [],
  value,
  onChange,
  variant = 'text',
  style
}) {
  const isIcon = variant === 'icon';
  return /*#__PURE__*/React.createElement("div", {
    role: "tablist",
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: isIcon ? 3 : 0,
      padding: isIcon ? 3 : 3,
      borderRadius: 'var(--radius-pill)',
      background: 'var(--surface-toggle)',
      border: '1px solid var(--border-soft)',
      boxShadow: 'var(--shadow-toggle-inset)',
      fontFamily: 'var(--font-sans)',
      ...style
    }
  }, options.map(o => {
    const ov = o.value ?? o;
    const active = ov === value;
    return /*#__PURE__*/React.createElement("button", {
      key: ov,
      role: "tab",
      "aria-selected": active,
      onClick: () => onChange && onChange(ov),
      style: {
        border: 'none',
        cursor: 'pointer',
        borderRadius: 'var(--radius-pill)',
        transition: 'all var(--dur-base) var(--ease-standard)',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...(isIcon ? {
          width: 38,
          height: 26,
          background: active ? '#fff' : 'transparent',
          color: active ? 'var(--toggle-icon-active)' : 'var(--slate-400)',
          boxShadow: active ? 'var(--shadow-btn-blue)' : 'none'
        } : {
          minWidth: 64,
          height: 30,
          padding: '0 18px',
          fontSize: 'var(--fs-sm)',
          fontWeight: active ? 700 : 500,
          background: active ? 'var(--toggle-active-ink)' : 'transparent',
          color: active ? '#fff' : 'var(--slate-450)'
        })
      }
    }, o.icon ? /*#__PURE__*/React.createElement("span", {
      className: "material-symbols-rounded",
      style: {
        fontSize: 18
      }
    }, o.icon) : o.label ?? o);
  }));
}
Object.assign(__ds_scope, { SegmentedToggle });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/SegmentedToggle.jsx", error: String((e && e.message) || e) }); }

// components/layout/AppHeader.jsx
try { (() => {
const {
  useState
} = React;
function LogoMark({
  size = 32
}) {
  return /*#__PURE__*/React.createElement("svg", {
    width: size * 28 / 32,
    height: size,
    viewBox: "0 0 28 32",
    fill: "none",
    "aria-hidden": true,
    style: {
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M4 28 L10 4 L14 5 L8 29 Z",
    fill: "var(--accent-lime)",
    fillOpacity: "0.95"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M10 28 L16 2 L20 3 L14 29 Z",
    fill: "var(--accent-lime)"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M16 28 L22 0 L26 1 L20 29 Z",
    fill: "var(--accent-lime)",
    fillOpacity: "0.9"
  }));
}
function NavItem({
  item,
  active,
  onSelect
}) {
  const [open, setOpen] = useState(false);
  const hasMenu = item.items && item.items.length > 0;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    },
    onMouseLeave: () => setOpen(false)
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      onSelect && onSelect(item.label);
      if (hasMenu) setOpen(o => !o);
    },
    onMouseEnter: () => hasMenu && setOpen(true),
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 4,
      background: active || open ? 'rgba(255,255,255,0.1)' : 'transparent',
      border: 'none',
      color: '#fff',
      fontFamily: 'var(--font-menu)',
      fontSize: 'var(--fs-2xs)',
      fontWeight: 'var(--fw-semibold)',
      letterSpacing: 'var(--ls-nav)',
      padding: '8px 12px',
      borderRadius: 6,
      cursor: 'pointer',
      position: 'relative'
    }
  }, item.label, hasMenu ? /*#__PURE__*/React.createElement("span", {
    className: "material-symbols-rounded",
    style: {
      fontSize: 16,
      transition: 'transform var(--dur-base)',
      transform: open ? 'rotate(180deg)' : 'none'
    }
  }, "keyboard_arrow_down") : null, active ? /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      left: 12,
      right: 12,
      bottom: 2,
      height: 2,
      background: '#fff',
      borderRadius: 2
    }
  }) : null), hasMenu && open ? /*#__PURE__*/React.createElement("ul", {
    style: {
      position: 'absolute',
      top: '100%',
      left: '50%',
      transform: 'translateX(-50%)',
      marginTop: 4,
      minWidth: 220,
      background: '#fff',
      borderRadius: 'var(--radius-sm)',
      boxShadow: 'var(--shadow-pop)',
      listStyle: 'none',
      padding: 6,
      margin: 0,
      zIndex: 50
    }
  }, item.items.map(sub => /*#__PURE__*/React.createElement("li", {
    key: sub
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setOpen(false),
    style: {
      width: '100%',
      textAlign: 'left',
      border: 'none',
      background: 'transparent',
      color: 'var(--slate-700)',
      padding: '10px 12px',
      borderRadius: 6,
      fontSize: 'var(--fs-base)',
      cursor: 'pointer'
    },
    onMouseEnter: e => e.currentTarget.style.background = 'var(--surface-subtle)',
    onMouseLeave: e => e.currentTarget.style.background = 'transparent'
  }, sub)))) : null);
}
const DEFAULT_NAV = [{
  label: 'DASHBOARD',
  items: ['VaR', 'Market Data', 'SVaR Window Calibration']
}, {
  label: 'VaR',
  items: ['Calculator', 'Risk Factor', 'Model Configuration', 'Benchmarking']
}, {
  label: 'STRESS',
  items: ['Scenario Viewer', 'Shock Rates']
}, {
  label: 'SUPPORT',
  items: ['Runs', 'DQ Reports', 'Job Trigger', 'Recon']
}];
const UTILITIES = ['public', 'build', 'notifications', 'account_circle'];

/**
 * USSPARC global app bar: dark-green AppBar, lime logo + wordmark, REL badge,
 * centred primary nav with dropdowns, utility icons, and the lime accent rule.
 */
function AppHeader({
  nav = DEFAULT_NAV,
  active = 'DASHBOARD',
  env = 'REL',
  onNavSelect
}) {
  return /*#__PURE__*/React.createElement("header", {
    style: {
      fontFamily: 'var(--font-sans)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--green-800)',
      color: '#fff',
      height: 'var(--header-height)',
      display: 'flex',
      alignItems: 'center',
      gap: 16,
      padding: '0 28px'
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      textDecoration: 'none',
      color: '#fff',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement(LogoMark, {
    size: 32
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-serif)',
      fontSize: 'var(--fs-lg)',
      letterSpacing: 'var(--ls-wordmark)'
    }
  }, "US SPARC"), env ? /*#__PURE__*/React.createElement("span", {
    style: {
      background: 'var(--accent-lime)',
      color: '#fff',
      fontSize: 'var(--fs-2xs)',
      fontWeight: 'var(--fw-bold)',
      letterSpacing: '0.08em',
      padding: '2px 7px',
      borderRadius: 'var(--radius-xs)'
    }
  }, env) : null), /*#__PURE__*/React.createElement("nav", {
    style: {
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 6
    }
  }, nav.map(item => /*#__PURE__*/React.createElement(NavItem, {
    key: item.label,
    item: item,
    active: item.label === active,
    onSelect: onNavSelect
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 2,
      flexShrink: 0
    }
  }, UTILITIES.map(g => /*#__PURE__*/React.createElement("button", {
    key: g,
    style: {
      background: 'transparent',
      border: 'none',
      color: 'rgba(255,255,255,0.95)',
      width: 38,
      height: 38,
      borderRadius: 8,
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    onMouseEnter: e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)',
    onMouseLeave: e => e.currentTarget.style.background = 'transparent'
  }, /*#__PURE__*/React.createElement("span", {
    className: "material-symbols-rounded",
    style: {
      fontSize: 23
    }
  }, g))))), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 'var(--header-accent)',
      background: 'var(--accent-lime)'
    }
  }));
}
Object.assign(__ds_scope, { AppHeader });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/layout/AppHeader.jsx", error: String((e && e.message) || e) }); }

// ui_kits/risk-dashboard/App.jsx
try { (() => {
// USSPARC Risk Dashboard — app shell & screens
const {
  useState: useStateA
} = React;
const A_UI = window.USSPARC_UI;
const A_P = window.USSPARC_PANELS;
const A_C = window.USSPARC_CHARTS;
const A_D = window.USSPARC_DATA;
function Login({
  onEnter
}) {
  const [pw, setPw] = useStateA('');
  return /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--surface-page)',
      fontFamily: 'var(--font-sans)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 400,
      background: '#fff',
      borderRadius: 18,
      boxShadow: 'var(--shadow-card)',
      padding: 36
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginBottom: 24
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "44",
    height: "50",
    viewBox: "0 0 28 32",
    "aria-hidden": true,
    style: {
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M4 28 L10 4 L14 5 L8 29 Z",
    fill: "var(--green-800)",
    fillOpacity: "0.95"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M10 28 L16 2 L20 3 L14 29 Z",
    fill: "var(--green-800)"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M16 28 L22 0 L26 1 L20 29 Z",
    fill: "var(--accent-lime)"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-serif)',
      fontSize: '1.4rem',
      color: 'var(--green-800)',
      letterSpacing: '0.04em'
    }
  }, "US SPARC"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: 'var(--slate-450)',
      marginTop: 6
    }
  }, "Enter password to continue")), /*#__PURE__*/React.createElement("form", {
    onSubmit: e => {
      e.preventDefault();
      onEnter();
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "password",
    placeholder: "Password",
    value: pw,
    onChange: e => setPw(e.target.value),
    autoFocus: true,
    style: {
      width: '100%',
      height: 46,
      borderRadius: 8,
      border: '1px solid var(--border-card)',
      padding: '0 14px',
      fontSize: 15,
      fontFamily: 'var(--font-sans)',
      marginBottom: 16,
      boxSizing: 'border-box',
      outline: 'none'
    }
  }), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    style: {
      width: '100%',
      height: 46,
      borderRadius: 999,
      border: 'none',
      background: 'var(--green-800)',
      color: '#fff',
      fontSize: 15,
      fontWeight: 600,
      cursor: 'pointer'
    }
  }, "Enter")), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      marginTop: 14,
      fontSize: 11.5,
      color: 'var(--slate-400)'
    }
  }, "Protected analytics environment \xB7 REL")));
}
function Home({
  onNav
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: '100vh',
      background: 'var(--surface-page)',
      fontFamily: 'var(--font-sans)'
    }
  }, /*#__PURE__*/React.createElement(A_UI.Header, {
    active: "",
    onNav: onNav
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--green-800)',
      height: 120
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1180,
      margin: '-70px auto 0',
      padding: '0 28px 60px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: '#fff',
      borderRadius: 12,
      boxShadow: 'var(--shadow-card)',
      padding: '32px 36px'
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      fontSize: '1.5rem',
      fontWeight: 700,
      color: 'var(--slate-550)',
      letterSpacing: '-0.02em'
    }
  }, "Welcome"), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 1,
      background: 'var(--border-card)',
      margin: '18px 0'
    }
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      color: 'var(--slate-450)',
      fontSize: 15,
      lineHeight: 1.65,
      textWrap: 'pretty'
    }
  }, "USSPARC is a quantitative analytics platform supporting internal reporting, front office, and risk management calculations."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 24,
      display: 'flex',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => onNav('dashboard'),
    style: {
      height: 40,
      padding: '0 22px',
      borderRadius: 999,
      border: 'none',
      background: 'var(--green-800)',
      color: '#fff',
      fontSize: 14,
      fontWeight: 500,
      cursor: 'pointer'
    }
  }, "Open Dashboard"), /*#__PURE__*/React.createElement("button", {
    onClick: () => onNav('dashboard'),
    style: {
      height: 40,
      padding: '0 22px',
      borderRadius: 999,
      border: '1px solid var(--green-800)',
      background: 'transparent',
      color: 'var(--green-800)',
      fontSize: 14,
      fontWeight: 500,
      cursor: 'pointer'
    }
  }, "View VaR")))));
}
function Dashboard({
  onNav
}) {
  const [filters, setFilters] = useStateA({
    cob: '2026-04-17',
    entity: 'SMBC CAPITAL MARKETS INC',
    reg: 'Regulator',
    desk: 'Market Risk'
  });
  const [metric, setMetric] = useStateA('var');
  const [seed, setSeed] = useStateA(101);
  const d = A_D.COBS[filters.cob] || A_D.COBS['2026-04-17'];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: '100vh',
      background: 'var(--surface-page-cool)',
      fontFamily: 'var(--font-sans)'
    }
  }, /*#__PURE__*/React.createElement(A_UI.Header, {
    active: "DASHBOARD",
    onNav: onNav
  }), /*#__PURE__*/React.createElement(A_UI.FilterBar, {
    state: filters,
    set: setFilters,
    onGo: () => setSeed(s => s + 37)
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1480,
      margin: '-12px auto 0',
      padding: '0 24px 48px',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 18
    }
  }, /*#__PURE__*/React.createElement(A_P.MetricCard, {
    title: "Value at Risk",
    avatar: "entity",
    icon: "apartment",
    cells: [{
      label: 'VaR (99%, 1-Day)',
      value: d.var,
      unit: d.varU,
      change: d.varChg,
      dir: d.varDir
    }, {
      label: 'SVaR (99%, 1-Day)',
      value: d.svar,
      unit: d.svarU,
      change: d.svarChg,
      dir: d.svarDir
    }]
  }), /*#__PURE__*/React.createElement(A_P.MetricCard, {
    title: "Stress Testing",
    avatar: "products",
    icon: "description",
    cells: [{
      label: 'CCAR2025_Exp',
      value: d.ccar,
      unit: d.ccarU,
      change: d.ccarChg,
      dir: d.ccarDir
    }, {
      label: '2022 Inflation',
      value: d.infl,
      unit: d.inflU,
      change: d.inflChg,
      dir: d.inflDir
    }]
  }), /*#__PURE__*/React.createElement(A_P.AttrTable, {
    metric: metric,
    setMetric: setMetric,
    rows: A_D.VAR_ATTR[metric],
    total: A_D.VAR_TOTAL[metric]
  }), /*#__PURE__*/React.createElement(A_P.StressTable, {
    rows: A_D.STRESS_ATTR
  }), /*#__PURE__*/React.createElement(A_C.Backtest, {
    seed: seed
  }), /*#__PURE__*/React.createElement(A_C.StressMaxLoss, {
    seed: seed
  })));
}
function App() {
  const [route, setRoute] = useStateA('login');
  if (route === 'login') return /*#__PURE__*/React.createElement(Login, {
    onEnter: () => setRoute('home')
  });
  if (route === 'home') return /*#__PURE__*/React.createElement(Home, {
    onNav: setRoute
  });
  return /*#__PURE__*/React.createElement(Dashboard, {
    onNav: setRoute
  });
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(App, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/risk-dashboard/App.jsx", error: String((e && e.message) || e) }); }

// ui_kits/risk-dashboard/charts.jsx
try { (() => {
// USSPARC Risk Dashboard — SVG charts
const {
  useState: useStateC
} = React;
const PUI = window.USSPARC_UI;
const PP = window.USSPARC_PANELS;
const D = window.USSPARC_DATA;
function ChartFrame({
  title,
  view,
  setView,
  children
}) {
  return /*#__PURE__*/React.createElement(PP.Panel, {
    style: {
      borderRadius: 18
    }
  }, /*#__PURE__*/React.createElement(PP.SectionTitle, {
    actions: /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 8
      }
    }, /*#__PURE__*/React.createElement(PP.IconToggle, {
      value: view,
      onChange: setView,
      options: [{
        value: 'chart',
        icon: 'show_chart'
      }, {
        value: 'list',
        icon: 'format_list_bulleted'
      }]
    }), /*#__PURE__*/React.createElement(PUI.IconBtn, {
      n: "open_in_full",
      size: 16
    }))
  }, title), children);
}

/* ---- VaR Backtesting: thin clean-PnL bars (around 0), gold VaR line, orange limit ---- */
function Backtest({
  seed
}) {
  const [view, setView] = useStateC('chart');
  const W = 560,
    H = 300,
    padL = 54,
    padR = 12,
    padT = 12,
    padB = 46;
  const n = 60;
  const clean = D.series(seed, n, -3.2, 3.2);
  const varLine = D.series(seed + 7, n, -9, -2).map((v, i) => v - (i > 38 && i < 44 ? 6 : 0));
  const limit = -25;
  const yMin = -30,
    yMax = 10;
  const x = i => padL + i / (n - 1) * (W - padL - padR);
  const y = v => padT + (1 - (v - yMin) / (yMax - yMin)) * (H - padT - padB);
  const ticks = [10, 0, -10, -20, -30];
  if (view === 'list') {
    return /*#__PURE__*/React.createElement(ChartFrame, {
      title: "VaR Backtesting",
      view: view,
      setView: setView
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        height: 300,
        overflow: 'auto',
        border: '1px solid var(--border-hair)',
        borderRadius: 8
      }
    }, /*#__PURE__*/React.createElement("table", {
      style: {
        width: '100%',
        borderCollapse: 'collapse'
      }
    }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", {
      style: {
        background: 'var(--surface-subtle)'
      }
    }, ['COB', 'Clean PnL', 'VaR', 'Limit'].map(h => /*#__PURE__*/React.createElement("th", {
      key: h,
      style: {
        padding: '8px 14px',
        textAlign: 'left',
        fontSize: 12,
        color: 'var(--slate-500)',
        fontWeight: 600
      }
    }, h)))), /*#__PURE__*/React.createElement("tbody", null, clean.slice(0, 14).map((c, i) => /*#__PURE__*/React.createElement("tr", {
      key: i,
      style: {
        borderTop: '1px solid var(--border-hair)'
      }
    }, /*#__PURE__*/React.createElement("td", {
      style: {
        padding: '7px 14px',
        fontSize: 12.5,
        color: 'var(--slate-700)'
      }
    }, D.MONTHS[i % 12]), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: '7px 14px',
        fontFamily: 'var(--font-mono)',
        fontSize: 12
      }
    }, c.toFixed(1), "M"), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: '7px 14px',
        fontFamily: 'var(--font-mono)',
        fontSize: 12
      }
    }, varLine[i].toFixed(1), "M"), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: '7px 14px',
        fontFamily: 'var(--font-mono)',
        fontSize: 12
      }
    }, "-25.0M")))))), /*#__PURE__*/React.createElement(Legend, {
      items: [['Clean PnL', 'var(--chart-bar)', 'dot'], ['VaR', 'var(--chart-line-var)', 'line'], ['Limit', 'var(--chart-limit)', 'line']]
    }));
  }
  return /*#__PURE__*/React.createElement(ChartFrame, {
    title: "VaR Backtesting",
    view: view,
    setView: setView
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: `0 0 ${W} ${H}`,
    style: {
      width: '100%',
      height: 300
    },
    preserveAspectRatio: "none"
  }, ticks.map(t => /*#__PURE__*/React.createElement("g", {
    key: t
  }, /*#__PURE__*/React.createElement("line", {
    x1: padL,
    x2: W - padR,
    y1: y(t),
    y2: y(t),
    stroke: "var(--chart-grid)"
  }), /*#__PURE__*/React.createElement("text", {
    x: padL - 8,
    y: y(t) + 3,
    textAnchor: "end",
    fontSize: "10",
    fill: "var(--chart-axis)"
  }, t, "M"))), clean.map((c, i) => /*#__PURE__*/React.createElement("line", {
    key: i,
    x1: x(i),
    x2: x(i),
    y1: y(0),
    y2: y(c),
    stroke: "var(--chart-bar)",
    strokeWidth: "1.6"
  })), /*#__PURE__*/React.createElement("polyline", {
    fill: "none",
    stroke: "var(--chart-line-var)",
    strokeWidth: "2.2",
    points: varLine.map((v, i) => `${x(i)},${y(v)}`).join(' ')
  }), /*#__PURE__*/React.createElement("line", {
    x1: padL,
    x2: W - padR,
    y1: y(limit),
    y2: y(limit),
    stroke: "var(--chart-limit)",
    strokeWidth: "2.4"
  }), D.MONTHS.map((m, i) => /*#__PURE__*/React.createElement("text", {
    key: m,
    x: padL + i / 11 * (W - padL - padR),
    y: H - padB + 22,
    fontSize: "9.5",
    fill: "var(--chart-axis)",
    textAnchor: "end",
    transform: `rotate(-52 ${padL + i / 11 * (W - padL - padR)} ${H - padB + 22})`
  }, m))), /*#__PURE__*/React.createElement(Legend, {
    items: [['Clean PnL', 'var(--chart-bar)', 'dot'], ['VaR', 'var(--chart-line-var)', 'line'], ['Limit', 'var(--chart-limit)', 'line']]
  }));
}

/* ---- Stress Max Loss: teal up bars (base mkt value), gold down bars (stress PnL), orange limit ---- */
function StressMaxLoss({
  seed
}) {
  const [view, setView] = useStateC('chart');
  const W = 560,
    H = 300,
    padL = 50,
    padR = 40,
    padT = 12,
    padB = 46;
  const n = 12;
  const up = D.series(seed + 3, n, 30, 95);
  const down = D.series(seed + 11, n, 20, 90);
  const mid = padT + (H - padT - padB) * 0.5;
  const colW = (W - padL - padR) / n;
  const barW = colW * 0.32;
  const cx = i => padL + colW * (i + 0.5);
  if (view === 'list') {
    return /*#__PURE__*/React.createElement(ChartFrame, {
      title: "Stress Max Loss",
      view: view,
      setView: setView
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        height: 300,
        overflow: 'auto',
        border: '1px solid var(--border-hair)',
        borderRadius: 8
      }
    }, /*#__PURE__*/React.createElement("table", {
      style: {
        width: '100%',
        borderCollapse: 'collapse'
      }
    }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", {
      style: {
        background: 'var(--surface-subtle)'
      }
    }, ['Month', 'Stress PnL', 'Base Mkt Value'].map(h => /*#__PURE__*/React.createElement("th", {
      key: h,
      style: {
        padding: '8px 14px',
        textAlign: 'left',
        fontSize: 12,
        color: 'var(--slate-500)',
        fontWeight: 600
      }
    }, h)))), /*#__PURE__*/React.createElement("tbody", null, up.map((u, i) => /*#__PURE__*/React.createElement("tr", {
      key: i,
      style: {
        borderTop: '1px solid var(--border-hair)'
      }
    }, /*#__PURE__*/React.createElement("td", {
      style: {
        padding: '7px 14px',
        fontSize: 12.5,
        color: 'var(--slate-700)'
      }
    }, D.MONTHS[i]), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: '7px 14px',
        fontFamily: 'var(--font-mono)',
        fontSize: 12
      }
    }, "-", down[i].toFixed(0), "M"), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: '7px 14px',
        fontFamily: 'var(--font-mono)',
        fontSize: 12
      }
    }, "$", (u / 50).toFixed(1), "B")))))), /*#__PURE__*/React.createElement(Legend, {
      items: [['Stress PnL', 'var(--chart-line-var)', 'dot'], ['Base Market Value', 'var(--chart-bar)', 'dot'], ['Limit', 'var(--chart-limit)', 'line']]
    }));
  }
  return /*#__PURE__*/React.createElement(ChartFrame, {
    title: "Stress Max Loss",
    view: view,
    setView: setView
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: `0 0 ${W} ${H}`,
    style: {
      width: '100%',
      height: 300
    },
    preserveAspectRatio: "none"
  }, /*#__PURE__*/React.createElement("line", {
    x1: padL,
    x2: W - padR,
    y1: mid,
    y2: mid,
    stroke: "var(--chart-grid)"
  }), /*#__PURE__*/React.createElement("text", {
    x: padL - 8,
    y: padT + 10,
    textAnchor: "end",
    fontSize: "10",
    fill: "var(--chart-axis)"
  }, "$100M"), /*#__PURE__*/React.createElement("text", {
    x: padL - 8,
    y: mid + 3,
    textAnchor: "end",
    fontSize: "10",
    fill: "var(--chart-axis)"
  }, "$0M"), /*#__PURE__*/React.createElement("text", {
    x: padL - 8,
    y: H - padB,
    textAnchor: "end",
    fontSize: "10",
    fill: "var(--chart-axis)"
  }, "-$100M"), up.map((u, i) => {
    const h = u / 100 * (mid - padT);
    return /*#__PURE__*/React.createElement("rect", {
      key: 'u' + i,
      x: cx(i) - barW - 1,
      y: mid - h,
      width: barW,
      height: h,
      rx: barW / 2,
      fill: "var(--chart-bar)"
    });
  }), down.map((dn, i) => {
    const h = dn / 100 * (H - padB - mid);
    return /*#__PURE__*/React.createElement("rect", {
      key: 'd' + i,
      x: cx(i) + 1,
      y: mid,
      width: barW,
      height: h,
      rx: barW / 2,
      fill: "var(--chart-line-var)"
    });
  }), /*#__PURE__*/React.createElement("line", {
    x1: padL,
    x2: W - padR,
    y1: H - padB - 6,
    y2: H - padB - 6,
    stroke: "var(--chart-limit)",
    strokeWidth: "2.4"
  }), D.MONTHS.map((m, i) => /*#__PURE__*/React.createElement("text", {
    key: m,
    x: cx(i),
    y: H - padB + 22,
    fontSize: "9.5",
    fill: "var(--chart-axis)",
    textAnchor: "end",
    transform: `rotate(-52 ${cx(i)} ${H - padB + 22})`
  }, m)), /*#__PURE__*/React.createElement("text", {
    x: W - padR + 8,
    y: padT + 10,
    fontSize: "10",
    fill: "var(--chart-axis)"
  }, "$2B"), /*#__PURE__*/React.createElement("text", {
    x: W - padR + 8,
    y: H - padB,
    fontSize: "10",
    fill: "var(--chart-axis)"
  }, "-$2B")), /*#__PURE__*/React.createElement(Legend, {
    items: [['Stress PnL', 'var(--chart-line-var)', 'dot'], ['Base Market Value', 'var(--chart-bar)', 'dot'], ['Limit', 'var(--chart-limit)', 'line']]
  }));
}
function Legend({
  items
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'center',
      gap: 22,
      marginTop: 8
    }
  }, items.map(([label, color, kind]) => /*#__PURE__*/React.createElement("span", {
    key: label,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      fontSize: 12,
      color: 'var(--slate-450)'
    }
  }, kind === 'dot' ? /*#__PURE__*/React.createElement("span", {
    style: {
      width: 9,
      height: 9,
      borderRadius: '50%',
      background: color
    }
  }) : /*#__PURE__*/React.createElement("span", {
    style: {
      width: 18,
      height: 3,
      borderRadius: 2,
      background: color
    }
  }), label)));
}
window.USSPARC_CHARTS = {
  Backtest,
  StressMaxLoss
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/risk-dashboard/charts.jsx", error: String((e && e.message) || e) }); }

// ui_kits/risk-dashboard/data.jsx
try { (() => {
// USSPARC Risk Dashboard — mock data & helpers
// (values lifted from the dashboard screenshots / codebase mock data)

const COBS = {
  '2026-04-17': {
    mtm: '$2.7',
    mtmU: 'B',
    mtmChg: '-$70.6M',
    mtmDir: 'negative',
    cleanPnl: '$0.8',
    cleanU: 'M',
    cleanChg: '-$0.8M',
    cleanDir: 'negative',
    var: '$2.8',
    varU: 'M',
    varChg: '−$0.0M',
    varDir: 'positive',
    svar: '$9.5',
    svarU: 'M',
    svarChg: '+$0.6M',
    svarDir: 'negative',
    ccar: '-$51.4',
    ccarU: 'M',
    ccarChg: '+$94.8M',
    ccarDir: 'positive',
    infl: '-$39.2',
    inflU: 'M',
    inflChg: '+$72.9M',
    inflDir: 'positive'
  },
  '2026-06-02': {
    mtm: '$2.9',
    mtmU: 'B',
    mtmChg: '-$30.0M',
    mtmDir: 'negative',
    cleanPnl: '$0.0',
    cleanU: 'M',
    cleanChg: '+$0.0M',
    cleanDir: 'positive',
    var: '$16.7',
    varU: 'M',
    varChg: '+$12.9M',
    varDir: 'negative',
    svar: '$24.4',
    svarU: 'M',
    svarChg: '+$7.7M',
    svarDir: 'negative',
    ccar: '-$100.2',
    ccarU: 'M',
    ccarChg: '-$48.8M',
    ccarDir: 'negative',
    infl: '-$61.0',
    inflU: 'M',
    inflChg: '-$21.8M',
    inflDir: 'negative'
  }
};
const VAR_ATTR = {
  var: [{
    risk: 'FX Spot',
    t: '0.004',
    t1: '-0.031',
    diff: '0.035'
  }, {
    risk: 'FX Vol',
    t: '-0.001',
    t1: '-0.000',
    diff: '-0.001'
  }, {
    risk: 'IR Base',
    t: '-0.763',
    t1: '0.424',
    diff: '-1.187'
  }, {
    risk: 'IR Basis',
    t: '-0.896',
    t1: '0.456',
    diff: '-1.351'
  }, {
    risk: 'IR Vol',
    t: '-1.337',
    t1: '-2.769',
    diff: '1.432'
  }],
  svar: [{
    risk: 'FX Spot',
    t: '0.257',
    t1: '0.323',
    diff: '-0.066'
  }, {
    risk: 'FX Vol',
    t: '0.000',
    t1: '0.000',
    diff: '0.000'
  }, {
    risk: 'IR Base',
    t: '-10.784',
    t1: '155.988',
    diff: '-166.772'
  }, {
    risk: 'IR Basis',
    t: '-4.279',
    t1: '-4.531',
    diff: '0.252'
  }, {
    risk: 'IR Vol',
    t: '-0.276',
    t1: '-3.263',
    diff: '2.987'
  }]
};
const VAR_TOTAL = {
  var: {
    risk: 'Total',
    t: '-2.993',
    t1: '-1.921',
    diff: '-1.072'
  },
  svar: {
    risk: 'Total',
    t: '-15.082',
    t1: '148.517',
    diff: '-163.599'
  }
};
const STRESS_ATTR = [{
  risk: 'Interest Rates',
  infl: '101.4',
  ccar: '127'
}, {
  risk: 'FX',
  infl: '-1.6',
  ccar: '-2.8'
}, {
  risk: 'Volatility',
  infl: '-141.2',
  ccar: '-184.5'
}, {
  risk: 'Others',
  infl: '2.1',
  ccar: '8.9'
}];

// Deterministic pseudo-random series for the charts
function series(seed, n, lo, hi) {
  const out = [];
  let s = seed;
  for (let i = 0; i < n; i++) {
    s = (s * 9301 + 49297) % 233280;
    out.push(lo + s / 233280 * (hi - lo));
  }
  return out;
}
const MONTHS = ['Apr·25', 'May·25', 'Jun·25', 'Jul·25', 'Aug·25', 'Sep·25', 'Oct·25', 'Nov·25', 'Dec·25', 'Jan·26', 'Feb·26', 'Mar·26'];
window.USSPARC_DATA = {
  COBS,
  VAR_ATTR,
  VAR_TOTAL,
  STRESS_ATTR,
  series,
  MONTHS
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/risk-dashboard/data.jsx", error: String((e && e.message) || e) }); }

// ui_kits/risk-dashboard/panels.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// USSPARC Risk Dashboard — panels: metric cards, tables, charts
const {
  useState: useStateP
} = React;
const UI = window.USSPARC_UI;

/* ---------- shared card shell ---------- */
function Panel({
  children,
  style
}) {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      background: '#fff',
      border: '1px solid var(--border-card)',
      borderRadius: 18,
      boxShadow: 'var(--shadow-card)',
      padding: 20,
      ...style
    }
  }, children);
}
function SectionTitle({
  children,
  actions
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontSize: '1.3rem',
      fontWeight: 500,
      color: 'var(--slate-700)'
    }
  }, children), /*#__PURE__*/React.createElement(UI.Ico, {
    n: "info",
    size: 15,
    color: "var(--slate-400)"
  })), actions);
}

/* ---------- toggles ---------- */
function TextToggle({
  options,
  value,
  onChange
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'inline-flex',
      padding: 3,
      borderRadius: 999,
      background: 'var(--surface-toggle)',
      border: '1px solid var(--border-soft)',
      boxShadow: 'var(--shadow-toggle-inset)'
    }
  }, options.map(o => {
    const a = o.value === value;
    return /*#__PURE__*/React.createElement("button", {
      key: o.value,
      onClick: () => onChange(o.value),
      style: {
        minWidth: 60,
        height: 28,
        padding: '0 16px',
        border: 'none',
        borderRadius: 999,
        cursor: 'pointer',
        fontSize: 13,
        fontWeight: a ? 700 : 500,
        background: a ? 'var(--toggle-active-ink)' : 'transparent',
        color: a ? '#fff' : 'var(--slate-450)'
      }
    }, o.label);
  }));
}
function IconToggle({
  options,
  value,
  onChange
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'inline-flex',
      gap: 3,
      padding: 3,
      borderRadius: 999,
      background: 'var(--surface-toggle)',
      border: '1px solid var(--border-soft)',
      boxShadow: 'var(--shadow-toggle-inset)'
    }
  }, options.map(o => {
    const a = o.value === value;
    return /*#__PURE__*/React.createElement("button", {
      key: o.value,
      onClick: () => onChange(o.value),
      style: {
        width: 38,
        height: 26,
        border: 'none',
        borderRadius: 999,
        cursor: 'pointer',
        background: a ? '#fff' : 'transparent',
        color: a ? 'var(--toggle-icon-active)' : 'var(--slate-400)',
        boxShadow: a ? 'var(--shadow-btn-blue)' : 'none',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center'
      }
    }, /*#__PURE__*/React.createElement(UI.Ico, {
      n: o.icon,
      size: 17,
      color: a ? 'var(--toggle-icon-active)' : 'var(--slate-400)'
    }));
  }));
}

/* ---------- metric KPI card ---------- */
function MetricCell({
  label,
  value,
  unit,
  change,
  dir
}) {
  const adverse = dir === 'negative';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      background: '#fff',
      borderRight: '1px solid var(--border-divider)',
      borderBottom: '1px solid var(--border-divider)',
      borderBottomRightRadius: 12,
      boxShadow: 'var(--shadow-metric)',
      padding: '10px 16px 12px',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": true,
    style: {
      position: 'absolute',
      top: 0,
      right: 0,
      width: 0,
      height: 0,
      borderTop: `22px solid ${adverse ? 'var(--negative-corner)' : 'var(--teal-corner)'}`,
      borderLeft: '22px solid transparent',
      opacity: 0.9
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      color: 'var(--slate-600)',
      fontSize: 13,
      fontWeight: 500,
      marginBottom: 6
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 8,
      whiteSpace: 'nowrap'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '2.1rem',
      fontWeight: 500,
      color: 'var(--ink-900)',
      lineHeight: 1
    }
  }, value, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '1.25rem'
    }
  }, unit)), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13.5,
      fontWeight: 500,
      color: adverse ? 'var(--negative)' : 'var(--positive)',
      whiteSpace: 'nowrap'
    }
  }, change)));
}
function MetricCard({
  title,
  avatar,
  icon,
  cells
}) {
  const av = {
    entity: {
      f: 'var(--avatar-entity-fill)',
      r: 'var(--avatar-entity-ring)'
    },
    products: {
      f: 'var(--avatar-products-fill)',
      r: 'var(--avatar-products-ring)'
    },
    risk: {
      f: 'var(--avatar-risk-fill)',
      r: 'var(--avatar-risk-ring)'
    }
  }[avatar];
  return /*#__PURE__*/React.createElement(Panel, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 48,
      height: 48,
      borderRadius: '50%',
      background: av.f,
      border: `5px solid ${av.r}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
      marginRight: 14
    }
  }, /*#__PURE__*/React.createElement(UI.Ico, {
    n: icon,
    size: 24,
    color: "#fff"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      paddingTop: 2
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontSize: '1.5rem',
      fontWeight: 600,
      letterSpacing: '1.5px',
      textTransform: 'uppercase',
      color: 'var(--slate-600)'
    }
  }, title), /*#__PURE__*/React.createElement(UI.Ico, {
    n: "info",
    size: 18,
    color: "var(--slate-400)"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 1.7,
      marginTop: 5,
      background: 'var(--divider-h)'
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 16
    }
  }, cells.map((c, i) => /*#__PURE__*/React.createElement(MetricCell, _extends({
    key: i
  }, c)))));
}

/* ---------- tables ---------- */
function Delta({
  v
}) {
  const neg = String(v).startsWith('-');
  return /*#__PURE__*/React.createElement("span", {
    style: {
      color: neg ? 'var(--negative)' : 'var(--positive)'
    }
  }, v);
}
function AttrTable({
  metric,
  setMetric,
  rows,
  total
}) {
  return /*#__PURE__*/React.createElement(Panel, {
    style: {
      borderRadius: 18
    }
  }, /*#__PURE__*/React.createElement(SectionTitle, {
    actions: /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 8
      }
    }, /*#__PURE__*/React.createElement(TextToggle, {
      value: metric,
      onChange: setMetric,
      options: [{
        value: 'var',
        label: 'VaR'
      }, {
        value: 'svar',
        label: 'SVaR'
      }]
    }), /*#__PURE__*/React.createElement(UI.IconBtn, {
      n: "open_in_full",
      size: 16
    }), /*#__PURE__*/React.createElement(UI.IconBtn, {
      n: "more_vert",
      size: 16
    }))
  }, "VaR Attribution"), /*#__PURE__*/React.createElement("div", {
    style: {
      border: '1px solid var(--border-hair)',
      borderRadius: 8,
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("table", {
    style: {
      width: '100%',
      borderCollapse: 'collapse',
      tableLayout: 'fixed'
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", {
    style: {
      background: 'var(--surface-subtle)'
    }
  }, ['Risk Class', 'VaR (T) ($M)', 'VaR (T-1) ($M)', 'Diff ($M)'].map((h, i) => /*#__PURE__*/React.createElement("th", {
    key: h,
    style: {
      textAlign: i === 0 ? 'left' : 'right',
      padding: '0 14px',
      height: 42,
      fontSize: 13,
      fontWeight: 600,
      color: 'var(--slate-500)'
    }
  }, h)))), /*#__PURE__*/React.createElement("tbody", null, rows.map(r => /*#__PURE__*/React.createElement("tr", {
    key: r.risk,
    style: {
      borderTop: '1px solid var(--border-hair)'
    }
  }, /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '0 14px',
      height: 44,
      fontSize: 13.5,
      color: 'var(--slate-700)'
    }
  }, r.risk), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '0 14px',
      textAlign: 'right',
      fontFamily: 'var(--font-mono)',
      fontSize: 13,
      color: '#455669'
    }
  }, r.t), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '0 14px',
      textAlign: 'right',
      fontFamily: 'var(--font-mono)',
      fontSize: 13,
      color: '#455669'
    }
  }, r.t1), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '0 14px',
      textAlign: 'right',
      fontFamily: 'var(--font-mono)',
      fontSize: 13
    }
  }, /*#__PURE__*/React.createElement(Delta, {
    v: r.diff
  })))), /*#__PURE__*/React.createElement("tr", {
    style: {
      borderTop: '2px solid var(--border-divider)'
    }
  }, /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '0 14px',
      height: 44,
      fontWeight: 700,
      color: 'var(--ink-900)',
      fontSize: 14
    }
  }, total.risk), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '0 14px',
      textAlign: 'right',
      fontFamily: 'var(--font-mono)',
      fontWeight: 700,
      fontSize: 13.5,
      color: 'var(--ink-900)'
    }
  }, total.t), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '0 14px',
      textAlign: 'right',
      fontFamily: 'var(--font-mono)',
      fontWeight: 700,
      fontSize: 13.5,
      color: 'var(--ink-900)'
    }
  }, total.t1), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '0 14px',
      textAlign: 'right',
      fontFamily: 'var(--font-mono)',
      fontWeight: 700,
      fontSize: 13.5,
      color: 'var(--ink-900)'
    }
  }, total.diff))))));
}
function StressTable({
  rows
}) {
  return /*#__PURE__*/React.createElement(Panel, {
    style: {
      borderRadius: 18
    }
  }, /*#__PURE__*/React.createElement(SectionTitle, {
    actions: /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 8
      }
    }, /*#__PURE__*/React.createElement(UI.IconBtn, {
      n: "open_in_full",
      size: 16
    }), /*#__PURE__*/React.createElement(UI.IconBtn, {
      n: "more_vert",
      size: 16
    }))
  }, "Stress Max Loss Attribution"), /*#__PURE__*/React.createElement("div", {
    style: {
      border: '1px solid var(--border-hair)',
      borderRadius: 8,
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("table", {
    style: {
      width: '100%',
      borderCollapse: 'collapse',
      tableLayout: 'fixed'
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", {
    style: {
      background: 'var(--surface-subtle)'
    }
  }, ['Risk Class', '2022 Inflation ($M)', 'CCAR2025_Exp ($M)'].map((h, i) => /*#__PURE__*/React.createElement("th", {
    key: h,
    style: {
      textAlign: i === 0 ? 'left' : 'right',
      padding: '0 14px',
      height: 42,
      fontSize: 13,
      fontWeight: 600,
      color: 'var(--slate-500)'
    }
  }, h)))), /*#__PURE__*/React.createElement("tbody", null, rows.map(r => /*#__PURE__*/React.createElement("tr", {
    key: r.risk,
    style: {
      borderTop: '1px solid var(--border-hair)'
    }
  }, /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '0 14px',
      height: 52,
      fontSize: 13.5,
      color: 'var(--slate-700)'
    }
  }, r.risk), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '0 14px',
      textAlign: 'right',
      fontFamily: 'var(--font-mono)',
      fontSize: 13,
      color: '#455669'
    }
  }, r.infl), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '0 14px',
      textAlign: 'right',
      fontFamily: 'var(--font-mono)',
      fontSize: 13,
      color: '#455669'
    }
  }, r.ccar)))))));
}
window.USSPARC_PANELS = {
  Panel,
  SectionTitle,
  TextToggle,
  IconToggle,
  MetricCard,
  AttrTable,
  StressTable
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/risk-dashboard/panels.jsx", error: String((e && e.message) || e) }); }

// ui_kits/risk-dashboard/parts.jsx
try { (() => {
// USSPARC Risk Dashboard — UI primitives + charts (self-contained)
const {
  useState
} = React;
function Ico({
  n,
  size = 20,
  color = 'var(--slate-400)',
  style
}) {
  return /*#__PURE__*/React.createElement("span", {
    className: "material-symbols-rounded",
    style: {
      fontSize: size,
      color,
      ...style
    }
  }, n);
}
function IconBtn({
  n,
  size = 20,
  color = 'var(--slate-400)',
  onClick
}) {
  return /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    style: {
      background: 'transparent',
      border: 'none',
      cursor: 'pointer',
      padding: 4,
      display: 'inline-flex',
      borderRadius: 6
    },
    onMouseEnter: e => e.currentTarget.style.background = 'var(--surface-subtle)',
    onMouseLeave: e => e.currentTarget.style.background = 'transparent'
  }, /*#__PURE__*/React.createElement(Ico, {
    n: n,
    size: size,
    color: color
  }));
}

/* ---------- Header ---------- */
function Header({
  active,
  onNav,
  env = 'REL'
}) {
  const nav = [{
    label: 'DASHBOARD',
    items: ['VaR', 'Market Data', 'SVaR Window Calibration']
  }, {
    label: 'VaR',
    items: ['Calculator', 'Risk Factor', 'Model Configuration', 'Benchmarking']
  }, {
    label: 'STRESS',
    items: ['Scenario Viewer', 'Shock Rates']
  }, {
    label: 'SUPPORT',
    items: ['Runs', 'DQ Reports', 'Job Trigger', 'Recon']
  }];
  const [open, setOpen] = useState(null);
  return /*#__PURE__*/React.createElement("header", {
    style: {
      fontFamily: 'var(--font-sans)',
      position: 'relative',
      zIndex: 30
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--green-800)',
      color: '#fff',
      height: 56,
      display: 'flex',
      alignItems: 'center',
      gap: 16,
      padding: '0 28px'
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      onNav('home');
    },
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      textDecoration: 'none',
      color: '#fff',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "28",
    height: "32",
    viewBox: "0 0 28 32",
    "aria-hidden": true
  }, /*#__PURE__*/React.createElement("path", {
    d: "M4 28 L10 4 L14 5 L8 29 Z",
    fill: "var(--accent-lime)",
    fillOpacity: "0.95"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M10 28 L16 2 L20 3 L14 29 Z",
    fill: "var(--accent-lime)"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M16 28 L22 0 L26 1 L20 29 Z",
    fill: "var(--accent-lime)",
    fillOpacity: "0.9"
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-serif)',
      fontSize: '1.25rem',
      letterSpacing: '0.04em'
    }
  }, "US SPARC"), /*#__PURE__*/React.createElement("span", {
    style: {
      background: 'var(--accent-lime)',
      color: '#fff',
      fontSize: 10,
      fontWeight: 700,
      letterSpacing: '0.08em',
      padding: '2px 7px',
      borderRadius: 4
    }
  }, env)), /*#__PURE__*/React.createElement("nav", {
    style: {
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 6
    }
  }, nav.map(it => /*#__PURE__*/React.createElement("div", {
    key: it.label,
    style: {
      position: 'relative'
    },
    onMouseLeave: () => setOpen(null)
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      onNav('dashboard');
    },
    onMouseEnter: () => setOpen(it.label),
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 4,
      background: active === it.label || open === it.label ? 'rgba(255,255,255,0.1)' : 'transparent',
      border: 'none',
      color: '#fff',
      fontFamily: 'var(--font-menu)',
      fontSize: 11,
      fontWeight: 600,
      letterSpacing: '0.06em',
      padding: '8px 12px',
      borderRadius: 6,
      cursor: 'pointer',
      position: 'relative'
    }
  }, it.label, /*#__PURE__*/React.createElement(Ico, {
    n: "keyboard_arrow_down",
    size: 16,
    color: "#fff",
    style: {
      transition: 'transform .18s',
      transform: open === it.label ? 'rotate(180deg)' : 'none'
    }
  }), active === it.label ? /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      left: 12,
      right: 12,
      bottom: 2,
      height: 2,
      background: '#fff',
      borderRadius: 2
    }
  }) : null), open === it.label ? /*#__PURE__*/React.createElement("ul", {
    style: {
      position: 'absolute',
      top: '100%',
      left: '50%',
      transform: 'translateX(-50%)',
      marginTop: 4,
      minWidth: 220,
      background: '#fff',
      borderRadius: 8,
      boxShadow: 'var(--shadow-pop)',
      listStyle: 'none',
      padding: 6,
      margin: 0,
      zIndex: 50
    }
  }, it.items.map(s => /*#__PURE__*/React.createElement("li", {
    key: s
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setOpen(null),
    style: {
      width: '100%',
      textAlign: 'left',
      border: 'none',
      background: 'transparent',
      color: 'var(--slate-700)',
      padding: '10px 12px',
      borderRadius: 6,
      fontSize: 15,
      cursor: 'pointer'
    },
    onMouseEnter: e => e.currentTarget.style.background = 'var(--surface-subtle)',
    onMouseLeave: e => e.currentTarget.style.background = 'transparent'
  }, s)))) : null))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 2,
      flexShrink: 0
    }
  }, ['public', 'build', 'notifications', 'account_circle'].map(g => /*#__PURE__*/React.createElement("button", {
    key: g,
    style: {
      background: 'transparent',
      border: 'none',
      color: 'rgba(255,255,255,0.95)',
      width: 38,
      height: 38,
      borderRadius: 8,
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    onMouseEnter: e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)',
    onMouseLeave: e => e.currentTarget.style.background = 'transparent'
  }, /*#__PURE__*/React.createElement(Ico, {
    n: g,
    size: 23,
    color: "rgba(255,255,255,0.95)"
  }))))), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 2,
      background: 'var(--accent-lime)'
    }
  }));
}

/* ---------- Filter bar ---------- */
function GreenPill({
  label,
  value,
  options,
  onChange,
  width,
  icon
}) {
  const [open, setOpen] = useState(false);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      width
    },
    onMouseLeave: () => setOpen(false)
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setOpen(o => !o),
    style: {
      width: '100%',
      height: 44,
      borderRadius: 999,
      background: 'var(--green-900)',
      border: 'none',
      color: 'var(--on-green-text)',
      textAlign: 'left',
      cursor: 'pointer',
      padding: '0 52px 0 22px',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '0.62rem',
      color: 'var(--on-green-muted)',
      fontWeight: 500,
      lineHeight: 1.1
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '0.86rem',
      fontWeight: 600,
      color: '#fff',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, value), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      right: 14,
      top: '50%',
      transform: `translateY(-50%) rotate(${open ? 180 : 0}deg)`,
      transition: 'transform .18s',
      width: 23,
      height: 23,
      borderRadius: '50%',
      border: '2px solid rgba(172,182,202,0.5)',
      background: 'rgba(0,0,0,0.1)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Ico, {
    n: icon || 'keyboard_arrow_down',
    size: 15,
    color: "var(--on-green-muted)"
  }))), open && options ? /*#__PURE__*/React.createElement("ul", {
    style: {
      position: 'absolute',
      top: 'calc(100% + 6px)',
      left: 0,
      right: 0,
      margin: 0,
      padding: 6,
      listStyle: 'none',
      background: '#fff',
      borderRadius: 10,
      boxShadow: 'var(--shadow-pop)',
      zIndex: 40
    }
  }, options.map(o => /*#__PURE__*/React.createElement("li", {
    key: o
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      onChange && onChange(o);
      setOpen(false);
    },
    style: {
      width: '100%',
      textAlign: 'left',
      border: 'none',
      background: o === value ? 'var(--surface-toggle)' : 'transparent',
      color: 'var(--slate-700)',
      padding: '9px 12px',
      borderRadius: 8,
      fontSize: 14,
      cursor: 'pointer'
    }
  }, o)))) : null);
}
function FilterBar({
  state,
  set,
  onGo
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--green-800)',
      padding: '14px 28px 26px',
      display: 'flex',
      gap: 14,
      alignItems: 'center',
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 230
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: 44,
      borderRadius: 999,
      background: 'var(--green-900)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: '0 22px',
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '0.62rem',
      color: 'var(--on-green-muted)',
      fontWeight: 500
    }
  }, "COB"), /*#__PURE__*/React.createElement("input", {
    type: "date",
    value: state.cob,
    onChange: e => set({
      ...state,
      cob: e.target.value
    }),
    style: {
      background: 'transparent',
      border: 'none',
      color: '#fff',
      fontSize: '0.86rem',
      fontWeight: 600,
      fontFamily: 'var(--font-sans)',
      padding: 0,
      outline: 'none',
      colorScheme: 'dark'
    }
  }))), /*#__PURE__*/React.createElement(GreenPill, {
    label: "Entity Scope",
    value: state.entity,
    width: 320,
    options: ['SMBC CAPITAL MARKETS INC', 'SMBC NIKKO SECURITIES', 'SMBC BANK INTERNATIONAL'],
    onChange: v => set({
      ...state,
      entity: v
    })
  }), /*#__PURE__*/React.createElement(GreenPill, {
    label: "Regulator",
    value: state.reg,
    width: 200,
    options: ['Regulator', 'FRB', 'PRA', 'ECB'],
    onChange: v => set({
      ...state,
      reg: v
    })
  }), /*#__PURE__*/React.createElement(GreenPill, {
    label: "Desk",
    value: state.desk,
    width: 230,
    options: ['Market Risk', 'Credit Risk', 'Treasury'],
    onChange: v => set({
      ...state,
      desk: v
    })
  }), /*#__PURE__*/React.createElement("button", {
    onClick: onGo,
    style: {
      height: 44,
      padding: '0 30px',
      borderRadius: 999,
      background: 'var(--go-mint)',
      color: 'var(--go-mint-ink)',
      border: 'none',
      fontWeight: 700,
      fontSize: 15,
      letterSpacing: '0.04em',
      cursor: 'pointer'
    }
  }, "GO"), /*#__PURE__*/React.createElement(IconBtn, {
    n: "more_vert",
    color: "rgba(255,255,255,0.8)"
  }));
}
window.USSPARC_UI = Object.assign(window.USSPARC_UI || {}, {
  Ico,
  IconBtn,
  Header,
  FilterBar,
  GreenPill
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/risk-dashboard/parts.jsx", error: String((e && e.message) || e) }); }

__ds_ns.DashboardCard = __ds_scope.DashboardCard;

__ds_ns.MetricCell = __ds_scope.MetricCell;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.GradientDivider = __ds_scope.GradientDivider;

__ds_ns.DataTable = __ds_scope.DataTable;

__ds_ns.FilterSelect = __ds_scope.FilterSelect;

__ds_ns.SegmentedToggle = __ds_scope.SegmentedToggle;

__ds_ns.AppHeader = __ds_scope.AppHeader;

})();
