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
2. **5 cascading dropdowns**: Class → Sub Class → Type → Currency → Curve
   - Each dropdown only enables when its parent has a value
   - Options are driven by a nested JSON tree from `GET /var/riskfactor/timeseries/dropdowns`
   - Fetch this on component mount (not on modal open) so options are ready instantly
3. **Fetch NEVA Data** button — enabled as soon as Class is selected
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
- `getRiskFactorTimeseries` — call on "Fetch NEVA Data" button click
- `saveRiskFactorMappings` — call on "Create" button click with selected rows (each with `risk_factor_id: 0`, `_path` stripped)

---

## Cascading dropdown logic

```ts
const classOptions = Object.keys(tree);
const subClassOptions = sel.rfClass ? Object.keys(tree[sel.rfClass] ?? {}) : [];
const typeOptions = sel.subClass ? Object.keys(tree[sel.rfClass]?.[sel.subClass] ?? {}) : [];
const currencyOptions = sel.type ? Object.keys(tree[sel.rfClass]?.[sel.subClass]?.[sel.type] ?? {}) : [];
const curveOptions = sel.currency ? (tree[sel.rfClass]?.[sel.subClass]?.[sel.type]?.[sel.currency] ?? []) : [];
```

Each downstream dropdown resets when its parent changes:
```ts
const handleClassChange = (val) => setSel({ ...EMPTY, rfClass: val });
const handleSubClassChange = (val) => setSel(s => ({ ...s, subClass: val, type: '', currency: '', curve: '' }));
// etc.
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
| `sel` | `DropdownSelections` | Current dropdown values (`rfClass, subClass, type, currency, curve`) |
| `nevaRows` | `RfRow[]` | Rows returned from NEVA fetch |
| `selectedRows` | `RfRow[]` | Rows checked in AG Grid |
| `loading` | `boolean` | Fetch NEVA Data in progress |
| `busy` | `boolean` | Create in progress |
| `fetched` | `boolean` | Whether NEVA grid should be shown |

---

## Key notes

- Use MUI components (`Dialog`, `DialogTitle`, `DialogContent`, `DialogActions`, `FormControl`, `Select`, `MenuItem`, `Button`, `CircularProgress`) with `sx` props — no inline `style={{}}`
- Use `useState` and `useRef` only — no Redux or React Query
- Adapt API function calls to match the work codebase's `riskFactorApi` (axios-based)
- The NEVA AG Grid inside the modal is a **flat list** (not treeData) — no `getDataPath`, no `autoGroupColumnDef`
- `getRowId` on the NEVA grid: use `risk_factor_name` (all rows have `risk_factor_id: 0` so it can't be used as a key)
