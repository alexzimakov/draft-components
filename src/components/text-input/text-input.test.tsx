import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { TextInput } from './text-input';

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

it('renders with prefix', () => {
  const prefix = 'USD';
  render(<TextInput prefix={prefix} />);

  screen.getByText(prefix);
});

it('renders with suffix', () => {
  const suffix = 'kg';
  render(<TextInput suffix={suffix} />);

  screen.getByText(suffix);
});

it('renders with prefix and suffix', () => {
  const prefix = '$';
  const suffix = 'per item';
  render(<TextInput prefix={prefix} suffix={suffix} />);

  screen.getByText(prefix);
  screen.getByText(suffix);
});

it('invokes `onChange` event handler', async () => {
  const user = userEvent.setup();
  const placeholder = 'Your name';
  const name = 'John Doe';
  const onChangeMock = jest.fn();
  render(<TextInput placeholder={placeholder} onChange={onChangeMock} />);

  await user.type(screen.getByPlaceholderText(placeholder), name);

  expect(onChangeMock).toHaveBeenCalledTimes(name.length);
});

it('invokes `onChangeValue` callback with changed value', async () => {
  const user = userEvent.setup();
  const placeholder = 'Your name';
  const name = 'John Doe';
  const onChangeValueMock = jest.fn();
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
