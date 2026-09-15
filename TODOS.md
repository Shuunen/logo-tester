# TODOS

## App

### Drive criteria from a data array

**What:** Replace the 19 hand-numbered `setPointAtIndex(0..18, …)` calls in `src/app/app.tsx` with criteria driven by a data structure (array of criteria, or points keyed by criteria name).

**Why:** Inserting or reordering a single `<Criteria>` silently shifts every later column of the tab-separated output copied to the clipboard, so past spreadsheet rows stop lining up with new ones. The indices are also why `src/app/app.tsx:1` carries a file-wide `// oxlint-disable no-magic-numbers`.

**Context:** The app renders 19 `<Criteria name="…" onSelection={pointValue => setPointAtIndex(N, pointValue)} />` entries interleaved with the mock-up sections they rate, so the criteria list is not a flat block — a data-driven version needs to keep the visual grouping (logo on light/dark, favicon, Android icon, …). Moving to a keyed record would also let the copy output carry stable columns. Removing the indices should let the file-wide lint disable go away.

**Effort:** M
**Priority:** P2
**Depends on:** None

### Remove the Tailwind `!` important escapes

**What:** Drop the five `!` important modifiers in `src/app/app.tsx` (`h-16!`, `h-32!`, `grid!`, `px-14!`, `py-12!`) in favour of size variants on the `.logo` / `.card` classes.

**Why:** They exist only to out-specify the `@apply` rules behind `.logo` and `.card`. Every new usage of those classes now has to know which properties are silently overridden, and the next size needed means a sixth escape hatch rather than a variant.

**Context:** `.logo` and `.card` are defined with `@apply` in the global stylesheet; the important modifiers appear around the dark-background and app-store mock-up sections (`src/app/app.tsx:86,91,107`). A `cva`-style variant on the card/logo classes, matching how `src/components/ui/*` already handle variants, is the natural fit.

**Effort:** S
**Priority:** P2
**Depends on:** None
