import * as React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { PasswordField } from './password-field';

it('renders without errors', () => {
  const placeholder = 'Search';
  render(<PasswordField placeholder={placeholder} />);

  screen.getByPlaceholderText(placeholder);
});

it('should toggle password visibility', () => {
  const placeholder = 'Search';
  const showPasswordA11yTitle = 'Show password';
  const hidePasswordA11yTitle = 'Hide password';
  render(
    <PasswordField
      placeholder={placeholder}
      showPasswordA11yTitle={showPasswordA11yTitle}
      hidePasswordA11yTitle={hidePasswordA11yTitle}
    />
  );

  const inputEl = screen.getByPlaceholderText(placeholder);

  fireEvent.click(screen.getByTitle(showPasswordA11yTitle));
  expect(inputEl).toHaveAttribute('type', 'text');

  fireEvent.click(screen.getByTitle(hidePasswordA11yTitle));
  expect(inputEl).toHaveAttribute('type', 'password');
});
