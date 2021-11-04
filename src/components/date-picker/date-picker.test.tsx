import { screen, render, fireEvent } from '@testing-library/react';
import { DatePicker } from './date-picker';

const keyEventInfo = {
  tab: { key: 'Tab', code: 'Tab', charCode: 9 },
  pageUp: { key: 'PageUp', code: 'PageUp', charCode: 33 },
  pageDown: { key: 'PageDown', code: 'PageDown', charCode: 34 },
  end: { key: 'End', code: 'End', charCode: 35 },
  home: { key: 'Home', code: 'Home', charCode: 36 },
  arrowLeft: { key: 'ArrowLeft', code: 'ArrowLeft', charCode: 37 },
  arrowUp: { key: 'ArrowUp', code: 'ArrowUp', charCode: 38 },
  arrowRight: { key: 'ArrowRight', code: 'ArrowRight', charCode: 39 },
  arrowDown: { key: 'ArrowDown', code: 'ArrowDown', charCode: 40 },
};

it('renders without errors', () => {
  const nextYearAriaLabel = 'next year';
  const prevYearAriaLabel = 'prev year';
  const nextMonthAriaLabel = 'next month';
  const prevMonthAriaLabel = 'prev month';

  render(<DatePicker
    nextYearButtonLabel={nextYearAriaLabel}
    prevYearButtonLabel={prevYearAriaLabel}
    nextMonthButtonLabel={nextMonthAriaLabel}
    prevMonthButtonLabel={prevMonthAriaLabel}
    value="2021-10-20"
    onChangeValue={jest.fn()}
  />);

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
  render(<DatePicker
    value="2021-10-20"
    onChangeValue={onChangeDateMock}
  />);

  fireEvent.click(screen.getByText('13'));

  expect(onChangeDateMock).toHaveBeenCalledTimes(1);
  expect(onChangeDateMock).toHaveBeenCalledWith('2021-10-13');
});

it('can select month and year using arrow buttons', () => {
  const nextYearAriaLabel = 'next year';
  const prevYearAriaLabel = 'prev year';
  const nextMonthAriaLabel = 'next month';
  const prevMonthAriaLabel = 'prev month';
  render(<DatePicker
    nextYearButtonLabel={nextYearAriaLabel}
    prevYearButtonLabel={prevYearAriaLabel}
    nextMonthButtonLabel={nextMonthAriaLabel}
    prevMonthButtonLabel={prevMonthAriaLabel}
    locale="en"
    value="2021-10-14"
    onChangeValue={jest.fn()}
  />);

  screen.getByText('October 2021');

  fireEvent.click(screen.getByLabelText(nextYearAriaLabel));
  screen.getByText('October 2022');

  fireEvent.click(screen.getByLabelText(prevMonthAriaLabel));
  screen.getByText('September 2022');

  fireEvent.click(screen.getByLabelText(nextMonthAriaLabel));
  screen.getByText('October 2022');

  fireEvent.click(screen.getByLabelText(prevYearAriaLabel));
  screen.getByText('October 2021');
});

it('can select date using keyboard', () => {
  render(<DatePicker locale="en" value="2021-10-14" onChangeValue={jest.fn()} />);

  // Move focus to the selected date.
  fireEvent.keyDown(window.document, keyEventInfo.tab);
  fireEvent.keyDown(window.document, keyEventInfo.tab);
  fireEvent.keyDown(window.document, keyEventInfo.tab);
  fireEvent.keyDown(window.document, keyEventInfo.tab);
  fireEvent.keyDown(window.document, keyEventInfo.tab);
  expect(screen.getByText('14')).toHaveFocus();

  // Move focus to the next day.
  fireEvent.keyDown(screen.getByText('14'), keyEventInfo.arrowRight);
  expect(screen.getByText('15')).toHaveFocus();

  // Move focus to the previous day.
  fireEvent.keyDown(screen.getByText('15'), keyEventInfo.arrowLeft);
  expect(screen.getByText('14')).toHaveFocus();

  // Move focus to the same day of the previous week.
  fireEvent.keyDown(screen.getByText('14'), keyEventInfo.arrowUp);
  expect(screen.getByText('7')).toHaveFocus();

  // Move focus to the same day of the next week.
  fireEvent.keyDown(screen.getByText('7'), keyEventInfo.arrowDown);
  expect(screen.getByText('14')).toHaveFocus();

  // Moves focus to the first day of the current week.
  fireEvent.keyDown(screen.getByText('14'), keyEventInfo.home);
  expect(screen.getByText('11')).toHaveFocus();

  // Moves focus to the last day of the current week.
  fireEvent.keyDown(screen.getByText('11'), keyEventInfo.end);
  expect(screen.getByText('17')).toHaveFocus();

  // Moves focus to the same day of the previous month.
  fireEvent.keyDown(screen.getByText('17'), keyEventInfo.pageUp);
  screen.getByText('September 2021');
  expect(screen.getByText('17')).toHaveFocus();

  // Moves focus to the same day of the next month.
  fireEvent.keyDown(screen.getByText('17'), keyEventInfo.pageDown);
  screen.getByText('October 2021');
  expect(screen.getByText('17')).toHaveFocus();

  // Moves focus to the same day of the previous year.
  fireEvent.keyDown(screen.getByText('17'), {
    ...keyEventInfo.pageUp,
    shiftKey: true,
  });
  screen.getByText('October 2020');
  expect(screen.getByText('17')).toHaveFocus();

  // Moves focus to the same day of the next year.
  fireEvent.keyDown(screen.getByText('17'), {
    ...keyEventInfo.pageDown,
    shiftKey: true,
  });
  screen.getByText('October 2021');
  expect(screen.getByText('17')).toHaveFocus();
});
