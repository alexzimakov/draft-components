import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { FieldGroup } from './field-group';

it('<FieldGroup /> renders without errors', () => {
  const label = 'Username';
  const hint = 'You can use letters, numbers & periods';
  render(
    <FieldGroup label={label} hint={hint}>
      <input />
    </FieldGroup>
  );
  screen.getByRole('textbox');
  screen.getByText(label);
  screen.getByText(hint);
});

it('<FieldGroup /> renders without errors when `children` is a function', () => {
  render(<FieldGroup>{({ id }) => <input id={id} />}</FieldGroup>);
  screen.getByRole('textbox');
});

it('should show a validation error', () => {
  const hint = 'You can use letters, numbers & periods';
  const validationError = 'Invalid input value';
  render(
    <FieldGroup hint={hint} validationError={validationError}>
      <input />
    </FieldGroup>
  );
  screen.getByText(validationError);
  expect(screen.queryByText(hint)).toBeNull();
});
