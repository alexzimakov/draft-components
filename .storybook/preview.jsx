import { withThemeByClassName } from '@storybook/addon-themes';
import '../src/components/index.css';
import './preview.css';

export default {
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
    (Story, { viewMode }) => {
      if (
        typeof document !== 'undefined'
        && document.body instanceof HTMLBodyElement
      ) {
        document.body.dataset.viewMode = viewMode;
      }
      return <Story />;
    },
    withThemeByClassName({
      themes: {
        light: 'light',
        dark: 'dark',
      },
      defaultTheme: 'light',
    }),
  ],

  tags: ['autodocs'],
};
