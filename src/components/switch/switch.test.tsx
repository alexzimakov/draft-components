import { Switch } from './switch';
import { expect, it, vi } from 'vitest';
import { render, screen, userEvent } from '../../test/test-utils';

it('renders without errors', () => {
  const ariaLabel = 'Enable Location Services';
  render(<Switch aria-label={ariaLabel} />);

  screen.getByLabelText(ariaLabel);
});

it('should forward extra attrs to underlying <input />', () => {
  const ariaLabel = 'Enable Location Services';
  const attrs = { name: 'locationServices', value: 'enabled' };
  render(<Switch aria-label={ariaLabel} {...attrs} />);

  const inputEl = screen.getByLabelText(ariaLabel);
  expect(inputEl).toHaveAttribute('name', attrs.name);
  expect(inputEl).toHaveAttribute('value', attrs.value);
});

it('renders with check icon', () => {
  render(<Switch showCheckIcon={true} />);

  screen.getByTestId('switch-check-icon');
});

it('invokes `onChange` event handler', async () => {
  const user = userEvent.setup();
  const onChangeMock = vi.fn();
  render(<Switch onChange={onChangeMock} />);

  await user.click(screen.getByTestId('switch-track'));

  expect(onChangeMock).toHaveBeenCalledTimes(1);
});

it('invokes `onToggle` callback with checked flag', async () => {
  const user = userEvent.setup();
  const onToggleMock = vi.fn();
  render(<Switch onToggle={onToggleMock} />);

  const trackEl = screen.getByTestId('switch-track');
  await user.click(trackEl);
  await user.click(trackEl);

  expect(onToggleMock).toHaveBeenCalledTimes(2);
  expect(onToggleMock).toHaveBeenNthCalledWith(1, true);
  expect(onToggleMock).toHaveBeenNthCalledWith(2, false);
});
