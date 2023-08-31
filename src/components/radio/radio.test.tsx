import { Radio } from './radio';
import { expect, it, vi } from 'vitest';
import { render, screen, userEvent } from '../../test/test-utils';

it('renders without errors', () => {
  const ariaLabel = 'Private access';
  render(<Radio aria-label={ariaLabel} />);

  screen.getByLabelText(ariaLabel);
});

it('should forward extra attrs to underlying <input />', () => {
  const ariaLabel = 'Private access';
  const attrs = { name: 'access', value: 'private' };
  render(<Radio aria-label={ariaLabel} {...attrs} />);

  const inputEl = screen.getByLabelText(ariaLabel);
  expect(inputEl).toHaveAttribute('name', attrs.name);
  expect(inputEl).toHaveAttribute('value', attrs.value);
});

it('renders with check icon', () => {
  render(<Radio defaultChecked={true} icon="check" />);

  screen.getByTestId('radio-check-icon');
});

it('invokes `onChange` event handler', async () => {
  const user = userEvent.setup();
  const onChangeMock = vi.fn();
  render(<Radio onChange={onChangeMock} />);

  await user.click(screen.getByTestId('radio-check'));

  expect(onChangeMock).toHaveBeenCalledTimes(1);
});

it('invokes `onToggle` callback with checked flag', async () => {
  const user = userEvent.setup();
  const onToggleMock = vi.fn();
  render(<Radio onToggle={onToggleMock} />);

  const checkEl = screen.getByTestId('radio-check');
  await user.click(checkEl);

  expect(onToggleMock).toHaveBeenCalledTimes(1);
  expect(onToggleMock).toHaveBeenNthCalledWith(1, true);
});
