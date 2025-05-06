import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import * as reactHooks from 'eslint-plugin-react-hooks';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import stylistic from '@stylistic/eslint-plugin';
import storybook from 'eslint-plugin-storybook';
import testingLibrary from 'eslint-plugin-testing-library';

/** @type {import('eslint').Linter.Config[]} */
export default defineConfig([
  globalIgnores(['./dist/*', './storybook-static/*', './coverage/*']),
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'], languageOptions: { globals: { ...globals.browser } } },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  pluginReact.configs.flat['jsx-runtime'],
  reactHooks.configs['recommended-latest'],
  jsxA11y.flatConfigs.recommended,
  stylistic.configs.customize({
    arrowParens: true,
    braceStyle: '1tbs',
    indent: 2,
    quotes: 'single',
    semi: true,
  }),
  ...storybook.configs['flat/recommended'],
  {
    settings: {
      react: { version: 'detect' },
    },
    rules: {
      'react/no-unescaped-entities': ['error', { forbid: ['>', '}'] }],
      '@stylistic/jsx-one-expression-per-line': 'off',
    },
  },
  {
    files: [
      '**/__tests__/**/*.[jt]s?(x)',
      '**/?(*.)+(spec|test).[jt]s?(x)',
    ],
    ...testingLibrary.configs['flat/react'],
  },
]);
