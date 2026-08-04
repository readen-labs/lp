const rule = {
  meta: {
    type: 'problem',
    docs: {
      description:
        'Component index.ts must be re-export only (architecture.md §4)',
    },
    schema: [],
    messages: {
      notReexport:
        "index.ts must only re-export from the component file (e.g. export { ComponentName } from './name') — no inline declarations (architecture.md §4).",
    },
  },
  create(context) {
    return {
      'Program > *'(node) {
        const isPureReexport =
          (node.type === 'ExportNamedDeclaration' &&
            node.source &&
            !node.declaration) ||
          node.type === 'ExportAllDeclaration';

        if (!isPureReexport) {
          context.report({ node, messageId: 'notReexport' });
        }
      },
    };
  },
};

module.exports = {
  rules: {
    'index-reexport-only': rule,
  },
};
