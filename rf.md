This explains a bug in the Scenario Viewer version history where the scenario names do not update correctly when users switch versions. The issue is that the UI calls the Names API only once on initial page load, so when moving from a newer version (for example V3) to an older one (for example V2 or V1), the dropdown still shows names from the latest version instead of the names as of the selected version timestamp. The backend fix added support for an as-of date parameter, but the UI needs to call the Names API again on version clicks (V1 V2 V3 and so on) and reset to a default state when appropriate. The includes testing guidance using uploaded files on Dev to verify that “recession updated” appears for certain versions while “recession” appears for others.

---

# Scenario Viewer does not refresh scenario names when switching version history

## Overview

When a user switches between version history entries in Scenario Viewer, the UI only refreshes the scenario definition and risk factor shocks APIs, but does not re-call the names API with the selected version timestamp. As a result, the scenario type/name dropdowns continue showing the latest names instead of the names that existed for the selected historical version, which can display incorrect or missing scenario names for older versions.

This impacts users reviewing historical scenario versions because the dropdown state no longer matches the selected version’s data, making it difficult to validate or compare past scenario configurations accurately.

## Steps to Reproduce

1. Open **Scenario Viewer** and select a scenario type and scenario name so the page loads normally.
2. Enable **Version History** and select an older version (for example, V2 or V1).
3. Observe that the page calls the scenario definition and risk factor shocks APIs, but does **not** re-call the **names API** with the selected version timestamp.
4. Notice that the scenario name dropdown still shows the latest/current names instead of the names for the selected version.
5. Compare against a version where the scenario name changed between versions (for example, `recession` vs `recession updated`) to confirm the mismatch.

## Acceptance Criteria

- When a user clicks a version in **Version History**, the UI must call the **names API** again using the selected version’s `asOfDate` / timestamp.
- The scenario type/name dropdowns must refresh to reflect the names available for that selected version.
- The default state should be preserved when switching versions if the selected scenario name is not applicable to the chosen version.
- Existing behavior for loading the latest version on initial page load should remain unchanged.
- Scenario definition and risk factor shocks should continue to load correctly after the names API refresh.

