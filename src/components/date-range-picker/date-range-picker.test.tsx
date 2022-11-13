import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { DateRangePicker } from './date-range-picker';

it('renders without errors', () => {
  const nextYearAriaLabel = 'next year';
  const prevYearAriaLabel = 'prev year';
  const nextMonthAriaLabel = 'next month';
  const prevMonthAriaLabel = 'prev month';

  render(
    <DateRangePicker
      nextYearButtonLabel={nextYearAriaLabel}
      prevYearButtonLabel={prevYearAriaLabel}
      nextMonthButtonLabel={nextMonthAriaLabel}
      prevMonthButtonLabel={prevMonthAriaLabel}
      value={{ start: '2021-10-05', end: '2021-10-21' }}
      onChangeValue={jest.fn()}
    />
  );

  expect(screen.getByRole('grid')).toHaveAccessibleName('October 2021');
  screen.getByLabelText(nextYearAriaLabel);
  screen.getByLabelText(prevYearAriaLabel);
  screen.getByLabelText(nextMonthAriaLabel);
  screen.getByLabelText(prevMonthAriaLabel);
  expect(screen.getAllByRole('columnheader')).toHaveLength(7); // days of week
  expect(screen.getAllByRole('gridcell')).toHaveLength(31); // displayed days
  expect(screen.getByText('5')).toHaveAttribute('aria-selected', 'true');
  expect(screen.getByText('21')).toHaveAttribute('aria-selected', 'true');
});

it('invokes `onPick` callback when selecting a day', async () => {
  const user = userEvent.setup();
  const onChangeRangeMock = jest.fn();
  render(
    <DateRangePicker
      value={{ start: '2021-10-05', end: '2021-10-21' }}
      onChangeValue={onChangeRangeMock}
    />
  );

  await user.click(screen.getByText('13'));
  await user.click(screen.getByText('28'));

  expect(onChangeRangeMock).toHaveBeenCalledTimes(2);
  expect(onChangeRangeMock).toHaveBeenCalledWith({
    start: '2021-10-13',
    end: '2021-10-13',
  });
  expect(onChangeRangeMock).toHaveBeenCalledWith({
    start: '2021-10-13',
    end: '2021-10-28',
  });
});

it('can select month and year using arrow buttons', async () => {
  const user = userEvent.setup();
  const nextYearAriaLabel = 'next year';
  const prevYearAriaLabel = 'prev year';
  const nextMonthAriaLabel = 'next month';
  const prevMonthAriaLabel = 'prev month';
  render(
    <DateRangePicker
      nextYearButtonLabel={nextYearAriaLabel}
      prevYearButtonLabel={prevYearAriaLabel}
      nextMonthButtonLabel={nextMonthAriaLabel}
      prevMonthButtonLabel={prevMonthAriaLabel}
      locale="en"
      value={{ start: '2021-10-05', end: '2021-10-21' }}
      onChangeValue={jest.fn()}
    />
  );

  screen.getByText('October 2021');

  await user.click(screen.getByLabelText(nextYearAriaLabel));
  screen.getByText('October 2022');

  await user.click(screen.getByLabelText(prevMonthAriaLabel));
  screen.getByText('September 2022');

  await user.click(screen.getByLabelText(nextMonthAriaLabel));
  screen.getByText('October 2022');

  await user.click(screen.getByLabelText(prevYearAriaLabel));
  screen.getByText('October 2021');
});

it('can select date using keyboard', async () => {
  const user = userEvent.setup();
  render(
    <DateRangePicker
      locale="en"
      value={{ start: '2021-10-14', end: '2021-10-21' }}
      onChangeValue={jest.fn()}
    />
  );

  // Move focus to the selected date.
  await user.tab();
  await user.tab();
  await user.tab();
  await user.tab();
  await user.tab();
  expect(screen.getByText('14')).toHaveFocus();

  // Move focus to the next day.
  await user.keyboard('{ArrowRight}');
  expect(screen.getByText('15')).toHaveFocus();

  // Move focus to the previous day.
  await user.keyboard('{ArrowLeft}');
  expect(screen.getByText('14')).toHaveFocus();

  // Move focus to the same day of the previous week.
  await user.keyboard('{ArrowUp}');
  expect(screen.getByText('7')).toHaveFocus();

  // Move focus to the same day of the next week.
  await user.keyboard('{ArrowDown}');
  expect(screen.getByText('14')).toHaveFocus();

  // Moves focus to the first day of the current week.
  await user.keyboard('{Home}');
  expect(screen.getByText('11')).toHaveFocus();

  // Moves focus to the last day of the current week.
  await user.keyboard('{End}');
  expect(screen.getByText('17')).toHaveFocus();

  // Moves focus to the same day of the previous month.
  await user.keyboard('{PageUp}');
  screen.getByText('September 2021');
  expect(screen.getByText('17')).toHaveFocus();

  // Moves focus to the same day of the next month.
  await user.keyboard('{PageDown}');
  screen.getByText('October 2021');
  expect(screen.getByText('17')).toHaveFocus();

  // Moves focus to the same day of the previous year.
  await user.keyboard('{Shift>}{PageUp}{/Shift}');
  screen.getByText('October 2020');
  expect(screen.getByText('17')).toHaveFocus();

  // Moves focus to the same day of the next year.
  await user.keyboard('{Shift>}{PageDown}{/Shift}');
  screen.getByText('October 2021');
  expect(screen.getByText('17')).toHaveFocus();
});
