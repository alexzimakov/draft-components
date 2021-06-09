import { render, screen } from '@testing-library/react';
import { Spinner } from './spinner';

it('renders without errors', () => {
  const testId = 'spinner';
  render(<Spinner data-testid={testId} />);

  screen.getByTestId(testId);
});

it('renders with custom size', () => {
  const testId = 'spinner';
  const size = 32;
  render(<Spinner data-testid={testId} size={size} />);

  expect(screen.getByTestId(testId)).toHaveStyle({ fontSize: size });
});
