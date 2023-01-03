/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/en/configuration.html
 */

module.exports = {
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
