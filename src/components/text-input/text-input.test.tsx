import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { TextInput } from './text-input';

it('renders without errors', () => {
  const placeholder = 'Email address';
  render(<TextInput placeholder={placeholder} />);
  screen.getByPlaceholderText(placeholder);
});

it('should forward extra attrs to underlying <input />', () => {
  const attrs = {
    type: 'email',
    required: true,
    placeholder: 'Email address',
  } as const;
  render(<TextInput {...attrs} />);
  const inputEl = screen.getByPlaceholderText(attrs.placeholder);

  expect(inputEl).toHaveAttribute('type', attrs.type);
  expect(inputEl).toHaveAttribute('required', '');
  expect(inputEl).toHaveAttribute('placeholder', attrs.placeholder);
});

it('renders with leading add-on', () => {
  const leadingAddOn = 'https://';
  render(<TextInput leadingAddOn={leadingAddOn} />);

  screen.getByText(leadingAddOn);
});

it('renders with trailing add-on', () => {
  const trailingAddOn = 'USD';
  render(<TextInput trailingAddOn={trailingAddOn} />);

  screen.getByText(trailingAddOn);
});

it('should invoke `onFocus` and `onBlur` event handlers', () => {
  const testId = 'native-input';
  const onFocus = jest.fn();
  const onBlur = jest.fn();
  render(<TextInput data-testid={testId} onFocus={onFocus} onBlur={onBlur} />);
  const inputEl = screen.getByTestId(testId);

  inputEl.focus();
  inputEl.blur();

  expect(onFocus).toHaveBeenCalledTimes(1);
  expect(onBlur).toHaveBeenCalledTimes(1);
});

it('invokes `onChange` event handler', async () => {
  const user = userEvent.setup();
  const onChange = jest.fn();
  render(<TextInput onChange={onChange} />);

  await user.click(screen.getByRole('textbox'));
  await user.paste('lorem');

  expect(onChange).toHaveBeenCalledTimes(1);
});

it('invokes `onChangeValue` with changed value', async () => {
  const user = userEvent.setup();
  const onChangeValue = jest.fn();
  const expectedValue = 'lorem';
  render(<TextInput onChangeValue={onChangeValue} />);

  await user.click(screen.getByRole('textbox'));
  await user.paste(expectedValue);

  expect(onChangeValue).toHaveBeenCalledTimes(1);
  expect(onChangeValue).toHaveBeenNthCalledWith(1, expectedValue);
});
