const SPACING_PREFIXES = [
  'gap-x',
  'gap-y',
  'gap',
  'px',
  'py',
  'pt',
  'pr',
  'pb',
  'pl',
  'p',
  'mx',
  'my',
  'mt',
  'mr',
  'mb',
  'ml',
  'm',
  'min-w',
  'min-h',
  'w',
  'h',
  'size',
  'inset-x',
  'inset-y',
  'inset',
  'top',
  'right',
  'bottom',
  'left',
  'translate-x',
  'translate-y',
];

const TOKEN_RE = new RegExp(
  `(?:^|\\s)(?:[a-z0-9-]+:)*-?(?:${SPACING_PREFIXES.join('|')})-\\[(-?[\\d.]+)(px|rem)\\](?=\\s|$)`,
  'g',
);

const REM_TO_PX = 16;

const GRID_UNIT_PX = 4;

const isOnGrid = (value, unit) => {
  const px = unit === 'rem' ? Number(value) * REM_TO_PX : Number(value);

  return Math.abs(px % GRID_UNIT_PX) < 1e-6;
};

const scanText = (text, report, node) => {
  for (const match of text.matchAll(TOKEN_RE)) {
    const [token, value, unit] = [match[0].trim(), match[1], match[2]];

    if (!isOnGrid(value, unit)) {
      report({ node, messageId: 'offGrid', data: { token } });
    }
  }
};

const rule = {
  meta: {
    type: 'suggestion',
    docs: {
      description:
        'Arbitrary Tailwind spacing/sizing values must be a multiple of 4px (architecture.md §6)',
    },
    schema: [],
    messages: {
      offGrid:
        '"{{token}}" is not a multiple of 4px — snap it to the grid or use an exact scale class (architecture.md §6). If this value is intentionally off-grid, flag it for design review instead of silencing this rule.',
    },
  },
  create(context) {
    const report = (payload) => context.report(payload);

    return {
      Literal(node) {
        if (typeof node.value === 'string') {
          scanText(node.value, report, node);
        }
      },
      TemplateLiteral(node) {
        for (const quasi of node.quasis) {
          scanText(quasi.value.cooked ?? '', report, node);
        }
      },
    };
  },
};

module.exports = {
  rules: {
    'grid-spacing': rule,
  },
};
