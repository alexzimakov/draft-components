import { beforeAll, expect, it, vitest } from 'vitest';
import { PasswordInput } from './password-input.js';
import { mockMatchMedia } from '../../test/mock-match-media.js';
import { render, screen, userEvent } from '../../test/test-utils.js';

beforeAll(() => {
  mockMatchMedia();
});

it('renders without errors', () => {
  const placeholder = 'Enter your password';
  render(<PasswordInput placeholder={placeholder} />);
  screen.getByPlaceholderText(placeholder);
});

it('renders with custom tooltip text', async () => {
  const user = userEvent.setup();
  const showText = 'Show';
  const hideText = 'Hide';
  const getTooltipText = (visible: boolean) => (visible ? hideText : showText);
  render(<PasswordInput getTooltipText={getTooltipText} />);

  const toggleButton = screen.getByRole('button');

  await user.hover(toggleButton);
  screen.getByText(showText);

  await user.click(toggleButton);
  screen.getByText(hideText);
});

it('renders with custom toggle button icon', async () => {
  const iconTestId = 'custom-icon';
  const icon = <svg role="img" data-testid={iconTestId} />;
  render(<PasswordInput renderToggleButtonIcon={() => icon} />);

  screen.getByTestId(iconTestId);
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

it('should invoke onClickToggleButton callback', async () => {
  const user = userEvent.setup();
  const onClickToggleButtonMock = vitest.fn();
  render(<PasswordInput onClickToggleButton={onClickToggleButtonMock} />);

  await user.click(screen.getByRole('button'));

  expect(onClickToggleButtonMock).toHaveBeenCalledTimes(1);
});
