import { expect, it } from 'vitest';
import { Spinner } from './spinner.js';
import { render, screen } from '../../test/test-utils.js';

it('renders without errors', () => {
  const testId = 'spinner';
  render(<Spinner data-testid={testId} />);

  screen.getByTestId(testId);
});

it('renders with custom size', () => {
  const testId = 'spinner';
  const size = '1em';
  render(<Spinner data-testid={testId} size={size} />);

  const spinner = screen.getByTestId(testId);
  expect(spinner).toHaveAttribute('width', size);
  expect(spinner).toHaveAttribute('height', size);
});
