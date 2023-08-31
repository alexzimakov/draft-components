import { PasswordInput } from './password-input';
import { beforeAll, expect, it } from 'vitest';
import { mockMatchMedia } from '../../test/mock-match-media';
import { render, screen, userEvent } from '../../test/test-utils';

beforeAll(() => {
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
