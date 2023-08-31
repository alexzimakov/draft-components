import { Checkbox } from './checkbox';
import { expect, it, vi } from 'vitest';
import { render, screen, userEvent } from '../../test/test-utils';

it('renders without errors', () => {
  const ariaLabel = 'Enable Location Services';
  render(<Checkbox aria-label={ariaLabel} />);

  screen.getByLabelText(ariaLabel);
});

it('should forward extra attrs to underlying <input />', () => {
  const ariaLabel = 'Enable Location Services';
  const attrs = { name: 'locationServices', value: 'enabled' };
  render(<Checkbox aria-label={ariaLabel} {...attrs} />);

  const inputEl = screen.getByLabelText(ariaLabel);
  expect(inputEl).toHaveAttribute('name', attrs.name);
  expect(inputEl).toHaveAttribute('value', attrs.value);
});

it('renders with dash icon', () => {
  render(<Checkbox defaultChecked={true} hasMixedState={true} />);

  screen.getByTestId('checkbox-dash-icon');
});

it('invokes `onChange` event handler', async () => {
  const user = userEvent.setup();
  const onChangeMock = vi.fn();
  render(<Checkbox onChange={onChangeMock} />);

  await user.click(screen.getByTestId('checkbox-check'));

  expect(onChangeMock).toHaveBeenCalledTimes(1);
});

it('invokes `onToggle` callback with checked flag', async () => {
  const user = userEvent.setup();
  const onToggleMock = vi.fn();
  render(<Checkbox onToggle={onToggleMock} />);

  const checkEl = screen.getByTestId('checkbox-check');
  await user.click(checkEl);
  await user.click(checkEl);

  expect(onToggleMock).toHaveBeenCalledTimes(2);
  expect(onToggleMock).toHaveBeenNthCalledWith(1, true);
  expect(onToggleMock).toHaveBeenNthCalledWith(2, false);
});
