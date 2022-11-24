import { render, screen } from '@testing-library/react';
import { Spinner } from './spinner';

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
