/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/en/configuration.html
 */

/** @type {import('jest').Config} */
const config = {
  collectCoverageFrom: [
    '**/*.{ts,tsx}',
    '!**/index.*',
    '!**/*.stories.{ts,tsx}',
  ],
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/src/styleguide/',
    '/src/storybook/',
    '/src/tests/',
  ],
  coverageProvider: 'babel',
  roots: ['src'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
};

export default config;
