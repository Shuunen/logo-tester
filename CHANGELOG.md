# Changelog

## 1.0.0

- Migrated out of the monorepo into a standalone app
- Replaced the `@monorepo/components` AutoForm with native file inputs
- Inlined the needed `@monorepo/components` pieces into `src/components/ui/`
- Replaced `@monorepo/utils` with the published `shuutils` package
- Replaced the `@monorepo/vite-plugins` unique-mark plugin with a local one
- Switched tooling to oxlint / oxfmt / turbo / tsgo, matching the recipes stack
