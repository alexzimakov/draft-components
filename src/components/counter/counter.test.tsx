import { render, screen } from '@testing-library/react';
import { Counter } from './counter';

it('renders without errors', () => {
  const count = 10;
  render(<Counter>{count}</Counter>);
  screen.getByText(count);
});
