import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: 'src/test/setup.ts',
    coverage: {
      provider: 'istanbul',
      exclude: [
        'src/styleguide/**',
        'src/storybook/**',
        'src/test/**',
      ],
    },
  },
});
