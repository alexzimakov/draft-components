import { TextInput } from './text-input';
import { expect, it, vi } from 'vitest';
import { render, screen, userEvent } from '../../test/test-utils';

it('renders without errors', () => {
  const placeholder = 'Your name';
  render(<TextInput placeholder={placeholder} />);

  screen.getByPlaceholderText(placeholder);
});

it('should forward extra props to underlying <input />', () => {
  const attrs = {
    type: 'email' as const,
    placeholder: 'Your email',
    required: true,
  };
  render(<TextInput {...attrs} />);
  const inputEl = screen.getByPlaceholderText(attrs.placeholder);

  expect(inputEl).toHaveAttribute('type', attrs.type);
  expect(inputEl).toHaveAttribute('required', '');
  expect(inputEl).toHaveAttribute('placeholder', attrs.placeholder);
});

it('renders with left add-on', () => {
  const prefix = 'USD';
  render(<TextInput leftAddOn={prefix} />);

  screen.getByText(prefix);
});

it('renders with right add-on', () => {
  const suffix = 'kg';
  render(<TextInput rightAddOn={suffix} />);

  screen.getByText(suffix);
});

it('renders with left and right add-on', () => {
  const prefix = '$';
  const suffix = 'per item';
  render(<TextInput leftAddOn={prefix} rightAddOn={suffix} />);

  screen.getByText(prefix);
  screen.getByText(suffix);
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
