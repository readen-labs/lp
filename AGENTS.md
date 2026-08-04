<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

# Project rules

Follow `docs/architecture.md` for anything mechanical (folders, imports, naming, component/hook shape, state-in-hooks, styling tokens, TypeScript/export rules — ESLint-enforced), and the Cursor project rules in `.cursor/rules/` for everything else:

- `.cursor/rules/project.mdc` — what this repo is, stack, structure, hard rules (i18n, responsive, protected sections)
- `.cursor/rules/coding-style.mdc` — guiding principles and judgment calls that can't be a lint rule
- `.cursor/rules/design-system.mdc` — tokens, typography, shelves/glass/motion; the app repo at `../readen` is the design source of truth

# Hard invariants (do not re-litigate)

- **Git:** never run git commands; Filipi commits.
- **Tooling:** bun/bunx only — `bun install`, `bun run dev`, `bun format`. Never npm/yarn/pnpm.
- **No browser preview from Claude** — Filipi reviews every visual change himself.
- **i18n:** every user-facing string exists in all three of `en.json`, `es.json`, `pt.json`, same keys, `en` is the reference.
- Before calling work done: `bun run lint && bun run format:check && bun run typecheck && bun run build` (CI runs exactly these).
- Prettier + ESLint run on every commit via husky/lint-staged — don't fight the formatter.
