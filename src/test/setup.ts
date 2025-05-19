import { afterEach, beforeAll } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { mockResizeObserver } from './mock-resize-observer.js';

beforeAll(() => {
  mockResizeObserver();
});

afterEach(() => {
  cleanup();
});
