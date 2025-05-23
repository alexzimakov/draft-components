import { type Preview } from '@storybook/react';
import { withThemeByClassName } from '@storybook/addon-themes';
import '../src/components/index.css';
import './preview.css';

const preview: Preview = {
  parameters: {
    actions: {
      argTypesRegex: '^on[A-Z].*',
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    backgrounds: {
      disable: true,
    },
    grid: {
      cellSize: 16,
    },
  },

  decorators: [
    withThemeByClassName({
      themes: {
        dark: 'dark',
        light: 'light',
      },
      defaultTheme: 'light',
    }),
  ],

  tags: ['autodocs'],
};

export default preview;
