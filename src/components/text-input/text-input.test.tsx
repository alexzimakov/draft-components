import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { TextInput } from './text-input';

it('renders without errors', () => {
  const placeholder = 'Email address';
  const { getByPlaceholderText } = render(
    <TextInput placeholder={placeholder} />
  );

  getByPlaceholderText(placeholder);
});

it('should forward extra attrs to underlying <input />', () => {
  const attrs = {
    type: 'email',
    required: true,
    placeholder: 'Email address',
  } as const;
  const { getByPlaceholderText } = render(<TextInput {...attrs} />);
  const inputEl = getByPlaceholderText(attrs.placeholder);

  expect(inputEl).toHaveAttribute('type', attrs.type);
  expect(inputEl).toHaveAttribute('required', '');
  expect(inputEl).toHaveAttribute('placeholder', attrs.placeholder);
});

it('renders with leading add-on', () => {
  const leadingAddOn = 'https://';
  const { getByText } = render(<TextInput leadingAddOn={leadingAddOn} />);

  getByText(leadingAddOn);
});

it('renders with trailing add-on', () => {
  const trailingAddOn = 'USD';
  const { getByText } = render(<TextInput trailingAddOn={trailingAddOn} />);

  getByText(trailingAddOn);
});

it('should invoke `onFocus` and `onBlur` event handlers', () => {
  const testId = 'native-input';
  const onFocus = jest.fn();
  const onBlur = jest.fn();
  const { getByTestId } = render(
    <TextInput data-testid={testId} onFocus={onFocus} onBlur={onBlur} />
  );
  const inputEl = getByTestId(testId);

  inputEl.focus();
  inputEl.blur();

  expect(onFocus).toHaveBeenCalledTimes(1);
  expect(onBlur).toHaveBeenCalledTimes(1);
});

it('invokes `onChange` event handler', () => {
  const onChange = jest.fn();
  render(<TextInput onChange={onChange} />);

  userEvent.paste(screen.getByRole('textbox'), 'lorem');

  expect(onChange).toHaveBeenCalledTimes(1);
});

it('invokes `onChangeValue` with changed value', () => {
  const onChangeValue = jest.fn();
  const expectedValue = 'lorem';
  render(<TextInput onChangeValue={onChangeValue} />);

  userEvent.paste(screen.getByRole('textbox'), expectedValue);

  expect(onChangeValue).toHaveBeenCalledTimes(1);
  expect(onChangeValue).toHaveBeenNthCalledWith(1, expectedValue);
});
