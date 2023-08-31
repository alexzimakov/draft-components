import { expect } from 'vitest';
import { TestingLibraryMatchers } from '@testing-library/jest-dom/types/matchers';
import * as matchers from '@testing-library/jest-dom/matchers';

declare module '@vitest/expect' {
  interface JestAssertion<T> extends TestingLibraryMatchers<
    ReturnType<typeof expect.stringContaining>,
    T
  > {}
}

expect.extend(matchers);
