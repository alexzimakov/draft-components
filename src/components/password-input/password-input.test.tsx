import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { PasswordInput } from './password-input';

it('renders without errors', () => {
  const placeholder = 'Search';
  render(<PasswordInput placeholder={placeholder} />);

  screen.getByPlaceholderText(placeholder);
});

it('should toggle password visibility', async () => {
  const user = userEvent.setup();
  const placeholder = 'Search';
  const showPasswordA11yTitle = 'Show password';
  const hidePasswordA11yTitle = 'Hide password';
  render(
    <PasswordInput
      placeholder={placeholder}
      showPasswordAriaTitle={showPasswordA11yTitle}
      hidePasswordAriaTitle={hidePasswordA11yTitle}
    />
  );

  const inputEl = screen.getByPlaceholderText(placeholder);

  await user.click(screen.getByTitle(showPasswordA11yTitle));
  expect(inputEl).toHaveAttribute('type', 'text');

  await user.click(screen.getByTitle(hidePasswordA11yTitle));
  expect(inputEl).toHaveAttribute('type', 'password');
});
