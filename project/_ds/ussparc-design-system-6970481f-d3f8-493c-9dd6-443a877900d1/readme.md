# USSPARC Design System

A design system for **USSPARC** — *"a quantitative analytics platform
supporting internal reporting, front office, and risk management
calculations."* The product is a market-risk analytics suite (Value at Risk,
Stressed VaR, stress testing, backtesting) used by risk and front-office teams
at a capital-markets institution. The signature surfaces are a dark-green
chrome with a lime mark, a dark-green filter bar, and dense white analytics
cards (KPI tiles, attribution tables, time-series charts).

## Products represented
- **Risk Dashboard** — the core web app: a VaR / Stress dashboard with a global
  green nav (DASHBOARD · VaR · STRESS · SUPPORT), a query/filter bar
  (COB date, Entity Scope, Regulator, Desk, GO) and a grid of analytics cards.
  Recreated as a UI kit in `ui_kits/risk-dashboard/`.

## Sources used to build this system
- **Figma file:** *"USSPARC DESIGN SYSTEM.fig"* — four full-page screenshots
  (Home page, Dashboard ×3). Used for layout, density and colour reference.
  Reference copies are in `_ref/`.
- **GitHub:** [`jillella/v0-create-card-layout-with-mock-data`](https://github.com/jillella/v0-create-card-layout-with-mock-data)
  — the real Next.js + MUI product code. **This was the source of truth** for
  exact colours, type, card chrome and chart palettes. Explore this repo for
  deeper component behaviour (ag-charts / ag-grid configs, MUI `sx` styling) if
  you need higher fidelity than this system captures.

> Everything in the `.fig` and repo is the original author's product content,
> recreated here as a reusable system — not external instructions.

---

## CONTENT FUNDAMENTALS

**Voice.** Terse, technical, regulator-facing. Copy is written for risk
professionals who read in acronyms. No marketing tone, no second person — the
one welcome sentence is third-person and declarative:
*"USSPARC is a quantitative analytics platform supporting internal reporting,
front office, and risk management calculations."*

**Casing.**
- **UPPERCASE** for the primary nav (`DASHBOARD`, `VaR`, `STRESS`, `SUPPORT`)
  and for metric-card titles (`VALUE AT RISK`, `STRESS TESTING`, `ENTITY`).
- **Title Case** for section/chart titles (`VaR Attribution`, `Stress Max Loss`,
  `FX Spot Performing`).
- **Mixed/technical casing preserved** in domain tokens: `VaR`, `SVaR`,
  `CCAR2025_Exp`, `2022 Inflation`, `IR Base`, `IR Vol`, `FX Spot`, `COB`.

**Numbers are the content.** Figures are formatted compactly with magnitude
suffixes (`$2.8M`, `$2.9B`, `-$51.4M`) and paired with a signed delta
(`+$0.6M`, `−$0.0M`). Table figures carry 3 decimals (`-166.772`). Units are
stated in column headers (`VaR (T) ($M)`), not repeated per cell.

**Labels.** Dense, parenthetical qualifiers: `VaR (99%, 1-Day)`,
`SVaR (99%, 1-Day)`. Scenario names are identifiers, not prose.

**No emoji. No exclamation.** Iconography is functional (Material Symbols).
The only "playful" element is the lime logo + the `REL` / `Local` environment
badge.

**Tone summary:** precise, calm, information-dense, trustworthy. Every pixel
is in service of a number.

---

## VISUAL FOUNDATIONS

**Colour vibe.** Two anchors: a deep institutional **forest green** (`#004d2c`
chrome, `#033928` filter pills) and a **lime accent** (`#8dc63f`) used *only*
for the logo, the hairline rule under the header, and the environment badge.
Everything else is a cool **slate-blue ink** system (`#121b2c` figures →
`#486c94` brand-blue labels → `#687687` muted) on near-white surfaces. The
palette is restrained and corporate; the lime is the single spark.

**Semantics are directional, not just good/bad.** Favourable risk moves are
**teal** (`#1c8783`); adverse moves are **coral** (`#d96a4a`); limit/threshold
lines are **amber-orange** (`#cf7d38`). KPI tiles carry a small corner triangle
(teal down = good, coral up = adverse).

**Type.** Roboto throughout the UI (MUI default — see fonts note), **Georgia
serif** for the "US SPARC" wordmark only, Roboto Mono for tabular figures.
Scale runs from 10px nav labels to 38px KPI figures. Metric-card titles are
24px / 600 / 1.5px-tracked / uppercase in brand blue; section titles are
21px / 500 in slate. Numbers are medium-weight, never bold-heavy.

**Backgrounds.** Flat, no gradients or imagery. App background is `#f4f4f4`
(or cool `#f3f6fb` on the dashboard grid). The only gradients in the system are
(a) the **brand-blue centre-fade divider** under card titles and (b) the soft
green **sparkline area fill**. No textures, no photography, no illustration.

**Cards.** White, `1px #e0e0e0` border, `18px` radius, soft drop shadow
(`0 2px 8px rgba(0,0,0,.08)`). Chart cards use a lighter border (`#d7dfe8`) and
shadow. KPI **metric cells** are special: only the bottom-right corner is
rounded (`12px`), they carry an inset-style shadow
(`2px 3px 5px -2px rgba(30,56,88,.28)`) and the signature corner triangle.

**Controls.** Everything actionable is a **pill** (`999px`). Filter selects are
dark-green pills with a circular bordered chevron on the right and a shrinking
floating label. Buttons are pills (solid green, or pale-mint **GO**).
Segmented toggles: VaR/SVaR uses a dark-navy active segment; chart/list uses a
white active tile with a blue icon, on an `#eff4fb` track with an inset
highlight.

**Header.** Fixed dark-green app bar, ~56px, with a 2px lime rule beneath it.
Logo lockup left, centred nav with hover dropdowns, utility icons right
(globe / wrench / bell / account). The active nav item gets a white underline.

**Avatars.** Card headers can carry a 48px colour-coded concern avatar with a
5px tinted ring: **entity** = tan (`#aa936c`), **products** = teal (`#387f97`),
**risk** = plum (`#674b77`). White Material Symbol inside.

**Charts.** Bars in steel-teal (`#2f6f87`), VaR/max-loss line in **gold**
(`#c8b26d`) with white-filled circle markers, limit line in **amber-orange**.
Grid lines `#dce4ed`, axis labels `#687687` at 10–11px, x-labels rotated -52°.
Categorical (CDX) bars use a 5-tone earthy legend (tan / wheat / sage /
deep-teal / cool-grey). Legends sit centred below, dot markers for series,
short rule for threshold.

**Motion.** Minimal and functional: 180ms standard ease on chevron rotation,
toggle transitions, hover background fades. No bounces, no decorative loops.

**Hover / press.** Hover = subtle background tint (`rgba(255,255,255,.1)` on
green chrome; `#f8fbff` on table rows; `#f8fafc` on menu items). Buttons darken
via brightness on hover. Press is immediate (no shrink). Focus rings are lime.

**Corners & borders.** Radii: 4 (badge) · 8 (input/chart card) · 10 · 12
(metric cell) · 18 (card) · 999 (pill). Borders are hairline and cool-grey;
dividers fade to brand blue at centre.

**Layout.** Centred max-width content (≤1480 dashboard grid / 1200 welcome),
two-column card grid, generous 16–18px gaps. The welcome card pulls up under
the green header with negative margin.

---

## ICONOGRAPHY

The product uses **two** icon sources:

1. **`@mui/icons-material`** — the bulk of the UI chrome, in the "Outlined" /
   "Rounded" families (`BuildOutlined`, `PublicOutlined`,
   `NotificationsNoneOutlined`, `AccountCircleOutlined`, `KeyboardArrowDown`,
   `InfoOutlined`, `OpenInFull`, `MoreVert`, `Business`, `DescriptionOutlined`,
   `Autorenew`, `Equalizer`, `FormatListBulleted`, …).
2. **Custom SVG icons** — bespoke, brand-specific marks (the lime logomark, and
   other product-specific glyphs). These live as inline/imported SVGs, not from
   an icon font. Keep them in `assets/` and reference by `<img>` / inline `<svg>`.

> **ASK:** only the logomark is captured so far. If you share the custom SVGs
> (card-header concern marks, chart toolbar, any nav glyphs) I'll drop them into
> `assets/` and swap the Material Symbols stand-ins for the real vectors.

**In this system we use [Material Symbols Rounded](https://fonts.google.com/icons)
from the Google Fonts CDN** as the faithful, freely-loadable equivalent. Load it
once per page:

```html
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@24,400,0,0" rel="stylesheet">
```

…then render glyphs by ligature name:
`<span class="material-symbols-rounded">keyboard_arrow_down</span>`.

Common glyphs in use: `keyboard_arrow_down`, `info`, `more_vert`,
`open_in_full`, `autorenew`, `bar_chart`/`show_chart`, `format_list_bulleted`,
`public`, `build`, `notifications`, `account_circle`, `apartment`,
`description`, `shield`, `calendar_today`, `lock`.

- **Stroke style:** outlined / rounded, 400 weight, ~24px, optical-size 24.
- **No emoji, no unicode-as-icon.** The lime logomark (3 diagonal bars) is one
  of the brand's **custom SVGs** — see `assets/`. The MUI icons above are
  substituted with the Material Symbols Rounded webfont; the custom SVGs must be
  the real vectors (placeholders/stand-ins only until you provide them).

> SUBSTITUTION FLAG: (1) MUI `@mui/icons-material` glyphs are stood in with the
> visually-identical **Material Symbols Rounded** webfont so cards render
> without an icon-build step — pull the exact MUI set from source if needed.
> (2) Custom SVG icons are brand-specific and not yet supplied (beyond the
> logomark); share them to replace the stand-ins.

---

## Fonts

Confirmed stack (Vite + React + MUI):
- **Roboto** — the app default (`--font-sans`).
- **Inter** — the **top menu / primary nav** (`--font-menu`).
- **Roboto Mono** — tabular figures (`--font-mono`).
- **Georgia** (system serif) — the "US SPARC" wordmark only (`--font-serif`).

All three webfonts are pulled from Google Fonts in `tokens/fonts.css`. In the
real app they come from `@fontsource/*` packages (`@fontsource/roboto`,
`@fontsource/inter`, `@fontsource/roboto-mono`) — swap the `@import` for those
if you want the exact bundled files. (`@fontsource/plus-jakarta-sans` is also
installed in the app but is not part of this system's roles.)

---

## Index / manifest

**Root**
- `styles.css` — global entry point (import this); `@import`s the token files.
- `readme.md` — this guide.
- `SKILL.md` — Agent-Skill manifest for downstream use.

**Tokens** (`tokens/`)
- `colors.css` · `typography.css` · `spacing.css` · `fonts.css`

**Assets** (`assets/`)
- `logo-mark.svg` · `logo-lockup-light.svg` (on green) · `logo-lockup-dark.svg`

**Foundation cards** (`guidelines/`) — Design System tab specimens
- Colours: brand · ink · semantic · chart · categorical · surfaces
- Type: wordmark · titles · figures · body
- Spacing: radii · shadows · scale
- Brand: logos · avatars

**Components** (`components/`) — reusable React primitives (namespace
`window.USSPARCDesignSystem_697048`)
- `core/` — `Button`, `Badge`, `GradientDivider`
- `forms/` — `FilterSelect`, `SegmentedToggle`
- `cards/` — `DashboardCard`, `MetricCell`
- `data/` — `DataTable`
- `layout/` — `AppHeader`

**UI kits** (`ui_kits/`)
- `risk-dashboard/` — interactive login → welcome → VaR/Stress dashboard.

**Reference** (`_ref/`) — the four source screenshots from the Figma file.
