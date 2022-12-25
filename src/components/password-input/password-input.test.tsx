import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { mockMatchMedia } from '../../lib/test-utils';
import { PasswordInput } from './password-input';

beforeEach(() => {
  mockMatchMedia();
});

it('renders without errors', () => {
  const placeholder = 'Enter your password';
  render(<PasswordInput placeholder={placeholder} />);
  screen.getByPlaceholderText(placeholder);
});

it('should toggle password visibility', async () => {
  const user = userEvent.setup();
  const placeholder = 'Enter your password';
  render(<PasswordInput placeholder={placeholder} />);

  const inputEl = screen.getByPlaceholderText(placeholder);
  const buttonEl = screen.getByRole('button');

  await user.click(buttonEl);
  expect(inputEl).toHaveAttribute('type', 'text');

  await user.click(buttonEl);
  expect(inputEl).toHaveAttribute('type', 'password');
});
