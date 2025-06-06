import { type StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  core: {
    disableTelemetry: true,
  },
  stories: [
    '../src/**/*.mdx',
    '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-themes',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
};

export default config;
