const ALLOWED_PREFIXES = [
  'eslint-disable',
  'eslint-enable',
  '@ts-ignore',
  '@ts-expect-error',
  '@ts-nocheck',
  '@ts-check',
  'prettier-ignore',
];

function isDirective(text) {
  const trimmed = text.trim();
  return ALLOWED_PREFIXES.some((prefix) => trimmed.startsWith(prefix));
}

const rule = {
  meta: {
    type: 'suggestion',
    docs: {
      description:
        'No inline // comments except directive prefixes (architecture.md §8)',
    },
    schema: [],
    messages: {
      noInlineComment:
        'Inline // comments are banned (architecture.md §8) — use /* */ or /** */ block comments only when the WHY is non-obvious.',
    },
  },
  create(context) {
    return {
      Program() {
        const sourceCode = context.sourceCode ?? context.getSourceCode();
        const comments = sourceCode.getAllComments();

        for (const comment of comments) {
          if (comment.type !== 'Line') continue;
          if (isDirective(comment.value)) continue;

          context.report({
            node: comment,
            messageId: 'noInlineComment',
          });
        }
      },
    };
  },
};

module.exports = {
  rules: {
    'no-inline-comments': rule,
  },
};
