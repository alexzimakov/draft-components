/**
 * @type {import('@storybook/core-common').StorybookConfig}
 */
const config = {
  core: {
    builder: '@storybook/builder-vite',
    disableTelemetry: true,
  },
  stories: [
    '../src/**/*.stories.mdx',
    '../src/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
  ],
  framework: '@storybook/react',
};

module.exports = config;
