import {
  mergeConfig,
  defineConfig,
  coverageConfigDefaults,
} from 'vitest/config';
import viteConfig from './vite.config.ts';

export default mergeConfig(viteConfig, defineConfig({
  test: {
    include: ['src/**/*.{test,spec}.?(c|m)[jt]s?(x)'],
    environment: 'jsdom',
    setupFiles: 'src/test/setup.ts',
    coverage: {
      include: ['src/**'],
      exclude: [
        ...coverageConfigDefaults.exclude,
        '**/*.stories.?(c|m)[jt]s?(x)',
        'src/test/**',
        'src/storybook/**',
      ],
      provider: 'istanbul',
    },
  },
}));
