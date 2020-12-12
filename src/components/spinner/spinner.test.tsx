import * as React from 'react';
import { render } from '@testing-library/react';
import { Spinner } from './spinner';

it('renders without errors', () => {
  const title = 'Loading...';
  const { getByTitle } = render(<Spinner title={title} />);

  getByTitle(title);
});

it('renders with custom size', () => {
  const testId = 'spinner';
  const size = 32;
  const { getByTestId } = render(<Spinner data-testid={testId} size={size} />);

  expect(getByTestId(testId)).toHaveStyle({ fontSize: size });
});
