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

**A hook never imports a third-party SDK directly.** Wrap it once in `src/lib/<domain>.ts` and depend on that — `lib/mdx.ts` (filesystem/gray-matter), `lib/seo.ts` (`Metadata`/JSON-LD shaping), `lib/figures.ts` (the Supabase snapshot) are this repo's version of that wrapper. True today with zero violations (every hook only imports React); written down so it stays true as hooks pick up new browser/third-party APIs. React and Next's own APIs are not "SDKs" in this sense.

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

**Grid rule:** every layout length — padding, margin, gap, width, height, size, inset, position offsets, translate — is a multiple of 4px. Prefer the scale class over the arbitrary-value bracket when one exists exactly (`h-14` not `h-[3.5rem]`). Exempt: font-size/line-height/tracking, opacity, border/stroke width, radius, shadow, z-index, animation duration, `aspect-ratio`, and percentage/viewport-unit values — none of those are a "length on the layout grid." ESLint-enforced (`check-grid-spacing`) against `px`/`rem` arbitrary values on the spacing/sizing utility families. A value that's genuinely off-grid (matching a pixel-exact design reference, an odd icon size, etc.) isn't silently rounded — it's called out with a scoped `eslint-disable-next-line` and a one-line reason, the same way `lib/mdx-render.tsx` documents its one layer exception, so it stays visible for design review instead of getting buried.

**Bare `<img>` vs `next/image`:** remote/caller-supplied images always go through `next/image` (`Iphone`'s screen content is the example — arbitrary screenshot/photo `src`, real win from lazy-loading and format optimization). `store-badge.tsx` is the one documented exception: it uses `<picture><source media="(prefers-color-scheme: dark)">` for an instant, zero-JS, zero-hydration-flash dark/light SVG swap that `next/image`'s single-`src` API can't express — don't extend this exception to other images without the same constraint.

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
- An off-grid arbitrary spacing/sizing value with no design-review flag (§6).
- A hook importing a third-party SDK directly instead of a `lib/` wrapper (§1).
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
- [ ] Every layout length on the 4px grid, or flagged with a scoped `eslint-disable-next-line` + reason
- [ ] Component folder shape correct, `index.ts` re-export only, types in `<name>.types.ts`
- [ ] `type` not `interface`, no `any`
- [ ] No inline comments
- [ ] Kebab-case filenames (outside `src/app/**`)
- [ ] Every new/changed string present in `en.json`, `es.json`, `pt.json`
- [ ] `bun run lint` clean
- [ ] `bun run typecheck` clean — lint does not catch type errors; a green lint is not enough
- [ ] `bun run build` clean

---

## §12 Deliberately not adopted from the mobile standard

The app repo's mobile architecture standard (`../readen/docs/architecture.md`) is written for a React Native/Expo runtime with server state, native gestures, and on-device QA. This site is a stateless-server, no-backend Next.js marketing site, so some of that standard's sections don't transfer. Rather than silently skip them, here's what was considered and why it's out:

- **Domain layer (business-logic layer).** This site has no non-trivial business rules to isolate — `lib/`, `utils/`, and `data/` already cover everything it actually does. Adding an empty `domain/` layer would be an abstraction with nothing in it.
- **Data layer (`options/`/`queries`/`mutations` over a generated API client).** This site makes no backend calls (§1) — `src/data/` is static presentational fixtures, not server state. TanStack Query has no role here.
- **A dedicated `providers.tsx` file.** The mobile standard composes every context provider once, in one file, because RN screens accumulate many (theme, auth, query client, ...). This site has exactly one — `NextIntlClientProvider`, inlined in `src/app/[locale]/layout.tsx`. Extracting a file to hold one provider is premature; revisit if a second provider shows up.
- **Test-ID convention (`MODULE-SCREEN-TYPE-PURPOSE`, `SCREEN_REGISTRY`, `TESTID_TYPES`).** This repo has no test framework, no e2e tooling, and no `data-testid` usage today. A four-segment ID taxonomy with an append-only screen registry is real infrastructure for a consumer that doesn't exist yet — revisit if/when Playwright/Cypress e2e is introduced.
- **A numeric `SCREEN_LINE_CAP` on route files, ESLint-enforced.** Investigated directly: the route files that ran long (`about`, `blog/[slug]`, `careers`, the `discover` figure pages) are long because they're one-time, server-rendered editorial JSX compositions, not because of tangled state or business logic — this site's routes have no client state to extract into a hook the way an RN screen would. Forcing them under an arbitrary line count would mean splitting one-off sections into one-off subcomponents, which this repo's own §5/coding-style.mdc already reject as an anti-pattern ("do not wrap a screen in a one-off component that only that screen renders"). What _was_ real, and got fixed instead: all seven routes duplicated the same breadcrumb-JSON-LD-building block — that's now `buildPageBreadcrumbJsonLd` in `lib/seo.ts`, one helper instead of seven copies.
- **Everything mobile-runtime-specific.** UI-thread animation library (Reanimated/worklets), native gesture recognizer (RN Gesture Handler), `expo-image`, OS permission-prompt `-request.ts` files, the mobile keyboard-footer component, native profiling. No native runtime exists here — this site already uses CSS-only motion, `next/image`, and has no permission prompts or on-screen keyboard to manage.
