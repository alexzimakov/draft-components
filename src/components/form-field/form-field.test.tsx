import { expect, it } from 'vitest';
import { FormField } from './form-field.js';
import { render, screen } from '../../test/test-utils.js';

it('renders without errors', () => {
  const label = 'Username';
  const inputId = 'username';
  render(
    <FormField label={label} labelFor={inputId}>
      <input id={inputId} name="username" />
    </FormField>,
  );

  expect(screen.getByLabelText(label)).toBe(screen.getByRole('textbox'));
  screen.getByText(label);
});

it('renders with hint', () => {
  const hint = 'People will be able to find you this username.';
  render(
    <FormField hint={hint}>
      <input name="username" />
    </FormField>,
  );

  screen.getByText(hint);
});

it('renders with validation error', () => {
  const error = 'Username must only include letters a to z';
  const hint = 'People will be able to find you this username.';
  render(
    <FormField hint={hint} error={error}>
      <input name="username" />
    </FormField>,
  );

  screen.getByText(error);
  screen.getByText(hint);
});

it('renders without errors when `children` is a function', () => {
  const inputId = 'username';
  render(
    <FormField
      label="Username"
      labelFor={inputId}
      hint="People will be able to find you this username"
      error="Username must only include letters a to z"
      required={true}
    >
      {(props) => (
        <input
          id={props.id}
          required={props.required}
          aria-invalid={props.invalid}
          aria-describedby={props.describedBy.join(' ')}
        />
      )}
    </FormField>,
  );

  const inputElement = screen.getByRole('textbox');
  expect(inputElement).toHaveAttribute('id');
  expect(inputElement).toHaveAttribute('required');
  expect(inputElement).toHaveAttribute('aria-invalid', 'true');
  expect(inputElement).toHaveAttribute('aria-describedby', `${inputId}-hint ${inputId}-error`);
});
