# lp architecture

This is enforced, not aspirational. Where a rule below can be expressed as an ESLint rule, `eslint.config.mjs` + `eslint/*.js` encode it and the error message points back to the section number here (`architecture.md §X`). Sections that can't be machine-checked (product framing, visual/motion judgment) still live in `.cursor/rules/*.mdc`, which now points here for anything mechanical and keeps only what a linter can't express. Modeled on the sister app repo's `../readen/docs/architecture.md`, pruned to what a Next.js marketing site actually needs — no widgets, no cache/services split, no native gesture layer.

Canonical references: `src/app/globals.css` (design tokens), `eslint.config.mjs` + `eslint/*.js` (the enforcement layer), `src/app/[locale]/layout.tsx` (composition root), `src/i18n/`.

---

## §0 Tooling

- **bun/bunx only.** Never `npm`/`npx`/`yarn`/`pnpm` — mixing package managers desyncs the lockfile.
- **Never run git.** Filipi has full manual control over what enters git, always — a hard boundary, no exceptions, not even to fix CI. Explain what to do and let him run it.
- **No browser preview from Claude.** Filipi reviews every visual change himself in the browser — don't start a dev server on his behalf as a substitute for verification.
- **Verify with `bun run lint && bun run format:check && bun run typecheck && bun run build`** before calling work done — CI runs exactly this.

---

## §1 Layers & folders

One-directional dependency graph. A layer may import from anything in its "may import from" column; importing from a layer in "never" is a lint error. Pruned from the app repo's 8-layer graph: no `services/`/`cache/`/`contexts/`/`widgets/`/`themes/` — this site makes no backend calls, has no local persistence, no React Context usage today, and its design tokens already live correctly in `globals.css` (Tailwind v4 CSS-first, not a split CSS+JS-mirror situation).

| Layer                     | Folder                                             | May import from                                                         | Never                                                                                                                                                                                                                                                                                |
| ------------------------- | -------------------------------------------------- | ----------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Routes                    | `src/app/**`                                       | components, hooks, lib, data, constants, utils, i18n, messages, content | — (top of the graph)                                                                                                                                                                                                                                                                 |
| Components                | `src/components/**`                                | other components, hooks, lib, data, constants, utils, i18n, types       | routes (ESLint-enforced)                                                                                                                                                                                                                                                             |
| Hooks                     | `src/hooks/**`                                     | other hooks, lib, data, constants, utils, types                         | components, routes (ESLint-enforced)                                                                                                                                                                                                                                                 |
| Lib                       | `src/lib/**`                                       | other lib, data, constants, utils, types                                | components, hooks, routes — IO/framework-surface wrappers (filesystem reads, `Metadata`-object builders) sit near the bottom of the graph, never reach upward (ESLint-enforced). **One documented exception**: `mdx-render.tsx` imports `Cover` from `components/` — see note below. |
| Data                      | `src/data/**`                                      | other data, constants, utils, types                                     | components, hooks, lib, routes — presentational fixtures/copy, no logic beyond the data itself (ESLint-enforced)                                                                                                                                                                     |
| Utils                     | `src/utils/**`                                     | other utils, constants, types                                           | components, hooks, lib, data, routes, React/Next import — must stay pure, no side effects (ESLint-enforced)                                                                                                                                                                          |
| Constants                 | `src/constants/**`                                 | other constants, utils, types                                           | components, hooks, lib, data, routes — same reasoning as Utils, one layer up (ESLint-enforced)                                                                                                                                                                                       |
| Types                     | `src/global.d.ts`                                  | types only                                                              | ambient `.d.ts` only — not a home for domain types                                                                                                                                                                                                                                   |
| i18n / messages / content | `src/i18n/**`, `src/messages/**`, `src/content/**` | —                                                                       | importable from anywhere, not a code layer                                                                                                                                                                                                                                           |
| Index barrels             | `**/index.ts`                                      | anything                                                                | re-export only, no logic                                                                                                                                                                                                                                                             |

**`lib/` vs `utils/` vs `data/` vs `constants/`:** `utils/` is pure — no side effects, no IO, no React/Next import (`format-date.ts`, `locale-path.ts`, `utils.ts`); it may pull in a literal from `constants/` (e.g. `locale-path.ts` uses `SITE_URL`) since importing a constant doesn't compromise purity. `lib/` is the mirror image: its job is touching a framework/IO surface that can't be pure (`mdx.ts` reads the filesystem, `mdx-render.tsx` renders MDX to React, `seo.ts` builds `Metadata`/JSON-LD objects consumed by Next's own APIs) — the closest thing this repo has to the app's "third-party SDK wrapper" concept. `data/` is presentational fixture/copy data (`shelf-books.ts`, `people.ts`, `feature-mock-books.ts`) — not a constants file (no `SCREAMING_SNAKE_CASE` primitives) and not a lib wrapper (no IO), so it gets its own layer rather than being folded into either. `constants/` holds `SCREAMING_SNAKE_CASE` config/lookup tables (`config.ts`, `cover.ts`, `blog.ts`, `shelf.ts`, `accordion.ts`, `library.ts`, `marketing-images.ts`, `brand-colors.ts`).

**Deliberate divergence:** `lib/mdx-render.tsx` imports `Cover` from `components/brand/cover` so blog MDX content can use `<Cover />` inline — the MDX component-substitution map necessarily needs the real component, and inventing a sixth layer to hold one file isn't worth it. This is the one `lib/` file allowed to import from `components/`, scoped narrowly in ESLint — don't extend it to other `lib/` files or use it as precedent for a lib file reaching into hooks/routes.

**Domain and prop types are co-located, not centralized.** `src/global.d.ts` is ambient-only (next-intl's `AppConfig`); component props live in the component's own `.types.ts`, and file-local domain types (e.g. `BlogPost` in `mdx.ts`, `ShelfBook` in `shelf-books.ts`) live next to the data/logic they describe.

`@/` resolves to `src/` (see `tsconfig.json`).

---

## §2 Imports

Three groups, one blank line between each, sorted by **line length ascending** within a group (shortest import statement first). Named-import specifiers inside braces are also length-sorted ascending.

1. `react`, `next`, `next/*` (React/Next core)
2. Everything else third-party — `next-intl`, `@mdx-js/*`, other npm
3. Internal `@/…` aliases

```ts
import Image from 'next/image';

import { getTranslations } from 'next-intl/server';

import { Reveal } from '@/components/ui/reveal';
import { EditorialHeader } from '@/components/brand/editorial-header';

import { SHELF_BOOKS } from '@/data/shelf-books';
import { STORE_LINKS } from '@/constants/config';

import type { Locale } from '@/i18n/routing';
```

- `import type { Foo }` for type-only imports; type-only lines sort by length within their tier alongside value imports, not grouped separately.
- Multi-line (wrapped) imports get a blank line above **and** below them, even within a tier.
- **No `../` imports, ever.** Only `@/…` for cross-folder imports and `./sibling` for same-folder barrel re-exports (`export { Button } from './button'`).

---

## §3 Naming

- **Every source file and folder is kebab-case** — `use-site-header.ts`, `format-date.ts`, `components/ui/reveal/reveal.tsx`.
- **One exception, structural, not stylistic:** `src/app/**` — Next.js owns these names (`[slug]`, `(locale)`, `layout.tsx`, `page.tsx`, `not-found.tsx`). Don't kebab-rename route segment brackets or framework-reserved filenames.
- Component/exported-symbol names stay **PascalCase** even though the file is kebab-case: `reveal.tsx` exports `Reveal`.
- Event handlers: `handle<Action>` — `handleToggle`, `handleSubmit`. Never `cb`, `onClickFn`.
- Booleans: `is*`/`has*`/`can*` where the name is a predicate; otherwise a descriptive noun (`menuOpen`).
- Module-level constants: `SCREAMING_SNAKE_CASE` — `HERO_COVER_WIDTH`, `STORE_LINKS`.
- Component prop types: exactly `{ComponentName}Props` — `ButtonProps`, `CoverProps`.

---

## §4 Components

**Reuse first.** Grep `src/components/` by name and synonym before building anything new — `Cover`, `Shelf`, `EditorialHeader`, `Reveal`, `Button`, `StoreBadge`, `StarRating` exist precisely so new sections compose them instead of spawning near-duplicates.

Canonical folder shape, grouped under the existing category folders (`brand/`, `layout/`, `legal/`, `blog/`, `og/`, `ui/`, `marketing/` — genuinely different domains, kept as the parent directory unlike the app repo's single flat `components/`):

```
components/<category>/<kebab-name>/
  <kebab-name>.tsx        the component
  <kebab-name>.types.ts   props + local types
  index.ts                re-export only
```

No `type`/`interface` declared inside a `.tsx` file — it lives in the sibling `.types.ts`. `index.ts` is exactly `export { ComponentName } from './<kebab-name>';`, nothing else. No boolean "mode" props — split into two components instead of branching internally on a flag.

---

## §5 State lives only in hooks

**Screens and components hold zero plain state.** `useState`/`useReducer` are banned in `src/app/**` and `src/components/**`. If a component needs state, the state — and the effects/derived values around it — live in a hook at `src/hooks/use-<name>.ts`. A screen is a wiring diagram: call hooks, pass their values and handlers to components, render. Nothing else.

Hooks are **flat** files (`src/hooks/use-site-header.ts`), not per-hook folders — this repo's hooks have no sibling `.spec.ts`/`.types.ts` multiplicity that would justify a folder, unlike components. `useState<T>` inside a hook always needs an explicit generic — never let it infer.

Server components stay the default; `'use client'` is only for leaf-sized components that genuinely need state, effects, or browser APIs.

---

## §6 Styling & tokens

`globals.css` (Tailwind v4 CSS-first, `@theme inline`) is the single source of design tokens — `bg-background`, `bg-card`, `text-foreground` + opacity modifiers, `bg-primary`/`text-primary` (always `#10b981`). Dark mode is automatic via `prefers-color-scheme` on the CSS tokens — never fork markup per theme.

No hardcoded hex anywhere outside `src/constants/brand-colors.ts` — ESLint-enforced as an error. `brand-colors.ts` exists specifically for the contexts that can't read CSS custom properties: Satori-rendered OG images/icons (`app/icon.tsx`, `app/opengraph-image.tsx`, `components/og/`) and inline SVG `stopColor`s (`Logo`). Every hex value in those files, including one-off tones, is a named export from that file.

Full token table, typography, motion, and glass-effect detail: `.cursor/rules/design-system.mdc`.

---

## §7 TypeScript & exports

- `type`, never `interface`.
- Never `any` — no exceptions, no `as any`.
- Components: named export, arrow function — `export const Button = (...) => {...}`.
- Routes (`src/app/**`): `export default function` (App Router requirement for pages/layouts).
- Props always destructured inline in the function signature — never `props.foo`.
- Every `useState<T>` has an explicit generic.

---

## §8 Comments

No inline `//` comments, ever. Docstrings only (`/* ... */` or `/** ... */`), only when the WHY is genuinely non-obvious — never restate what the code does.

---

## §9 i18n

Every user-facing string lives in `src/messages/{en,es,pt}.json` — all three files updated together, same key structure. No hardcoded copy in components. `en.json` is the reference for key order. Enforced by convention today (no automated key-parity check yet).

---

## §10 Anti-patterns (rejected on sight)

- Building a new component/hook/util when an existing one already does the job.
- `useState`/`useReducer` in a route or component (§5).
- A hardcoded hex color outside `src/constants/brand-colors.ts` (§6).
- `interface` instead of `type`, `any`, a type declared inside a `.tsx` file (§7).
- A malformed `index.ts` that isn't a pure re-export (§4).
- A props type not named `{ComponentName}Props` (§3).
- A non-kebab-case filename outside `src/app/**` (§3).
- An inline `//` comment (§8).
- Unsorted imports, or a `../` import (§2).
- A user-facing string missing from one of the three locale files (§9).

---

## §11 Pre-merge checklist

- [ ] Reused an existing component/hook/util where one already existed
- [ ] Imports sorted, no `../`
- [ ] No state in a route or component — state lives in a hook
- [ ] No hardcoded hex outside `src/constants/brand-colors.ts`
- [ ] Component folder shape correct, `index.ts` re-export only, types in `<name>.types.ts`
- [ ] `type` not `interface`, no `any`
- [ ] No inline comments
- [ ] Kebab-case filenames (outside `src/app/**`)
- [ ] Every new/changed string present in `en.json`, `es.json`, `pt.json`
- [ ] `bun run lint` clean
- [ ] `bun run typecheck` clean — lint does not catch type errors; a green lint is not enough
- [ ] `bun run build` clean
