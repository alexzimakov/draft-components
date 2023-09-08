import { it } from 'vitest';
import { Label } from './label.js';
import { render, screen } from '../../test/test-utils.js';

it('<Label /> renders without errors', () => {
  const text = 'Username';
  render(<Label>{text}</Label>);
  screen.getByText(text);
});
