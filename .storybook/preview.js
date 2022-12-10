import { useLayoutEffect } from 'react';
import '../src/components/index.css';
import '../src/components/index.dark.css';
import './preview.css';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
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
};

export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'Global theme for components',
    defaultValue: 'light',
    toolbar: {
      icon: 'photo',
      items: [
        { value: 'light', title: 'Light' },
        { value: 'dark', title: 'Dark' },
      ],
      title: true,
      dynamicTitle: true,
    },
  },
};

const withTheme = (storyFn, context) => {
  const theme = context.globals.theme || 'light';

  useLayoutEffect(() => {
    document.body.classList.add(theme);
    return () => {
      document.body.classList.remove(theme);
    };
  }, [theme]);

  return storyFn();
};
export const decorators = [withTheme];
