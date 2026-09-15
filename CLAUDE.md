# CLAUDE

## Project docs

- `README.md` — what the app does
- `CHANGELOG.md` — release history

## After any codebase change

Run `pnpm check` (types, formatting, lint, build, tests). Fix all failures before done.

## Linting rules

Never disable a lint rule without asking the user. Try to fix first, and if too complex, ask the user if they want to disable the rule for a line or a file.

Custom project rules live in `src/bin/lint.rules.ts` and run via `pnpm lint:sources`.

## Versioning

`VERSION` holds the version as MAJOR.MINOR.PATCH semver, and must stay in sync with `version` in `package.json`. Bump both in the same commit.

## Code practices

- **Constants**: camelCase only, never UPPER_SNAKE_CASE
- **Absent values**: `undefined`, never `null`
- **Narrowing**: never `x!`, prefer an explicit `if (!x) return`
- **Shared utils**: prefer `shuutils` over re-implementing, local helpers go in `src/utils/`

## Testing practices

- **Globals**: `describe`, `it`, `expect` are global — do not import them
- **File naming**: `.test.ts` / `.test.tsx` only, never `.spec.ts`
- **Spacing in tests**: in unit and e2e files, inside `test`/`it` blocks, do not add blank lines
- **Selectors**: `getByTestId` / `queryByTestId` / `getAllByTestId` only — no role/text/label queries
- **testid format**: kebab-case, derived from the component `name` prop
