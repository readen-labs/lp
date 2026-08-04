const HEX_RE =
  /^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/;

const rule = {
  meta: {
    type: 'suggestion',
    docs: {
      description:
        'No hardcoded hex colors outside src/constants/brand-colors.ts (architecture.md §6)',
    },
    schema: [],
    messages: {
      hardcodedHex:
        'No hardcoded hex colors outside src/constants/brand-colors.ts (architecture.md §6).',
    },
  },
  create(context) {
    const checkLiteral = (node, rawValue) => {
      if (typeof rawValue === 'string' && HEX_RE.test(rawValue)) {
        context.report({ node, messageId: 'hardcodedHex' });
      }
    };

    return {
      Literal(node) {
        checkLiteral(node, node.value);
      },
      TemplateLiteral(node) {
        if (node.expressions.length > 0) return;
        checkLiteral(node, node.quasis[0]?.value.cooked);
      },
    };
  },
};

module.exports = {
  rules: {
    'no-hardcoded-hex': rule,
  },
};
