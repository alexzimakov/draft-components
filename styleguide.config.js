const fs = require('fs');
const path = require('path');

module.exports = {
  components: getComponentsPaths('src/components'),
  skipComponentsWithoutExample: true,
  title: 'Draft Components',
  webpackConfig: {
    module: {
      rules: [
        {
          test: /\.(ts|tsx)?$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
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
