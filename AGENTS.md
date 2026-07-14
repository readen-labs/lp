<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

# Project rules

Read and follow the rules in `.cursor/rules/` — they apply to every change:

- `.cursor/rules/project.mdc` — what this repo is, stack, structure, hard rules (i18n, responsive, protected sections)
- `.cursor/rules/coding-style.mdc` — Filipi's exact coding style (imports, types, naming, comments, tooling)
- `.cursor/rules/design-system.mdc` — tokens, typography, shelves/glass/motion; the app repo at `../readen` is the design source of truth

# Workflow

- **bun only** — `bun install`, `bun run dev`, `bun format`. Never npm/yarn/pnpm.
- Before calling work done: `bun run lint && bun run format:check && bun run typecheck && bun run build` (CI runs exactly these).
- Prettier + ESLint run on every commit via husky/lint-staged — don't fight the formatter.
