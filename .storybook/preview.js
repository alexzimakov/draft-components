import { useLayoutEffect } from 'react';
import '../src/components/index.css';
import '../src/components/index.dark.css';
import './preview.css';

const withTheme = (storyFn, context) => {
  const viewMode = context.viewMode;
  const theme = context.globals.theme || 'light';

  useLayoutEffect(() => {
    const className = 'dc-story-doc';
    const body = document.body;
    const docs = document.querySelectorAll('.docs-story');

    body.classList.add(theme);
    for (const doc of docs) {
      doc.classList.add(className);
    }
    return () => {
      body.classList.remove(theme);
      for (const doc of docs) {
        doc.classList.remove(className);
      }
    };
  }, [viewMode, theme]);

  return storyFn();
};

const preview = {
  parameters: {
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
  },

  globalTypes: {
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
  },

  decorators: [withTheme],
};

export default preview;
