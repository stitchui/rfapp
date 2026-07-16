# Copilot Prompt — Create Risk Factor Time Series Mapping

Use this prompt in VS Code Copilot to implement the Create workflow in the work codebase, referencing this repo as the working implementation.

---

## Prompt

I need to implement a **Create Risk Factor** dialog for the Risk Factor Mappings feature. A working reference implementation is in this repo:

**Reference repo:** https://github.com/stitchui/rfapp

Look at this file as the reference implementation:
- `src/features/RiskFactorMappings/CreateDialog.jsx` — the complete Create dialog
- `src/features/RiskFactorMappings/index.jsx` — how the dialog is wired into the parent (state, callbacks, `onCreated`)
- `src/api/riskFactorApi.js` — API function signatures to match

---

## User flow

1. User clicks **+ Create** button → MUI Dialog opens (`fullWidth`, `maxWidth="xl"`, `height: 85vh`)
2. **3 dropdowns**: Class → Currency → Curve
   - Options are driven by a flat JSON from `GET /var/riskfactor/timeseries/dropdown`
   - Fetch this on component mount (not on modal open) so options are ready instantly
   - The API returns an array: `[{ class_name: 'IR', curve_name: [...], currency: [] }, { class_name: 'FX', ... }]`
   - Transform to a keyed object in `getRiskFactorTimeseriesDropdown`: `Object.fromEntries(list.map(({ class_name, ...rest }) => [class_name, rest]))`
   - Component uses the keyed shape: `{ IR: { curve_name: [...], currency: [] }, FX: { curve_name: [], currency: [...] } }`

   **Dropdown behavior per class selection:**
   - Initial state: all 3 dropdowns empty, Clone button disabled
   - User selects **IR** → Currency disables (IR has no currencies), Curve enables with IR curve list, Clone enables
   - User selects **FX** → Currency enables with FX currency list, Curve disables (FX has no curves), Clone enables
   - Changing Class resets Currency and Curve selections
   - Currency/Curve disable when their options array is empty — **do not hardcode per class, let the empty array drive it**
   - **No "ALL" option** — if the array is empty, the dropdown is simply disabled
3. **Clone** button — enabled as soon as Class is selected
   - Calls `POST /var/riskfactor/timeseries` with selected filter values
   - Shows AG Grid with results (flat list, not tree)
4. **AG Grid** inside the modal:
   - `rowSelection="multiple"`, `suppressRowClickSelection` (checkbox-only selection)
   - First column is checkbox (`checkboxSelection: true`, `headerCheckboxSelection: true`, `width: 48`)
   - All data columns are `editable: true` so user can tweak values before creating
   - `shock_type` uses `agSelectCellEditor` with values `['Absolute', 'Relative', 'Log']`
   - Counter above grid: `"8 records found · 2 selected"`
5. **Create (N)** button — enabled only when rows are selected; shows count
   - Calls `POST /var/riskfactor/mappings/save` with selected rows
   - Payload: each row with `risk_factor_id: 0`, `_path` stripped out
   - On success: calls `onCreated(rows)` callback to add rows to the parent grid, then closes

---

## API functions to use

Refer to `riskFactorApi.js` for the exact function signatures and endpoint URLs. The three functions needed for this feature are:

| Function | Method | Endpoint |
|---|---|---|
| `getRiskFactorTimeseriesDropdown` | GET | `/var/riskfactor/timeseries/dropdown` |
| `postRiskFactorTimeseries` | POST | `/var/riskfactor/timeseries` |
| `saveRiskFactorMappings` | POST | `/var/riskfactor/mappings/save` |

- `getRiskFactorTimeseriesDropdown` — call on component mount to populate the cascading dropdowns
- `postRiskFactorTimeseries` — call on "Clone" button click with selected dropdown values:
  ```js
  postRiskFactorTimeseries({ risk_factor_class: sel.risk_factor_class, currency: sel.currency, curve_name: sel.curve_name })
  ```
- `saveRiskFactorMappings` — call on "Create" button click with selected rows (each with `risk_factor_id: 0`, `_path` stripped)

---

## Dropdown logic

```ts
// tree shape: { IR: { curve_name: [...], currency: [] }, FX: { curve_name: [], currency: [...] } }
const classOptions = Object.keys(tree);
const currencyOptions = sel.risk_factor_class ? (tree[sel.risk_factor_class]?.currency ?? []) : [];
const curveOptions = sel.risk_factor_class ? (tree[sel.risk_factor_class]?.curve_name ?? []) : [];
// Currency/Curve dropdowns are disabled automatically when their options array is empty
// e.g. IR → currency: [] → Currency dropdown disables; FX → curve_name: [] → Curve dropdown disables
// Do NOT hardcode which class disables which dropdown — let the empty array drive it
```

The `SelectField` component must disable when `options.length === 0` (in addition to when no class is selected):
```js
// disabled when no class selected OR when the options array for this field is empty
<SelectField disabled={!sel.risk_factor_class || options.length === 0} ... />
```

Do NOT add an "ALL" option — if the array is empty, the dropdown is simply disabled.

Class change resets all downstream selections:
```ts
const handleClassChange = (val) => setSel({ ...EMPTY, risk_factor_class: val });
```

---

## Create payload

```ts
const payload = selectedRows.map(r => {
  const { _path, ...rest } = r;
  return { ...rest, risk_factor_id: 0 };
});
await saveRiskFactorMappings(payload);
```

---

## Parent wiring (`onCreated` callback)

When the dialog calls `onCreated(rows)`, the parent adds the new rows to its data ref and triggers a grid refresh:

```ts
const onCreated = useCallback((rows: RfRow[]) => {
  rows.forEach(r => {
    allRowsRef.current.push(r);
    rfByIdRef.current[r.risk_factor_id] = r;
  });
  setTreeVersion(v => v + 1); // triggers rowData recompute
  showSnack(`${rows.length} risk factor${rows.length > 1 ? 's' : ''} created`);
}, [showSnack]);
```

---

## State inside the dialog

| State | Type | Purpose |
|---|---|---|
| `tree` | `DropdownTree` | Nested options from API, fetched on mount |
| `sel` | `DropdownSelections` | Current dropdown values (`risk_factor_class, currency, curve_name`) |
| `cloneRows` | `RfRow[]` | Rows returned from clone |
| `selectedRows` | `RfRow[]` | Rows checked in AG Grid |
| `loading` | `boolean` | Clone in progress |
| `busy` | `boolean` | Create in progress |
| `fetched` | `boolean` | Whether clone grid should be shown |

---

## Key notes

- Use MUI components (`Dialog`, `DialogTitle`, `DialogContent`, `DialogActions`, `FormControl`, `Select`, `MenuItem`, `Button`, `CircularProgress`) with `sx` props — no inline `style={{}}`
- Use `useState` and `useRef` only — no Redux or React Query
- Adapt API function calls to match the work codebase's `riskFactorApi` (axios-based)
- The clone AG Grid inside the modal is a **flat list** (not treeData) — no `getDataPath`, no `autoGroupColumnDef`
- `getRowId` on the clone grid: use `risk_factor_name` (all rows have `risk_factor_id: 0` so it can't be used as a key)
- All columns use AG Grid's native `editable: true`; `shock_type` uses `agSelectCellEditor`
- All rows are selected by default when clone results load — use `onFirstDataRendered` to call `api.selectAll()` and sync `selectedRows` state
- On Create, call `gridApi.stopEditing()` first to flush any active cell edit, then read rows from `gridApi.getSelectedRows()` (not from state) to capture edits
