import userEvent from '@testing-library/user-event';
import { act, render, screen } from '@testing-library/react';
import { DatePickerPopover } from './date-picker-popover';

const buttonLabel = 'Select date';

it('renders without errors', () => {
  render(
    <DatePickerPopover
      locale="en"
      defaultIsOpen={true}
      value={null}
      onChangeValue={jest.fn()}
    >
      <button>{buttonLabel}</button>
    </DatePickerPopover>
  );

  screen.getByText(buttonLabel);
  screen.getByRole('grid');
});

it('can toggle popover visibility', () => {
  jest.useFakeTimers();

  render(
    <DatePickerPopover value={null} onChangeValue={jest.fn()}>
      <button>{buttonLabel}</button>
    </DatePickerPopover>
  );

  const button = screen.getByText(buttonLabel);

  userEvent.click(button);
  screen.getByRole('grid');

  userEvent.click(button);
  act(() => {
    jest.runOnlyPendingTimers();
  });
  expect(screen.queryByRole('grid')).toBeNull();
});

it('can select date using calendar', () => {
  jest.useFakeTimers();

  const handleChangeValue = jest.fn();
  render(
    <DatePickerPopover value="2022-02-06" onChangeValue={handleChangeValue}>
      <button>{buttonLabel}</button>
    </DatePickerPopover>
  );

  userEvent.click(screen.getByText(buttonLabel));
  userEvent.click(screen.getByText('3'));
  act(() => {
    jest.runOnlyPendingTimers();
  });

  expect(screen.queryByRole('grid')).toBeNull();
  expect(handleChangeValue).toHaveBeenCalledTimes(1);
  expect(handleChangeValue).toHaveBeenCalledWith('2022-02-03');
});
