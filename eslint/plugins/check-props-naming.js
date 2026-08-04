const PASCAL_CASE_RE = /^[A-Z][a-zA-Z0-9]*$/;

const rule = {
  meta: {
    type: 'problem',
    docs: {
      description:
        'Exported types in *.types.ts must be PascalCase (architecture.md §3)',
    },
    schema: [],
    messages: {
      notPascalCase:
        "Exported type '{{name}}' in a *.types.ts file must be PascalCase (architecture.md §3 — component prop types are named '{ComponentName}Props').",
    },
  },
  create(context) {
    return {
      ExportNamedDeclaration(node) {
        if (node.declaration?.type !== 'TSTypeAliasDeclaration') return;

        const { name } = node.declaration.id;
        if (!PASCAL_CASE_RE.test(name)) {
          context.report({
            node: node.declaration.id,
            messageId: 'notPascalCase',
            data: { name },
          });
        }
      },
    };
  },
};

module.exports = {
  rules: {
    'props-naming': rule,
  },
};
