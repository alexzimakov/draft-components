import { afterEach, beforeAll } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { mockElementAnimate } from './mock-element-animate.js';

beforeAll(() => {
  mockElementAnimate();
});

afterEach(() => {
  cleanup();
});
