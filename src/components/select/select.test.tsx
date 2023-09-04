import { Select } from './select';
import { expect, it, vi } from 'vitest';
import { render, screen, userEvent } from '../../test/test-utils';

it('renders without errors', () => {
  render(
    <Select>
      <option>Chrome</option>
      <option>Firefox</option>
      <option>Safari</option>
      <option>Opera</option>
    </Select>,
  );

  screen.getByRole('combobox');
  expect(screen.getAllByRole('option')).toHaveLength(4);
});

it('should forward extra attrs to the native select', () => {
  const attrs = {
    'aria-label': 'Browser',
    'name': 'browser',
    'required': true,
  };
  render(
    <Select {...attrs}>
      <option>Chrome</option>
      <option>Firefox</option>
      <option>Safari</option>
      <option>Opera</option>
    </Select>,
  );

  const selectEl = screen.getByRole('combobox');
  expect(selectEl).toHaveAttribute('aria-label', attrs['aria-label']);
  expect(selectEl).toHaveAttribute('name', attrs.name);
  expect(selectEl).toHaveAttribute('required', '');
});

it('should disable select when `loading` property is true', () => {
  render(
    <Select loading={true}>
      <option>Chrome</option>
      <option>Firefox</option>
      <option>Safari</option>
      <option>Opera</option>
    </Select>,
  );

  expect(screen.getByRole('combobox')).toBeDisabled();
});

it('invokes `onChange` callback', async () => {
  const user = userEvent.setup();
  const onChangeMock = vi.fn();
  render(
    <Select onChange={onChangeMock}>
      <option value="1">A</option>
      <option value="2">B</option>
      <option value="3">C</option>
    </Select>,
  );

  await user.selectOptions(screen.getByRole('combobox'), ['A']);

  expect(onChangeMock).toHaveBeenCalledTimes(1);
  expect(onChangeMock).toHaveBeenNthCalledWith(1, expect.objectContaining({
    target: expect.any(window.HTMLSelectElement),
  }));
});

it('invokes `onChangeValue` callback with selected value', async () => {
  const user = userEvent.setup();
  const onChangeValueMock = vi.fn();
  render(
    <Select onChangeValue={onChangeValueMock}>
      <option value="1">A</option>
      <option value="2">B</option>
      <option value="3">C</option>
    </Select>,
  );

  await user.selectOptions(screen.getByRole('combobox'), ['A']);

  expect(onChangeValueMock).toHaveBeenCalledTimes(1);
  expect(onChangeValueMock).toHaveBeenNthCalledWith(1, '1');
});

it('invokes `onChangeValue` callback with selected values list', async () => {
  const user = userEvent.setup();
  const onChangeValueMock = vi.fn();
  render(
    <Select multiple={true} onChangeValue={onChangeValueMock}>
      <option value="1">A</option>
      <option value="2">B</option>
      <option value="3">C</option>
    </Select>,
  );

  await user.selectOptions(screen.getByRole('listbox'), ['A', 'C']);

  expect(onChangeValueMock).toHaveBeenCalledTimes(2);
  expect(onChangeValueMock).toHaveBeenNthCalledWith(1, ['1']);
  expect(onChangeValueMock).toHaveBeenNthCalledWith(2, ['1', '3']);
});
