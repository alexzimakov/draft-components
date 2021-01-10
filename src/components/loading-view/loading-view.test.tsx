import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { LoadingView } from './loading-view';

it('renders without errors', () => {
  const children = 'Loading examples...';
  render(<LoadingView>{children}</LoadingView>);

  screen.getByText(children);
});
