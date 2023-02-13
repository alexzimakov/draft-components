import { render, screen } from '@testing-library/react';
import { FormField } from './form-field';

it('renders without errors', () => {
  const id = 'name';
  const label = 'Your name';
  const caption = 'People will be able to find you by this name.';
  render(
    <FormField labelFor={id} label={label} caption={caption}>
      <input id={id} name="name" />
    </FormField>,
  );

  expect(screen.getByLabelText(label)).toBe(screen.getByRole('textbox'));
  screen.getByText(label);
  screen.getByText(caption);
});

it('renders without errors when `children` is a function', () => {
  render(<FormField>{({ id }) => <input id={id} />}</FormField>);

  expect(screen.getByRole('textbox')).toHaveAttribute('id');
});

it('should show an error', () => {
  const caption = 'People will be able to find you this username.';
  const error = 'Username must have at least 5 characters.';
  render(
    <FormField caption={caption} error={error}>
      <input name="username" />
    </FormField>,
  );

  screen.getByText(error);
  expect(screen.queryByText(caption)).toBeNull();
});
