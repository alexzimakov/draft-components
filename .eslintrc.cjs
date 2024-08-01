const stylistic = require('@stylistic/eslint-plugin');

const stylisticConfig = stylistic.configs.customize({
  arrowParens: true,
  braceStyle: '1tbs',
  indent: 2,
  quotes: 'single',
  semi: true,
});

module.exports = {
  env: {
    es2022: true,
    browser: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [
        '.eslintrc.{js,cjs}',
      ],
      parserOptions: {
        sourceType: 'script',
      },
      rules: {
        '@typescript-eslint/no-require-imports': 'off',
      },
    },
    {
      files: [
        '*.stories.?(m|c)[jt]s?(x)',
      ],
      plugins: ['storybook'],
      extends: ['plugin:storybook/recommended'],
    },
    {
      files: [
        '*.{spec,test}.?(m|c)[jt]s?(x)',
        '**/__tests__/**/*.?(m|c)[jt]s?(x)',
      ],
      extends: ['plugin:testing-library/react'],
    },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 'latest',
  },
  plugins: [
    '@stylistic',
    '@typescript-eslint',
    'react',
    'react-hooks',
    'jsx-a11y',
  ],
  settings: {
    react: { version: 'detect' },
  },
  rules: {
    ...stylisticConfig.rules,
    '@stylistic/jsx-one-expression-per-line': 'off',
    '@stylistic/member-delimiter-style': ['error', {
      multiline: { delimiter: 'semi', requireLast: true },
      singleline: { delimiter: 'semi', requireLast: false },
      multilineDetection: 'brackets',
    }],
    'react/prop-types': ['error', { skipUndeclared: true }],
    'react/no-unescaped-entities': ['error', { forbid: ['>', '}'] }],
  },
};
