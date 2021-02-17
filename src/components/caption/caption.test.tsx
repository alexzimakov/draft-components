import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { Caption } from './caption';

it('<Caption /> renders without errors', () => {
  const text = 'You can use letters, numbers & periods';
  render(<Caption>{text}</Caption>);
  screen.getByText(text);
});
