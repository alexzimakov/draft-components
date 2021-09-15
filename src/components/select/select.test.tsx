import { fireEvent, render, screen } from '@testing-library/react';
import { Select } from './select';

const options = (
  <>
    <option>Chrome</option>
    <option>Firefox</option>
    <option>Internet Explorer</option>
    <option>Opera</option>
    <option>Safari</option>
    <option>Microsoft Edge</option>
  </>
);

it('renders without errors', () => {
  render(<Select>{options}</Select>);
});

it('invokes `onChange` callback', () => {
  const onChange = jest.fn();
  const eventMock = {
    target: { value: 'Firefox' },
  };
  render(<Select onChange={onChange}>{options}</Select>);

  fireEvent.change(screen.getByRole('combobox'), eventMock);
  expect(onChange).toHaveBeenCalledTimes(1);
});

it('invokes `onChangeValue` with selected value', () => {
  const onChangeValue = jest.fn();
  const eventMock = {
    target: { value: 'Firefox' },
  };
  render(<Select onChangeValue={onChangeValue}>{options}</Select>);

  fireEvent.change(screen.getByRole('combobox'), eventMock);
  expect(onChangeValue).toHaveBeenCalledTimes(1);
  expect(onChangeValue).toHaveBeenNthCalledWith(1, eventMock.target.value);
});

it('should forward extra attrs to underlying <select />', () => {
  const attrs = {
    title: 'Browser',
    multiple: true,
    required: true,
  };
  render(<Select {...attrs}>{options}</Select>);
  const selectEl = screen.getByTitle(attrs.title);

  expect(selectEl).toHaveAttribute('multiple', '');
  expect(selectEl).toHaveAttribute('required', '');
});
