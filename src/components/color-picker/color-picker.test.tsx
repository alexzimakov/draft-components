import { expect, it, vi } from 'vitest';
import { ColorPicker } from './color-picker.js';
import { render, screen, userEvent } from '../../test/test-utils.js';

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
      defaultValue={options[1].value}
      onChangeValue={vi.fn()}
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
  const onChangeValueMock = vi.fn();
  render(
    <ColorPicker
      name="accentColor"
      options={options}
      value={options[0].value}
      onChangeValue={onChangeValueMock}
    />,
  );

  await user.click(screen.getByText(options[1].label));

  expect(onChangeValueMock).toHaveBeenCalledTimes(1);
  expect(onChangeValueMock).toHaveBeenNthCalledWith(1, options[1].value);
});
