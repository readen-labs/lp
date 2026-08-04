const path = require('node:path');

const KEBAB_RE = /^[a-z][a-z0-9]*(-[a-z0-9]+)*$/;

function stripToStem(basename) {
  let stem = basename.replace(/\.(tsx|ts)$/, '');
  stem = stem.replace(/\.(types|spec|test)$/, '');
  return stem;
}

const rule = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Enforce kebab-case filenames (architecture.md §3)',
    },
    schema: [],
    messages: {
      notKebabCase:
        "Filename '{{basename}}' is not kebab-case (architecture.md §3) — expected a stem like '{{expected}}'.",
    },
  },
  create(context) {
    return {
      Program(node) {
        const filename = context.filename ?? context.getFilename();
        const basename = path.basename(filename);
        const stem = stripToStem(basename);

        if (!KEBAB_RE.test(stem)) {
          context.report({
            node,
            messageId: 'notKebabCase',
            data: {
              basename,
              expected: stem
                .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
                .toLowerCase(),
            },
          });
        }
      },
    };
  },
};

module.exports = {
  rules: {
    'kebab-case-filenames': rule,
  },
};
