# lp

Readen's marketing site — "the reading app you close". Next.js 16 (App Router, Turbopack), Tailwind v4, next-intl (en/es/pt), MDX blog.

See [`docs/architecture.md`](docs/architecture.md) for the mechanical rules (folders, imports, naming, component shape, TypeScript, styling — ESLint-enforced) and [`.cursor/rules/`](.cursor/rules) for product context and judgment calls that can't be a lint rule.

## Getting started

```bash
bun install
bun run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Commands

- `bun run dev` — start the dev server
- `bun run build` — production build
- `bun run lint` — ESLint
- `bun run format` / `bun run format:check` — Prettier
- `bun run typecheck` — `tsc --noEmit`

Before calling any change done: `bun run lint && bun run format:check && bun run typecheck && bun run build` — CI runs exactly this.

bun only — never npm/yarn/pnpm.
