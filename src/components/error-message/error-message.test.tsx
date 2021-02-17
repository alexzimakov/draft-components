import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { ErrorMessage } from './error-message';

it('<ErrorMessage /> renders without errors', () => {
  const errorText = 'Enter first and last names';
  render(<ErrorMessage>{errorText}</ErrorMessage>);
  screen.getByText(errorText);
  screen.getByTestId('error-message-icon');
});

it('renders without icon', () => {
  render(
    <ErrorMessage shouldShowIcon={false}>
      Enter first and last names
    </ErrorMessage>
  );
  expect(screen.queryByTestId('error-message-icon')).toBeNull();
});
