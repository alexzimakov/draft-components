import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginTs from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import stylistic from '@stylistic/eslint-plugin';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import pluginHooks from 'eslint-plugin-react-hooks';
import storybook from 'eslint-plugin-storybook';
import testingLibrary from 'eslint-plugin-testing-library';

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
  { ignores: ['dist', 'storybook-static', 'coverage'] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...pluginTs.configs.recommended,
  pluginReact.configs.flat.recommended,
  stylistic.configs.customize({
    arrowParens: true,
    braceStyle: '1tbs',
    indent: 2,
    quotes: 'single',
    semi: true,
  }),
  jsxA11y.flatConfigs.recommended,
  ...storybook.configs['flat/recommended'],
  {
    settings: {
      react: { version: 'detect' },
    },
    plugins: {
      'react-hooks': pluginHooks,
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
      'react/no-unescaped-entities': ['error', { forbid: ['>', '}'] }],
      '@stylistic/jsx-one-expression-per-line': 'off',
      ...pluginHooks.configs.recommended.rules,
    },
  },
  {
    files: [
      '**/__tests__/**/*.[jt]s?(x)',
      '**/?(*.)+(spec|test).[jt]s?(x)',
    ],
    ...testingLibrary.configs['flat/react'],
  },
];
