import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '@testing-library/react';
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

it('can toggle popover visibility', async () => {
  const user = userEvent.setup();

  render(
    <DatePickerPopover value={null} onChangeValue={jest.fn()}>
      <button>{buttonLabel}</button>
    </DatePickerPopover>
  );

  const button = screen.getByText(buttonLabel);

  await user.click(button);
  screen.getByRole('grid');

  await user.click(button);
  await waitFor(() => expect(screen.queryByRole('grid')).toBeNull());
});

it('can select date using calendar', async () => {
  const user = userEvent.setup();

  const handleChangeValue = jest.fn();
  render(
    <DatePickerPopover value="2022-02-06" onChangeValue={handleChangeValue}>
      <button>{buttonLabel}</button>
    </DatePickerPopover>
  );

  await user.click(screen.getByText(buttonLabel));
  await user.click(screen.getByText('3'));
  await waitFor(() => expect(screen.queryByRole('grid')).toBeNull());
  expect(handleChangeValue).toHaveBeenCalledTimes(1);
  expect(handleChangeValue).toHaveBeenCalledWith('2022-02-03');
});
