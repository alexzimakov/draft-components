import { afterEach, beforeAll } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { mockElementAnimate } from './mock-element-animate.js';
import { mockResizeObserver } from './mock-resize-observer.js';

beforeAll(() => {
  mockResizeObserver();
  mockElementAnimate();
});

afterEach(() => {
  cleanup();
});
