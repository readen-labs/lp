import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import perfectionistPlugin from 'eslint-plugin-perfectionist';

import noInlineCommentsPlugin from './eslint/plugins/check-no-inline-comments.js';
import noHardcodedHexPlugin from './eslint/plugins/check-no-hardcoded-hex.js';
import kebabCaseFilenamesPlugin from './eslint/plugins/check-kebab-case-filenames.js';
import indexReexportOnlyPlugin from './eslint/plugins/check-index-reexport-only.js';
import propsNamingPlugin from './eslint/plugins/check-props-naming.js';

// Rules here enforce docs/architecture.md — see that file for the "why" behind each one.
const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
    // Lint-tooling internals — CommonJS by design, loaded directly by ESLint/Node.
    'eslint/plugins/**',
  ]),
  {
    // architecture.md §2 — imports sorted by line-length ascending within
    // groups (react/next core → external → internal @/ → sibling ./ →
    // unknown), one blank line between groups.
    files: ['src/**/*.{ts,tsx}'],
    plugins: { perfectionist: perfectionistPlugin },
    rules: {
      'perfectionist/sort-imports': [
        'error',
        {
          type: 'line-length',
          order: 'asc',
          newlinesBetween: 1,
          internalPattern: ['^@/.*'],
          groups: [
            'react-next-core',
            ['builtin', 'external'],
            'internal',
            ['parent', 'sibling', 'index'],
            'unknown',
          ],
          customGroups: [
            {
              groupName: 'react-next-core',
              elementNamePattern: [
                '^react$',
                '^react-dom$',
                '^next$',
                '^next/.*',
              ],
            },
          ],
        },
      ],
      'perfectionist/sort-named-imports': [
        'error',
        { type: 'line-length', order: 'asc' },
      ],
    },
  },
  {
    // architecture.md §2 — no '../' imports, ever.
    files: ['src/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-syntax': [
        'error',
        {
          selector:
            'ImportDeclaration[source.value=/^\\.\\.\\//], ExportNamedDeclaration[source.value=/^\\.\\.\\//], ExportAllDeclaration[source.value=/^\\.\\.\\//]',
          message:
            "No '../' imports (architecture.md §2) — use '@/...' for cross-folder imports, './sibling' only for same-folder barrels.",
        },
      ],
    },
  },
  {
    // architecture.md §7 — `type` not `interface`, never `any`. .d.ts files
    // are exempt (ambient/module-augmentation declarations legitimately need `interface`).
    files: ['src/**/*.{ts,tsx}'],
    ignores: ['**/*.d.ts'],
    rules: {
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      '@typescript-eslint/no-explicit-any': 'error',
    },
  },
  {
    // architecture.md §6 — no hardcoded hex outside src/constants/brand-colors.ts.
    files: ['src/**/*.{ts,tsx}'],
    ignores: ['src/constants/brand-colors.ts'],
    plugins: { 'check-no-hardcoded-hex': noHardcodedHexPlugin },
    rules: {
      'check-no-hardcoded-hex/no-hardcoded-hex': 'error',
    },
  },
  {
    // architecture.md §8 — no inline // comments except directive prefixes.
    files: ['src/**/*.{ts,tsx}'],
    ignores: ['**/*.d.ts'],
    plugins: { 'check-no-inline-comments': noInlineCommentsPlugin },
    rules: {
      'check-no-inline-comments/no-inline-comments': 'error',
    },
  },
  {
    // architecture.md §3 — every source filename outside src/app/** is kebab-case.
    files: ['src/**/*.{ts,tsx}'],
    ignores: ['src/app/**', '**/*.d.ts'],
    plugins: { 'check-kebab-case': kebabCaseFilenamesPlugin },
    rules: {
      'check-kebab-case/kebab-case-filenames': 'error',
    },
  },
  {
    // architecture.md §4 — component index.ts barrels are re-export only.
    files: ['src/components/**/index.ts'],
    plugins: { 'check-index-reexport-only': indexReexportOnlyPlugin },
    rules: {
      'check-index-reexport-only/index-reexport-only': 'error',
    },
  },
  {
    // architecture.md §3 — exported types in *.types.ts are PascalCase.
    files: ['src/components/**/*.types.ts'],
    plugins: { 'check-props-naming': propsNamingPlugin },
    rules: {
      'check-props-naming/props-naming': 'error',
    },
  },
  {
    // architecture.md §1 — Components must never import routes.
    files: ['src/components/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['@/app/*', '@/app'],
              message:
                'Components must never import routes (architecture.md §1).',
            },
          ],
        },
      ],
    },
  },
  {
    // architecture.md §1 — Hooks must never import components or routes.
    files: ['src/hooks/**/*.ts'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['@/components/*', '@/components', '@/app/*', '@/app'],
              message:
                'Hooks must never import components or routes (architecture.md §1) — components import hooks, never the reverse.',
            },
          ],
        },
      ],
    },
  },
  {
    // architecture.md §1 — Lib sits near the bottom of the graph: it must
    // never reach into components/hooks/routes. mdx-render.tsx is the one
    // documented exception (see architecture.md §1 "Deliberate divergence")
    // and is excluded here, handled by the narrower block below instead.
    files: ['src/lib/**/*.{ts,tsx}'],
    ignores: ['src/lib/mdx-render.tsx'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: [
                '@/components/*',
                '@/components',
                '@/hooks/*',
                '@/hooks',
                '@/app/*',
                '@/app',
              ],
              message:
                'Lib must never import components/hooks/routes (architecture.md §1).',
            },
          ],
        },
      ],
    },
  },
  {
    // architecture.md §1 — mdx-render.tsx's one documented exception: it may
    // import components (to supply the MDX substitution map) but still never
    // hooks or routes.
    files: ['src/lib/mdx-render.tsx'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['@/hooks/*', '@/hooks', '@/app/*', '@/app'],
              message:
                'Lib must never import hooks/routes (architecture.md §1), even in the mdx-render.tsx exception.',
            },
          ],
        },
      ],
    },
  },
  {
    // architecture.md §1 — Data is presentational fixtures only: it must
    // never reach into components/hooks/lib/routes.
    files: ['src/data/**/*.ts'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: [
                '@/components/*',
                '@/components',
                '@/hooks/*',
                '@/hooks',
                '@/lib/*',
                '@/lib',
                '@/app/*',
                '@/app',
              ],
              message:
                'Data must never import components/hooks/lib/routes (architecture.md §1) — data is presentational fixtures only.',
            },
          ],
        },
      ],
    },
  },
  {
    // architecture.md §1 — Utils must stay pure: no React/Next import, no
    // reaching into components/hooks/lib/data/routes.
    files: ['src/utils/**/*.ts'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          paths: ['react', 'next'],
          patterns: [
            {
              group: [
                '@/components/*',
                '@/components',
                '@/hooks/*',
                '@/hooks',
                '@/lib/*',
                '@/lib',
                '@/data/*',
                '@/data',
                '@/app/*',
                '@/app',
                'next/*',
              ],
              message:
                'utils/ must stay pure (architecture.md §1) — no React/Next import, no reaching into other layers.',
            },
          ],
        },
      ],
    },
  },
  {
    // architecture.md §1 — Constants must never reach into
    // components/hooks/lib/data/routes.
    files: ['src/constants/**/*.ts'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: [
                '@/components/*',
                '@/components',
                '@/hooks/*',
                '@/hooks',
                '@/lib/*',
                '@/lib',
                '@/data/*',
                '@/data',
                '@/app/*',
                '@/app',
              ],
              message:
                'Constants must never import components/hooks/lib/data/routes (architecture.md §1).',
            },
          ],
        },
      ],
    },
  },
]);

export default eslintConfig;
