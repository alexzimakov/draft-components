const path = require('path');

module.exports = {
  pagePerSection: true,
  sections: [
    {
      name: 'General',
      components: getComponents(
        'formatted-content',
        'label',
        'inline-message',
        'spinner'
      ),
    },
    {
      name: 'Icons',
      components: getComponents('svg-icon'),
    },
    {
      name: 'Layout',
      components: getComponents('box'),
    },
    {
      name: 'Data display',
      components: getComponents('avatar', 'tag', 'tooltip', 'table'),
    },
    {
      name: 'Controls',
      components: getComponents(
        'button',
        'icon-button',
        'buttons-group',
        'actions-group',
        'text-field',
        'search-field',
        'password-field',
        'datetime-field',
        'select',
        'textarea',
        'checkbox',
        'radio-button',
        'switch',
        'field-group'
      ),
    },
    {
      name: 'Navigation',
      components: getComponents(
        'breadcrumbs',
        'segmented-control',
        'scope-buttons'
      ),
    },
    {
      name: 'Feedback',
      components: getComponents(
        'alert',
        'banner',
        'dialog',
        'popover',
        'loading-view',
        'non-ideal-state-view'
      ),
    },
  ],
  require: [
    path.join(__dirname, 'src/styles/draft-components.scss'),
    path.join(__dirname, 'src/styleguide/styleguide-styles.scss'),
  ],
  skipComponentsWithoutExample: true,
  styleguideDir: 'docs',
  theme: {
    fontFamily: {
      base: 'var(--dc-font-base)',
    },
  },
  title: 'Draft Components',
  webpackConfig: {
    module: {
      rules: [
        {
          test: /\.(ts|tsx)?$/,
          exclude: /node_modules/,
          use: 'babel-loader',
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            'style-loader',
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: ['autoprefixer'],
                },
              },
            },
            'sass-loader',
          ],
        },
      ],
    },
  },
};

/**
 * Returns array of paths to components.
 * @param {string} names - The component names.
 * @returns {string[]}
 */
function getComponents(...names) {
  return names.map((name) => `src/components/${name}/${name}.tsx`);
}
