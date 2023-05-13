/**
 * @type {import('@storybook/core-common').StorybookConfig}
 */
const config = {
  core: {
    disableTelemetry: true
  },
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  framework: {
    name: '@storybook/react-vite',
    options: {}
  },
  docs: {
    autodocs: true
  }
};
module.exports = config;