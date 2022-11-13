import userEvent from '@testing-library/user-event';
import { NumberInput } from './number-input';
import { fireEvent, render, screen } from '@testing-library/react';

it('renders without errors', () => {
  const placeholder = 'Enter a number';
  render(
    <NumberInput placeholder={placeholder} value="" onChangeValue={jest.fn()} />
  );

  const [decrementButton, incrementButton] = screen.getAllByRole('button');
  expect(decrementButton).toHaveTextContent('↓');
  expect(incrementButton).toHaveTextContent('↑');
  screen.getByPlaceholderText(placeholder);
});

it('renders with custom buttons labels', () => {
  const incrementButtonLabel = '+1';
  const decrementButtonLabel = '-1';
  render(
    <NumberInput
      incrementButtonLabel={incrementButtonLabel}
      decrementButtonLabel={decrementButtonLabel}
      value=""
      onChangeValue={jest.fn()}
    />
  );

  const [decrementButton, incrementButton] = screen.getAllByRole('button');
  expect(decrementButton).toHaveTextContent(decrementButtonLabel);
  expect(incrementButton).toHaveTextContent(incrementButtonLabel);
});

it('renders without increment/decrement buttons', () => {
  const incrementButtonLabel = '+1';
  const decrementButtonLabel = '-1';
  render(
    <NumberInput
      showIncrementButtons={false}
      incrementButtonLabel={incrementButtonLabel}
      decrementButtonLabel={decrementButtonLabel}
      value=""
      onChangeValue={jest.fn()}
    />
  );

  expect(screen.queryByText(incrementButtonLabel)).toBeNull();
  expect(screen.queryByText(decrementButtonLabel)).toBeNull();
});

it('invokes `onChange` event handler', () => {
  const onChange = jest.fn();
  render(
    <NumberInput value="10" onChangeValue={jest.fn()} onChange={onChange} />
  );

  userEvent.paste(screen.getByRole('textbox'), '10');

  expect(onChange).toHaveBeenCalledTimes(1);
});

it('invokes `onChangeValue` callback when entering a correct number', () => {
  const invalidNumber = 'one hundred';
  const integer = '100';
  const float = '1.5';
  const negativeInteger = '-20';
  const negativeFloat = '-0.8';
  const onChangeValue = jest.fn();
  const { rerender } = render(
    <NumberInput value="" onChangeValue={onChangeValue} />
  );

  const input = screen.getByRole('textbox');

  userEvent.paste(input, invalidNumber);
  userEvent.paste(input, integer);
  userEvent.paste(input, float);
  userEvent.paste(input, negativeInteger);
  userEvent.paste(input, negativeFloat);

  rerender(<NumberInput value="1" onChangeValue={onChangeValue} />);
  userEvent.clear(input);

  expect(onChangeValue).toHaveBeenCalledTimes(5);
  expect(onChangeValue).toHaveBeenNthCalledWith(1, integer);
  expect(onChangeValue).toHaveBeenNthCalledWith(2, float);
  expect(onChangeValue).toHaveBeenNthCalledWith(3, negativeInteger);
  expect(onChangeValue).toHaveBeenNthCalledWith(4, negativeFloat);
  expect(onChangeValue).toHaveBeenNthCalledWith(5, '');
});

it('increments value when clicking on the increment button', () => {
  const onChangeValue = jest.fn();
  render(<NumberInput value="15" onChangeValue={onChangeValue} step={5} />);
  const [, incrementButton] = screen.getAllByRole('button');

  userEvent.click(incrementButton);

  expect(onChangeValue).toHaveBeenCalledTimes(1);
  expect(onChangeValue).toHaveBeenCalledWith('20');
});

it('decrements value when clicking on the increment button', () => {
  const onChangeValue = jest.fn();
  render(<NumberInput value="15" onChangeValue={onChangeValue} step={5} />);
  const [decrementButton] = screen.getAllByRole('button');

  userEvent.click(decrementButton);

  expect(onChangeValue).toHaveBeenCalledTimes(1);
  expect(onChangeValue).toHaveBeenCalledWith('10');
});

it('increments value when press arrow up key', () => {
  const onChangeValueMock = jest.fn();
  const onKeyDownMock = jest.fn();
  render(
    <NumberInput
      value="10"
      onChangeValue={onChangeValueMock}
      onKeyDown={onKeyDownMock}
    />
  );
  const input = screen.getByRole('textbox');

  input.focus();
  userEvent.keyboard('[ArrowUp]');
  userEvent.keyboard('{Alt}[ArrowUp]{/Alt}');
  userEvent.keyboard('{Shift}[ArrowUp]{/Shift}');
  userEvent.keyboard('{Shift}{Alt}[ArrowUp]{/Shift}{/Alt}');

  expect(onChangeValueMock).toHaveBeenCalledTimes(4);
  expect(onChangeValueMock).toHaveBeenNthCalledWith(1, '11');
  expect(onChangeValueMock).toHaveBeenNthCalledWith(2, '10.1');
  expect(onChangeValueMock).toHaveBeenNthCalledWith(3, '20');
  expect(onChangeValueMock).toHaveBeenNthCalledWith(4, '110');

  // ArrowUp = 1
  // Alt + ArrowUp = 2
  // Shift + ArrowUp = 2
  // Shift + Alt + ArrowUp = 3
  // total = 8
  expect(onKeyDownMock).toHaveBeenCalledTimes(8);
});

it('decrements value when press arrow down key', () => {
  const onChangeValue = jest.fn();
  render(<NumberInput value="10" onChangeValue={onChangeValue} />);
  const input = screen.getByRole('textbox');

  input.focus();
  userEvent.keyboard('[ArrowDown]');
  userEvent.keyboard('{Alt}[ArrowDown]{/Alt}');
  userEvent.keyboard('{Shift}[ArrowDown]{/Shift}');
  userEvent.keyboard('{Shift}{Alt}[ArrowDown]{/Shift}{/Alt}');

  expect(onChangeValue).toHaveBeenCalledTimes(4);
  expect(onChangeValue).toHaveBeenNthCalledWith(1, '9');
  expect(onChangeValue).toHaveBeenNthCalledWith(2, '9.9');
  expect(onChangeValue).toHaveBeenNthCalledWith(3, '0');
  expect(onChangeValue).toHaveBeenNthCalledWith(4, '-90');
});

it('can change a value in a specified range', () => {
  const onChangeValue = jest.fn();
  const { rerender } = render(
    <NumberInput
      value="10"
      onChangeValue={onChangeValue}
      min={0}
      max={20}
      step={15}
    />
  );
  const input = screen.getByRole('textbox');
  const [decrementButton, incrementButton] = screen.getAllByRole('button');

  userEvent.paste(input, '30');
  userEvent.click(decrementButton);
  userEvent.click(incrementButton);

  expect(onChangeValue).not.toHaveBeenCalled();

  rerender(
    <NumberInput value="10" onChangeValue={onChangeValue} max={20} step={15} />
  );
  userEvent.click(incrementButton);
  userEvent.click(decrementButton);
  expect(onChangeValue).toHaveBeenCalledTimes(1);
  expect(onChangeValue).toHaveBeenCalledWith('-5');
  onChangeValue.mockClear();

  rerender(
    <NumberInput value="10" onChangeValue={onChangeValue} min={0} step={15} />
  );
  userEvent.click(incrementButton);
  userEvent.click(decrementButton);
  expect(onChangeValue).toHaveBeenCalledTimes(1);
  expect(onChangeValue).toHaveBeenCalledWith('25');
});

it(
  'unable change value using keyboard arrows or increment/decrement buttons ' +
  'when the field is `readOnly`',
  () => {
    const onChangeValue = jest.fn();
    render(
      <NumberInput readOnly={true} value="0" onChangeValue={onChangeValue} />
    );
    const input = screen.getByRole('textbox');
    const [decrementButton, incrementButton] = screen.getAllByRole('button');

    input.focus();
    userEvent.keyboard('[ArrowDown]');
    userEvent.click(decrementButton);
    userEvent.click(incrementButton);

    expect(onChangeValue).not.toHaveBeenCalled();
  }
);

it('should format on blur', () => {
  const onChangeValueMock = jest.fn();
  const onBlurMock = jest.fn();
  render(
    <NumberInput
      readOnly={true}
      value="100."
      onBlur={onBlurMock}
      onChangeValue={onChangeValueMock}
    />
  );

  fireEvent.blur(screen.getByRole('textbox'));

  expect(onChangeValueMock).toHaveBeenCalledTimes(1);
  expect(onChangeValueMock).toHaveBeenCalledWith('100');

  expect(onBlurMock).toHaveBeenCalledTimes(1);
});
