import { useEffect } from 'react';
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
    setViewModeAttribute,
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

function setViewModeAttribute(storyFn, context) {
  const viewMode = context.viewMode;

  useEffect(() => {
    if (document.body instanceof HTMLBodyElement) {
      document.body.dataset.viewMode = viewMode;
    }
  }, [viewMode]);

  return storyFn();
}
