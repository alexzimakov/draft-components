const fs = require('fs');
const path = require('path');

module.exports = {
  components: getComponentsPaths('src/components'),
  require: [path.join(__dirname, 'src/styles/draft-components.scss')],
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
          use: ['style-loader', 'css-loader', 'sass-loader'],
        },
      ],
    },
  },
};

/**
 * Returns array of paths to components.
 * @param {string} componentsDirectory - The path to a directory where components are located.
 * @returns {string[]}
 */
function getComponentsPaths(componentsDirectory) {
  return fs
    .readdirSync(componentsDirectory)
    .filter((filename) => {
      if (filename.startsWith('.')) {
        return false;
      }
      const stats = fs.statSync(path.join(componentsDirectory, filename));
      return stats.isDirectory();
    })
    .map((directoryName) =>
      path.join(componentsDirectory, directoryName, `${directoryName}.tsx`)
    );
}
