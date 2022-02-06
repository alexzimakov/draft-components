import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { DatePicker } from './date-picker';

it('renders without errors', () => {
  const nextYearAriaLabel = 'next year';
  const prevYearAriaLabel = 'prev year';
  const nextMonthAriaLabel = 'next month';
  const prevMonthAriaLabel = 'prev month';

  render(
    <DatePicker
      nextYearButtonLabel={nextYearAriaLabel}
      prevYearButtonLabel={prevYearAriaLabel}
      nextMonthButtonLabel={nextMonthAriaLabel}
      prevMonthButtonLabel={prevMonthAriaLabel}
      value="2021-10-20"
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
  expect(screen.getByText('20')).toHaveAttribute('aria-selected', 'true');
});

it('invokes `onPick` callback when selecting a day', () => {
  const onChangeDateMock = jest.fn();
  render(<DatePicker value="2021-10-20" onChangeValue={onChangeDateMock} />);

  userEvent.click(screen.getByText('13'));

  expect(onChangeDateMock).toHaveBeenCalledTimes(1);
  expect(onChangeDateMock).toHaveBeenCalledWith('2021-10-13');
});

it('can select month and year using arrow buttons', () => {
  const nextYearAriaLabel = 'next year';
  const prevYearAriaLabel = 'prev year';
  const nextMonthAriaLabel = 'next month';
  const prevMonthAriaLabel = 'prev month';
  render(
    <DatePicker
      nextYearButtonLabel={nextYearAriaLabel}
      prevYearButtonLabel={prevYearAriaLabel}
      nextMonthButtonLabel={nextMonthAriaLabel}
      prevMonthButtonLabel={prevMonthAriaLabel}
      locale="en"
      value="2021-10-14"
      onChangeValue={jest.fn()}
    />
  );

  screen.getByText('October 2021');

  userEvent.click(screen.getByLabelText(nextYearAriaLabel));
  screen.getByText('October 2022');

  userEvent.click(screen.getByLabelText(prevMonthAriaLabel));
  screen.getByText('September 2022');

  userEvent.click(screen.getByLabelText(nextMonthAriaLabel));
  screen.getByText('October 2022');

  userEvent.click(screen.getByLabelText(prevYearAriaLabel));
  screen.getByText('October 2021');
});

it('can select date using keyboard', () => {
  render(
    <DatePicker locale="en" value="2021-10-14" onChangeValue={jest.fn()} />
  );

  // Move focus to the selected date.
  userEvent.tab();
  userEvent.tab();
  userEvent.tab();
  userEvent.tab();
  userEvent.tab();
  expect(screen.getByText('14')).toHaveFocus();

  // Move focus to the next day.
  userEvent.keyboard('{ArrowRight}');
  expect(screen.getByText('15')).toHaveFocus();

  // Move focus to the previous day.
  userEvent.keyboard('{ArrowLeft}');
  expect(screen.getByText('14')).toHaveFocus();

  // Move focus to the same day of the previous week.
  userEvent.keyboard('{ArrowUp}');
  expect(screen.getByText('7')).toHaveFocus();

  // Move focus to the same day of the next week.
  userEvent.keyboard('{ArrowDown}');
  expect(screen.getByText('14')).toHaveFocus();

  // Moves focus to the first day of the current week.
  userEvent.keyboard('{Home}');
  expect(screen.getByText('11')).toHaveFocus();

  // Moves focus to the last day of the current week.
  userEvent.keyboard('{End}');
  expect(screen.getByText('17')).toHaveFocus();

  // Moves focus to the same day of the previous month.
  userEvent.keyboard('{PageUp}');
  screen.getByText('September 2021');
  expect(screen.getByText('17')).toHaveFocus();

  // Moves focus to the same day of the next month.
  userEvent.keyboard('{PageDown}');
  screen.getByText('October 2021');
  expect(screen.getByText('17')).toHaveFocus();

  // Moves focus to the same day of the previous year.
  userEvent.keyboard('{Shift>}{PageUp}{/Shift}');
  screen.getByText('October 2020');
  expect(screen.getByText('17')).toHaveFocus();

  // Moves focus to the same day of the next year.
  userEvent.keyboard('{Shift>}{PageDown}{/Shift}');
  screen.getByText('October 2021');
  expect(screen.getByText('17')).toHaveFocus();
});

it('cannot pick disabled dates', () => {
  const handleChangeValue = jest.fn();
  render(
    <DatePicker
      locale="en"
      min="2021-10-10"
      max="2021-10-24"
      value="2021-10-14"
      onChangeValue={handleChangeValue}
    />
  );

  // Move focus to the selected date.
  userEvent.tab();
  userEvent.tab();
  userEvent.tab();
  userEvent.tab();
  userEvent.tab();
  expect(screen.getByText('14')).toHaveFocus();

  // Try to move focus to the previous week.
  userEvent.keyboard('{ArrowUp}');
  expect(screen.getByText('14')).toHaveFocus();

  // Try to move focus to the 9th october.
  userEvent.keyboard('{ArrowLeft}');
  userEvent.keyboard('{ArrowLeft}');
  userEvent.keyboard('{ArrowLeft}');
  userEvent.keyboard('{ArrowLeft}');
  userEvent.keyboard('{ArrowLeft}');
  expect(screen.getByText('10')).toHaveFocus();

  userEvent.click(screen.getByText('9'));
  userEvent.click(screen.getByText('25'));
  expect(handleChangeValue).not.toHaveBeenCalled();
});
