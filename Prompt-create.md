# Copilot Prompt — Create Risk Factor Time Series Mapping

Use this prompt in VS Code Copilot to implement the Create workflow in the work codebase, referencing this repo as the working implementation.

---

## Prompt

I need to implement a **Create Risk Factor** dialog for the Risk Factor Mappings feature. A working reference implementation is in this repo:

**Reference repo:** https://github.com/stitchui/rfapp

Look at this file as the reference implementation:
- `src/features/RiskFactorMappings/CreateDialog.tsx` — the complete Create dialog
- `src/features/RiskFactorMappings/index.tsx` — how the dialog is wired into the parent (state, callbacks, `onCreated`)
- `src/api/riskFactorApi.ts` — API function signatures to match

---

## User flow

1. User clicks **+ Create** button → MUI Dialog opens (`fullWidth`, `maxWidth="xl"`, `height: 85vh`)
2. **3 dropdowns**: Class → Currency → Curve
   - Currency and Curve enable as soon as Class is selected
   - Options are driven by a flat JSON from `GET /var/riskfactor/timeseries/dropdowns`
   - Fetch this on component mount (not on modal open) so options are ready instantly
   - The dropdown data shape: `{ IR: { curve_name: [...], currency: [] }, FX: { curve_name: [], currency: [...] } }`
   - Currency/Curve disable automatically when their array is empty (e.g. IR has no currency, FX has no curve)
3. **Fetch NIWA Data** button — enabled as soon as Class is selected
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

Refer to `riskFactorApi.ts` (or `riskFactorApi.js` in the work codebase) for the exact function signatures and endpoint URLs. The three functions needed for this feature are:

- `getRiskFactorTimeseriesDropdowns` — call on component mount to populate the cascading dropdowns
- `getRiskFactorTimeseries` — call on "Fetch NIWA Data" button click with selected dropdown values:
  ```ts
  getRiskFactorTimeseries({ rfClass: sel.rfClass, currency: sel.currency, curve: sel.curve })
  ```
- `saveRiskFactorMappings` — call on "Create" button click with selected rows (each with `risk_factor_id: 0`, `_path` stripped)

---

## Dropdown logic

```ts
// tree shape: { IR: { curve_name: [...], currency: [] }, FX: { curve_name: [], currency: [...] } }
const classOptions = Object.keys(tree);
const currencyOptions = sel.rfClass ? (tree[sel.rfClass]?.currency ?? []) : [];
const curveOptions = sel.rfClass ? (tree[sel.rfClass]?.curve_name ?? []) : [];
// Currency/Curve dropdowns are disabled automatically when their options array is empty
```

Class change resets all downstream selections:
```ts
const handleClassChange = (val) => setSel({ ...EMPTY, rfClass: val });
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
| `sel` | `DropdownSelections` | Current dropdown values (`rfClass, currency, curve`) |
| `niwaRows` | `RfRow[]` | Rows returned from NIWA fetch |
| `selectedRows` | `RfRow[]` | Rows checked in AG Grid |
| `loading` | `boolean` | Fetch NIWA Data in progress |
| `busy` | `boolean` | Create in progress |
| `fetched` | `boolean` | Whether NIWA grid should be shown |

---

## Key notes

- Use MUI components (`Dialog`, `DialogTitle`, `DialogContent`, `DialogActions`, `FormControl`, `Select`, `MenuItem`, `Button`, `CircularProgress`) with `sx` props — no inline `style={{}}`
- Use `useState` and `useRef` only — no Redux or React Query
- Adapt API function calls to match the work codebase's `riskFactorApi` (axios-based)
- The NIWA AG Grid inside the modal is a **flat list** (not treeData) — no `getDataPath`, no `autoGroupColumnDef`
- `getRowId` on the NIWA grid: use `risk_factor_name` (all rows have `risk_factor_id: 0` so it can't be used as a key)
- All columns use AG Grid's native `editable: true`; `shock_type` uses `agSelectCellEditor`
- On Create, read rows from `gridApi.getSelectedRows()` (not from state) to capture any cell edits made after row selection
