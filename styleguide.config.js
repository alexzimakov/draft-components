const path = require('path');

module.exports = {
  sections: [
    {
      name: 'General',
      components: getComponents(
        'formatted-content',
        'label',
        'caption',
        'error-message',
        'svg-icon',
        'spinner'
      ),
    },
    {
      name: 'Layout',
      components: getComponents('box'),
    },
    {
      name: 'Data display',
      components: getComponents('avatar'),
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
        'select',
        'textarea',
        'checkbox',
        'switch',
        'radio',
        'field-group'
      ),
    },
    {
      name: 'Navigation',
      components: getComponents('breadcrumbs', 'segmented-control'),
    },
    {
      name: 'Feedback',
      components: getComponents(
        'alert',
        'banner',
        'dialog',
        'loading-view',
        'non-ideal-state-view'
      ),
    },
  ],
  require: [
    path.join(__dirname, 'src/styles/draft-components.scss'),
    path.join(__dirname, 'src/styleguide/styles.scss'),
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
