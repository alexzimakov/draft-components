import { render, screen } from '@testing-library/react';
import { FormField } from './form-field';

it('<FormField /> renders without errors', () => {
  const label = 'Username';
  const hint = 'You can use letters, numbers & periods';
  render(
    <FormField label={label} hint={hint}>
      <input />
    </FormField>
  );
  screen.getByRole('textbox');
  screen.getByText(label);
  screen.getByText(hint);
});

it('<FormField /> renders without errors when `children` is a function', () => {
  render(<FormField>{({ id }) => <input id={id} />}</FormField>);
  screen.getByRole('textbox');
});

it('should show a validation error', () => {
  const hint = 'You can use letters, numbers & periods';
  const validationError = 'Invalid input value';
  render(
    <FormField hint={hint} validationError={validationError}>
      <input />
    </FormField>
  );
  screen.getByText(validationError);
  expect(screen.queryByText(hint)).toBeNull();
});
