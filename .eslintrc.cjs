module.exports = {
  root: true,
  parserOptions: {
    sourceType: 'module',
  },
  env: {
    es2021: true,
    node: true,
    browser: true,
  },
  extends: ['@alexzimakov/eslint-config'],

  overrides: [
    {
      files: ['src/**/*.[jt]s?(x)'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
      plugins: [
        '@typescript-eslint',
        'react',
        'react-hooks',
        'jsx-a11y',
        'storybook',
      ],
      extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
        'plugin:react/jsx-runtime',
        'plugin:react-hooks/recommended',
        'plugin:storybook/recommended',
      ],
      settings: {
        react: {
          version: 'detect',
        },
      },
      rules: {
        'no-use-before-define': 'off',
        '@typescript-eslint/no-use-before-define': ['error', {
          functions: false,
          classes: false,
          typedefs: false,
          ignoreTypeReferences: true,
        }],

        'react/no-unescaped-entities': ['error', { forbid: ['>', '}'] }],

        // https://github.com/facebook/create-react-app/blob/main/packages/eslint-config-react-app/index.js#L260
        'jsx-a11y/alt-text': 'warn',
        'jsx-a11y/anchor-has-content': 'warn',
        'jsx-a11y/anchor-is-valid': ['warn', {
          aspects: ['noHref', 'invalidHref'],
        }],
        'jsx-a11y/aria-activedescendant-has-tabindex': 'warn',
        'jsx-a11y/aria-props': 'warn',
        'jsx-a11y/aria-proptypes': 'warn',
        'jsx-a11y/aria-role': ['warn', { ignoreNonDOM: true }],
        'jsx-a11y/aria-unsupported-elements': 'warn',
        'jsx-a11y/autocomplete-valid': 'warn',
        'jsx-a11y/heading-has-content': 'warn',
        'jsx-a11y/iframe-has-title': 'warn',
        'jsx-a11y/img-redundant-alt': 'warn',
        'jsx-a11y/no-access-key': 'warn',
        'jsx-a11y/no-distracting-elements': 'warn',
        'jsx-a11y/no-redundant-roles': 'warn',
        'jsx-a11y/role-has-required-aria-props': 'warn',
        'jsx-a11y/role-supports-aria-props': 'warn',
        'jsx-a11y/scope': 'warn',
      },
    },

    {
      // https://github.com/testing-library/eslint-plugin-testing-library#run-the-plugin-only-against-test-files
      files: [
        'src/**/__tests__/**/*.[jt]s?(x)',
        'src/**/?(*.)+(spec|test).[jt]s?(x)',
      ],
      env: { jest: true },
      extends: ['plugin:testing-library/react'],
    },

    {
      files: ['.storybook/preview.js?(x)'],
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },

    {
      files: ['**/*.cjs'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
};
