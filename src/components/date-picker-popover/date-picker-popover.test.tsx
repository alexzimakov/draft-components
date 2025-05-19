import { expect, it, vi } from 'vitest';
import { DatePickerPopover } from './date-picker-popover.js';
import { fireEvent, render, screen, userEvent, waitFor } from '../../test/test-utils.js';

it('renders without errors', () => {
  const label = 'Select date';
  render(
    <DatePickerPopover
      locale="en"
      defaultIsOpen={true}
      value={null}
      onChangeValue={vi.fn()}
    >
      {({ ref, toggle }) => (
        <button ref={ref} onClick={toggle}>
          {label}
        </button>
      )}
    </DatePickerPopover>,
  );

  screen.getByText(label);
  screen.getByRole('grid');
});

it('can toggle popover visibility', async () => {
  const user = userEvent.setup();
  const label = 'Select date';
  render(
    <DatePickerPopover value={null} onChangeValue={vi.fn()}>
      {({ ref, toggle }) => (
        <button ref={ref} onClick={toggle}>
          {label}
        </button>
      )}
    </DatePickerPopover>,
  );

  const button = screen.getByText(label);

  await user.click(button);
  screen.getByRole('grid');

  await user.click(button);
  fireEvent.animationStart(screen.getByTestId('date-picker-popover'));
  fireEvent.animationEnd(screen.getByTestId('date-picker-popover'));

  await waitFor(() => expect(screen.queryByRole('grid')).toBeNull());
});

it('can select date using calendar', async () => {
  const user = userEvent.setup();
  const label = 'Select date';
  const onChangeValueMock = vi.fn();
  render(
    <DatePickerPopover value="2022-02-06" onChangeValue={onChangeValueMock}>
      {({ ref, toggle }) => (
        <button ref={ref} onClick={toggle}>
          {label}
        </button>
      )}
    </DatePickerPopover>,
  );

  await user.click(screen.getByText(label));
  await user.click(screen.getByText('3'));
  fireEvent.animationStart(screen.getByTestId('date-picker-popover'));
  fireEvent.animationEnd(screen.getByTestId('date-picker-popover'));

  await waitFor(() => expect(screen.queryByRole('grid')).toBeNull());
  expect(onChangeValueMock).toHaveBeenCalledTimes(1);
  expect(onChangeValueMock).toHaveBeenCalledWith('2022-02-03');
});
