# Changelog

## 1.0.0

- Migrated out of the monorepo into a standalone app
- Replaced the `@monorepo/components` AutoForm with native file inputs
- Inlined the needed `@monorepo/components` pieces into `src/components/ui/`
- Replaced `@monorepo/utils` with the published `shuutils` package
- Replaced the `@monorepo/vite-plugins` unique-mark plugin with a local one
- Switched tooling to oxlint / oxfmt / turbo / tsc, matching the recipes stack
- Showed an error message when the browser denies clipboard access
- Released the previous object URL when a logo or icon is uploaded again
- Fixed the heading outline, the intro text is a paragraph instead of an `h3`
- Lazy-loaded the below-the-fold mock-up images
- Updated all dependencies to their latest versions (vitest 5, TypeScript 7, jest-dom 7)
- Dropped `@typescript/native-preview`, TypeScript 7 ships the native compiler as `tsc`
- Moved to pnpm 12, which enforces a minimum release age on dependencies
- Held vitest at 5.0.0 and `@types/node` at 26.5.1, the newer ones are too fresh for that policy
- Renamed the `onlyBuiltDependencies` workspace setting to pnpm 12's `allowBuilds`
- Bumped the CI actions, checkout 7, setup-node 7 and cache 6
