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

const lightThemeStyle = { color: '#111827', backgroundColor: '#fff' };
const darkThemeStyle = { color: '#fff', backgroundColor: '#111827' };
const withTheme = (storyFn, context) => {
  const theme = context.globals.theme || 'light';

  useLayoutEffect(() => {
    const body = document.body;
    const style = theme === 'light' ? lightThemeStyle : darkThemeStyle;
    body.classList.add(theme);
    body.dataset.theme = theme;
    body.style.transition = 'color .3s, background-color .3s';
    body.style.color = style.color;
    body.style.backgroundColor = style.backgroundColor;

    return () => {
      body.classList.remove(theme);
      delete body.dataset.theme;
      delete body.style.transition;
      delete body.style.color;
      delete body.style.backgroundColor;
    };
  }, [theme]);

  return storyFn();
};
export const decorators = [withTheme];
