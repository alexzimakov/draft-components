import * as React from 'react';
import { render } from '@testing-library/react';
import { TextField } from './text-field';

describe('<TextField /> component', () => {
  it('should forward extra attrs to underlying <input />', () => {
    const placeholder = 'Enter text';
    const extraAttrs = {
      'data-testid': 'native-input',
      'aria-label': 'Address',
    };
    const { getByPlaceholderText } = render(
      <TextField placeholder={placeholder} {...extraAttrs} />
    );
    const inputEl = getByPlaceholderText(placeholder);

    Object.entries(extraAttrs).forEach(([attr, value]) => {
      expect(inputEl).toHaveAttribute(attr, value);
    });
  });

  it('renders with leading add-on', () => {
    const leadingAddOn = 'https://';
    const { queryByText } = render(<TextField leadingAddOn={leadingAddOn} />);

    expect(queryByText(leadingAddOn)).not.toBeNull();
  });

  it('renders with trailing add-on', () => {
    const trailingAddOn = 'USD';
    const { queryByText } = render(<TextField trailingAddOn={trailingAddOn} />);

    expect(queryByText(trailingAddOn)).not.toBeNull();
  });

  it('should call `onFocus` and `onBlur` event handlers', () => {
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
});
