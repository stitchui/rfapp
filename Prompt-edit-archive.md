# Copilot Prompt — Edit & Archive Implementation

Use this prompt in VS Code Copilot to implement Edit and Archive functionality in the work codebase, referencing this repo as the working implementation.

---

## Prompt

I need to implement Edit and Archive functionality for a Risk Factor Mappings grid. The grid uses AG Grid Enterprise with `treeData + getDataPath + autoGroupColumnDef` for a 6-level hierarchy: `[risk_factor_class, rf_subclass, rf_type, currency, curve_name, risk_factor_name]`.

**Reference repo:** https://github.com/stitchui/rfapp

Look at these files as the reference implementation:
- `src/features/RiskFactorMappings/RfmGrid.jsx` — grid setup, cell renderers, actions column
- `src/features/RiskFactorMappings/index.jsx` — state management, API calls

---

## Edit behavior

- ⋮ menu on curve-level group rows (level 4) with "Edit" and "Archive Curve" options
- Edit mode activates per-curve — editable cells (input/select) appear on all leaf rows under that curve
- Actions column shows Cancel / Save buttons (Save disabled until a field is actually changed)
- `saveRiskFactorMappings` → `POST /var/riskfactor/mappings/save` — array of only the dirty rows with full fields (no `_path`); clean rows are excluded

---

## Archive behavior

- **Archive Curve** from ⋮ menu → confirmation dialog → `archiveRiskFactorMappings` → `POST /var/riskfactor/mappings/archive`
  ```json
  { "risk_factor_ids": [100001, 100002, ...] }
  ```
- **Archive single row** via icon button on leaf rows → confirmation dialog → `archiveRiskFactorMappings` → `POST /var/riskfactor/mappings/archive`
  ```json
  { "risk_factor_ids": [100001] }
  ```

---

## API functions

| Function | Method | Endpoint |
|---|---|---|
| `saveRiskFactorMappings` | POST | `/var/riskfactor/mappings/save` |
| `archiveRiskFactorMappings` | POST | `/var/riskfactor/mappings/archive` |

---

## Key patterns to replicate

- **AG Grid `context` prop** — pass an `RfmGridContext` object (callbacks + state) into the grid via `<AgGridReact context={gridContext} />`. Cell renderers access it via `params.context`.
- **`gridApi.redrawRows()`** — call this when `editingCurveKey`, `edits`, or `busy` changes so renderers pick up the new state.
- **`createPortal`** — render the ⋮ dropdown menu into `document.body` to escape AG Grid's `overflow: hidden` cell containers. Use `getBoundingClientRect()` on the button to position it.
- **Curve key derivation:**
  - Group rows: `node.getRoute().join('>')`
  - Leaf rows: `data._path.slice(0, 5).join('>')`
- **Dirty check:** compare `edits[rfId][field]` against the original row value — Save button stays disabled until at least one field differs.

---

## State to manage

| State | Type | Purpose |
|---|---|---|
| `editingCurveKey` | `string \| null` | Which curve is in edit mode |
| `edits` | `Record<number, Partial<RfRow>>` | Pending field changes keyed by `risk_factor_id` |
| `busy` | `boolean` | Disables buttons during API call |
| `dialog` | `archiveCurve \| archiveRow \| null` | Controls confirmation dialog |

