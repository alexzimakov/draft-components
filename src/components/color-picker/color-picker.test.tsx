import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { ColorPicker } from './color-picker';

it('renders without errors', () => {
  const options = [
    { value: 'red', color: '#ef4444', label: 'Red' },
    { value: 'green', color: '#22c55e', label: 'Green' },
    { value: 'blue', color: '#3b82f6', label: 'Blue' },
  ];
  render(
    <ColorPicker
      name="accentColor"
      options={options}
      value={options[1].value}
      onChangeValue={jest.fn()}
    />,
  );

  const radios = screen.getAllByRole('radio');
  expect(radios).toHaveLength(options.length);
  expect(radios[1]).toBeChecked();

  expect(radios[0]).toHaveAttribute('value', options[0].value);
  expect(radios[1]).toHaveAttribute('value', options[1].value);
  expect(radios[2]).toHaveAttribute('value', options[2].value);
});

it('invokes `onChangeValue` callback with checked value', async () => {
  const user = userEvent.setup();
  const options = [
    { value: 1, color: '#ef4444', label: 'Red' },
    { value: 2, color: '#22c55e', label: 'Green' },
    { value: 3, color: '#3b82f6', label: 'Blue' },
  ];
  const onChangeValueMock = jest.fn();
  render(
    <ColorPicker
      name="accentColor"
      options={options}
      onChangeValue={onChangeValueMock}
    />,
  );

  await user.click(screen.getByText(options[1].label));

  expect(onChangeValueMock).toHaveBeenCalledTimes(1);
  expect(onChangeValueMock).toHaveBeenNthCalledWith(1, options[1].value);
});
