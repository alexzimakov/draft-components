import { it } from 'vitest';
import { Badge } from './badge.js';
import { render, screen } from '../../test/test-utils.js';

it('renders without errors', () => {
  const count = 10;
  render(<Badge>{count}</Badge>);
  screen.getByText(count);
});
