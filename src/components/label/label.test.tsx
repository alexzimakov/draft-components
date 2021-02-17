import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { Label } from './label';

it('<Label /> renders without errors', () => {
  const text = 'Username';
  render(<Label>{text}</Label>);
  screen.getByText(text);
});
