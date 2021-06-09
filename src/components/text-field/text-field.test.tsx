import { render } from '@testing-library/react';
import { TextField } from './text-field';

it('renders without errors', () => {
  const placeholder = 'Email address';
  const { getByPlaceholderText } = render(
    <TextField placeholder={placeholder} />
  );

  getByPlaceholderText(placeholder);
});

it('should forward extra attrs to underlying <input />', () => {
  const attrs = {
    type: 'email',
    required: true,
    placeholder: 'Email address',
  } as const;
  const { getByPlaceholderText } = render(<TextField {...attrs} />);
  const inputEl = getByPlaceholderText(attrs.placeholder);

  expect(inputEl).toHaveAttribute('type', attrs.type);
  expect(inputEl).toHaveAttribute('required', '');
  expect(inputEl).toHaveAttribute('placeholder', attrs.placeholder);
});

it('renders with leading add-on', () => {
  const leadingAddOn = 'https://';
  const { getByText } = render(<TextField leadingAddOn={leadingAddOn} />);

  getByText(leadingAddOn);
});

it('renders with trailing add-on', () => {
  const trailingAddOn = 'USD';
  const { getByText } = render(<TextField trailingAddOn={trailingAddOn} />);

  getByText(trailingAddOn);
});

it('should invoke `onFocus` and `onBlur` event handlers', () => {
  const testId = 'native-input';
  const onFocus = jest.fn();
  const onBlur = jest.fn();
  const { getByTestId } = render(
    <TextField data-testid={testId} onFocus={onFocus} onBlur={onBlur} />
  );
  const inputEl = getByTestId(testId);

  inputEl.focus();
  inputEl.blur();

  expect(onFocus).toHaveBeenCalledTimes(1);
  expect(onBlur).toHaveBeenCalledTimes(1);
});
