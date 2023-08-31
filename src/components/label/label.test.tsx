import { Label } from './label';
import { it } from 'vitest';
import { render, screen } from '../../test/test-utils';

it('<Label /> renders without errors', () => {
  const text = 'Username';
  render(<Label>{text}</Label>);
  screen.getByText(text);
});
