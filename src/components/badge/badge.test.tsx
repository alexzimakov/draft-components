import { Badge } from './badge';
import { it } from 'vitest';
import { render, screen } from '../../test/test-utils';

it('renders without errors', () => {
  const count = 10;
  render(<Badge>{count}</Badge>);
  screen.getByText(count);
});
