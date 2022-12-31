import { render, screen } from '@testing-library/react';
import { Badge } from './badge';

it('renders without errors', () => {
  const count = 10;
  render(<Badge>{count}</Badge>);
  screen.getByText(count);
});
