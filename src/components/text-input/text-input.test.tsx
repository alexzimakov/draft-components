import { expect, it, vi } from 'vitest';
import { TextInput } from './text-input.js';
import { render, screen, userEvent } from '../../test/test-utils.js';

it('renders without errors', () => {
  const placeholder = 'Your name';
  render(<TextInput placeholder={placeholder} />);

  screen.getByPlaceholderText(placeholder);
});

it('should forward extra props to the native input', () => {
  const attrs = {
    'type': 'email' as const,
    'placeholder': 'Your email',
    'required': true,
    'data-test': 'foo',
  };
  render(<TextInput {...attrs} />);
  const inputEl = screen.getByPlaceholderText(attrs.placeholder);

  expect(inputEl).toHaveAttribute('type', attrs.type);
  expect(inputEl).toHaveAttribute('required', '');
  expect(inputEl).toHaveAttribute('placeholder', attrs.placeholder);
  expect(inputEl).toHaveAttribute('data-test', attrs['data-test']);
});

it('renders with slot left', () => {
  const slot = 'USD';
  render(<TextInput slotLeft={slot} />);

  screen.getByText(slot);
});

it('renders with slot right', () => {
  const slot = 'kg';
  render(<TextInput slotRight={slot} />);

  screen.getByText(slot);
});

it('renders with both slots', () => {
  const slotLeft = '$';
  const slotRight = 'per item';
  render(<TextInput slotLeft={slotLeft} slotRight={slotRight} />);

  screen.getByText(slotLeft);
  screen.getByText(slotRight);
});

it('invokes `onChange` event handler', async () => {
  const user = userEvent.setup();
  const placeholder = 'Your name';
  const name = 'John Doe';
  const onChangeMock = vi.fn();
  render(<TextInput placeholder={placeholder} onChange={onChangeMock} />);

  await user.type(screen.getByPlaceholderText(placeholder), name);

  expect(onChangeMock).toHaveBeenCalledTimes(name.length);
});

it('invokes `onChangeValue` callback with changed value', async () => {
  const user = userEvent.setup();
  const placeholder = 'Your name';
  const name = 'John Doe';
  const onChangeValueMock = vi.fn();
  render(<TextInput
    placeholder={placeholder}
    onChangeValue={onChangeValueMock}
  />);

  await user.type(screen.getByPlaceholderText(placeholder), name);

  expect(onChangeValueMock).toHaveBeenCalledTimes(name.length);
  for (let n = 1; n <= name.length; n += 1) {
    const value = name.slice(0, n);
    expect(onChangeValueMock).toHaveBeenNthCalledWith(n, value);
  }
});
