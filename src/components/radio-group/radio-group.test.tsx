import { RadioGroup } from './radio-group';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

it('renders without errors', () => {
  render(
    <RadioGroup value="visa" onChangeValue={jest.fn()}>
      <RadioGroup.Item value="visa" label="Visa">
        <i>Default</i>
      </RadioGroup.Item>
      <RadioGroup.Item
        value="mastercard"
        label="MasterCard"
        description="**** **** **** 9835"
      />
    </RadioGroup>
  );

  const radios = screen.getAllByRole('radio');

  expect(radios).toHaveLength(2);
});

it(
  'throws an error when children is not a list of `RadioGroup.Item` elements',
  () => {
    // Suppress React error logging.
    jest.spyOn(console, 'error').mockImplementation(jest.fn());
    expect(() => render(
      <RadioGroup value="visa" onChangeValue={jest.fn()}>
        <span>Amex</span>
        <RadioGroup.Item value="visa" label="Visa">
          <i>Default</i>
        </RadioGroup.Item>
        <RadioGroup.Item
          value="mastercard"
          label="MasterCard"
          description="**** **** **** 9835"
        />
      </RadioGroup>
    )).toThrow();
  }
);

it('invokes `onChangeValue` callback when select some option', () => {
  const onChangeValue = jest.fn();
  render(
    <RadioGroup value="visa" onChangeValue={onChangeValue}>
      <RadioGroup.Item value="visa" label="Visa">
        <i>Default</i>
      </RadioGroup.Item>
      <RadioGroup.Item
        value="mastercard"
        label="MasterCard"
        description="**** **** **** 9835"
      />
      <RadioGroup.Item value="amex" label="Amex" />
    </RadioGroup>
  );

  userEvent.click(screen.getByText('MasterCard'));
  userEvent.click(screen.getByText('Amex'));
  expect(onChangeValue).toHaveBeenCalledTimes(2);
  expect(onChangeValue).toHaveBeenNthCalledWith(1, 'mastercard');
  expect(onChangeValue).toHaveBeenNthCalledWith(2, 'amex');
});
