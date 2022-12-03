import userEvent from '@testing-library/user-event';
import { DAYS_IN_WEEK, toDateISO } from './date-helpers';
import { render, screen } from '@testing-library/react';
import { DatePicker } from './date-picker';
import { DateRangePicker } from './date-range-picker';

it('renders without errors', () => {
  const prevMonthButtonLabel = 'prev month';
  const nextMonthButtonLabel = 'next month';
  const monthSelectLabel = 'month';
  const yearInputLabel = 'year';

  render(
    <DatePicker
      locale="en"
      prevMonthButtonLabel={prevMonthButtonLabel}
      nextMonthButtonLabel={nextMonthButtonLabel}
      monthSelectLabel={monthSelectLabel}
      yearInputLabel={yearInputLabel}
      value="2022-12-02"
      onChangeValue={jest.fn()}
    />
  );

  screen.getByLabelText(prevMonthButtonLabel);
  screen.getByLabelText(nextMonthButtonLabel);
  screen.getByLabelText(monthSelectLabel);
  screen.getByLabelText(yearInputLabel);
  expect(screen.getByRole('grid')).toHaveAccessibleName('December 2022');
  expect(screen.getAllByRole('columnheader')).toHaveLength(DAYS_IN_WEEK);
  expect(screen.getAllByRole('gridcell')).toHaveLength(DAYS_IN_WEEK * 5);
  expect(screen.getByLabelText('December 2, 2022'))
    .toHaveAttribute('tabindex', '0');
});

it('can select a month using arrow buttons', async () => {
  const user = userEvent.setup();
  const prevMonthButtonLabel = 'prev month';
  const nextMonthButtonLabel = 'next month';
  render(
    <DatePicker
      locale="en"
      prevMonthButtonLabel={prevMonthButtonLabel}
      nextMonthButtonLabel={nextMonthButtonLabel}
      value="2022-12-02"
      onChangeValue={jest.fn()}
    />
  );

  const gridEl = screen.getByRole('grid');
  expect(gridEl).toHaveAccessibleName('December 2022');

  await user.click(screen.getByLabelText(prevMonthButtonLabel));
  expect(gridEl).toHaveAccessibleName('November 2022');

  await user.click(screen.getByLabelText(nextMonthButtonLabel));
  await user.click(screen.getByLabelText(nextMonthButtonLabel));
  expect(gridEl).toHaveAccessibleName('January 2023');
});

it('can select a month using the month selector', async () => {
  const user = userEvent.setup();
  const monthSelectLabel = 'month';
  render(
    <DatePicker
      locale="en"
      monthSelectLabel={monthSelectLabel}
      value="2022-12-02"
      onChangeValue={jest.fn()}
    />
  );

  const gridEl = screen.getByRole('grid');
  expect(gridEl).toHaveAccessibleName('December 2022');

  await user.selectOptions(
    screen.getByLabelText(monthSelectLabel),
    ['October']
  );
  expect(gridEl).toHaveAccessibleName('October 2022');
});

it('can enter a year using the year field', async () => {
  const user = userEvent.setup();
  const yearInputLabel = 'year';
  render(
    <DatePicker
      locale="en"
      yearInputLabel={yearInputLabel}
      value="2022-12-02"
      onChangeValue={jest.fn()}
    />
  );

  const gridEl = screen.getByRole('grid');
  expect(gridEl).toHaveAccessibleName('December 2022');

  await user.clear(screen.getByLabelText(yearInputLabel));
  await user.type(screen.getByLabelText(yearInputLabel), '2023');
  expect(gridEl).toHaveAccessibleName('December 2023');
});

it('can move focus between days using keyboard', async () => {
  const user = userEvent.setup();
  render(
    <DatePicker
      locale="en"
      weekStartsOn={1}
      value="2022-12-02"
      onChangeValue={jest.fn()}
    />
  );

  await user.tab(); // Move focus to the previous month button.
  await user.tab(); // Move focus to the month selector.
  await user.tab(); // Move focus to the year field.
  await user.tab(); // Move focus to the next month button.
  await user.tab(); // Move focus to the focusable day.
  expect(screen.getByLabelText('December 2, 2022')).toHaveFocus();

  await user.keyboard('{ArrowRight}'); // Move focus to the next day.
  expect(screen.getByLabelText('December 3, 2022')).toHaveFocus();

  await user.keyboard('{ArrowLeft}'); // Move focus to the previous day.
  expect(screen.getByLabelText('December 2, 2022')).toHaveFocus();

  await user.keyboard('{ArrowUp}'); // Move focus to the same day of the previous week.
  expect(screen.getByLabelText('November 25, 2022')).toHaveFocus();

  await user.keyboard('{ArrowDown}'); // Move focus to the same day of the next week.
  expect(screen.getByLabelText('December 2, 2022')).toHaveFocus();

  await user.keyboard('{Home}'); // Moves focus to the first day of the current week.
  expect(screen.getByLabelText('November 28, 2022')).toHaveFocus();

  await user.keyboard('{End}'); // Moves focus to the last day of the current week.
  expect(screen.getByLabelText('December 4, 2022')).toHaveFocus();

  await user.keyboard('{PageUp}'); // Moves focus to the same day of the previous month.
  expect(screen.getByLabelText('November 4, 2022')).toHaveFocus();

  await user.keyboard('{PageDown}'); // Moves focus to the same day of the next month.
  expect(screen.getByLabelText('December 4, 2022')).toHaveFocus();

  await user.keyboard('{Shift>}{PageUp}{/Shift}'); // Moves focus to the same day of the previous year.
  expect(screen.getByLabelText('December 4, 2021')).toHaveFocus();

  await user.keyboard('{Shift>}{PageDown}{/Shift}'); // Moves focus to the same day of the next year.
  expect(screen.getByLabelText('December 4, 2022')).toHaveFocus();
});

it('selects a day by click', async () => {
  const user = userEvent.setup();
  const onChangeValueMock = jest.fn();
  render(
    <DatePicker
      locale="en"
      weekStartsOn={1}
      value="2022-12-02"
      onChangeValue={onChangeValueMock}
    />
  );

  await user.click(screen.getByLabelText('December 14, 2022'));

  expect(onChangeValueMock).toHaveBeenCalledTimes(1);
  expect(onChangeValueMock).toHaveBeenNthCalledWith(1, '2022-12-14');
});

it('selects a focused day when pressing Enter key', async () => {
  const user = userEvent.setup();
  const onChangeValueMock = jest.fn();
  render(
    <DatePicker
      locale="en"
      weekStartsOn={1}
      value="2022-12-10"
      onChangeValue={onChangeValueMock}
    />
  );

  await user.tab(); // Move focus to the previous month button.
  await user.tab(); // Move focus to the month selector.
  await user.tab(); // Move focus to the year field.
  await user.tab(); // Move focus to the next month button.
  await user.tab(); // Move focus to the 2 December.
  await user.keyboard('{ArrowRight}'); // Move focus to the 3 December.
  await user.keyboard('{Enter}');

  expect(onChangeValueMock).toHaveBeenCalledTimes(1);
  expect(onChangeValueMock).toHaveBeenNthCalledWith(1, '2022-12-11');
});

it('selects a focused day when pressing Space key', async () => {
  const user = userEvent.setup();
  const onChangeValueMock = jest.fn();
  render(
    <DatePicker
      locale="en"
      weekStartsOn={1}
      value="2022-12-02"
      onChangeValue={onChangeValueMock}
    />
  );

  await user.tab(); // Move focus to the previous month button.
  await user.tab(); // Move focus to the month selector.
  await user.tab(); // Move focus to the year field.
  await user.tab(); // Move focus to the next month button.
  await user.tab(); // Move focus to the 2 December.
  await user.keyboard('{ArrowLeft}'); // Move focus to the 1 December.
  await user.keyboard(' ');

  expect(onChangeValueMock).toHaveBeenCalledTimes(1);
  expect(onChangeValueMock).toHaveBeenNthCalledWith(1, '2022-12-01');
});

it("can't move focus to disabled dates", async () => {
  const user = userEvent.setup();
  const handleChangeValue = jest.fn();
  render(
    <DatePicker
      locale="en"
      min="2022-12-14"
      max="2022-12-17"
      value="2022-12-15"
      onChangeValue={handleChangeValue}
    />
  );

  await user.tab(); // Move focus to the previous month button.
  await user.tab(); // Move focus to the month selector.
  await user.tab(); // Move focus to the year field.
  await user.tab(); // Move focus to the next month button.
  await user.tab(); // Move focus to the 15 December.

  await user.keyboard('{Home}'); // Moves focus to the 12 December.
  expect(screen.getByLabelText('December 12, 2022')).not.toHaveFocus();
  expect(screen.getByLabelText('December 14, 2022')).toHaveFocus();

  await user.keyboard('{End}'); // Moves focus to the 18 December.
  expect(screen.getByLabelText('December 18, 2022')).not.toHaveFocus();
  expect(screen.getByLabelText('December 17, 2022')).toHaveFocus();
});

it('throws error when min is invalid ISO date string', () => {
  const consoleErrorMock = jest
    .spyOn(console, 'error')
    .mockImplementation(jest.fn());
  expect(() => render(
    <DatePicker
      value="2022-12-15"
      min="12/1/2022"
      onChangeValue={jest.fn()}
    />
  )).toThrow(RangeError);

  consoleErrorMock.mockRestore();
});

it('throws error when max is invalid ISO date string', () => {
  const consoleErrorMock = jest
    .spyOn(console, 'error')
    .mockImplementation(jest.fn());
  expect(() => render(
    <DatePicker
      value="2022-12-15"
      max="12/1/2022"
      onChangeValue={jest.fn()}
    />
  )).toThrow(RangeError);

  consoleErrorMock.mockRestore();
});

it('throws error when min greater or equal than max', () => {
  const consoleErrorMock = jest
    .spyOn(console, 'error')
    .mockImplementation(jest.fn());
  expect(() => render(
    <DatePicker
      value="2022-12-15"
      min="2022-12-31"
      max="2022-12-01"
      onChangeValue={jest.fn()}
    />
  )).toThrow(RangeError);

  consoleErrorMock.mockRestore();
});

it(
  'should use a min date as the default focusable day when ' +
  'the selected value is less than the min date',
  async () => {
    const user = userEvent.setup();
    render(
      <DatePicker
        locale="en"
        value="2022-12-02"
        min="2022-12-15"
        onChangeValue={jest.fn()}
      />
    );

    await user.tab(); // Move focus to the previous month button.
    await user.tab(); // Move focus to the month selector.
    await user.tab(); // Move focus to the year field.
    await user.tab(); // Move focus to the next month button.
    await user.tab(); // Move focus to the focusable day.
    expect(screen.getByLabelText('December 2, 2022')).not.toHaveFocus();
    expect(screen.getByLabelText('December 15, 2022')).toHaveFocus();
  }
);

it(
  'should use a max date value as the default focusable day when ' +
  'the selected value is greater than the max date',
  async () => {
    const user = userEvent.setup();
    render(
      <DatePicker
        locale="en"
        value="2022-12-20"
        max="2022-12-10"
        onChangeValue={jest.fn()}
      />
    );

    await user.tab(); // Move focus to the previous month button.
    await user.tab(); // Move focus to the month selector.
    await user.tab(); // Move focus to the year field.
    await user.tab(); // Move focus to the next month button.
    await user.tab(); // Move focus to the focusable day.
    expect(screen.getByLabelText('December 20, 2022')).not.toHaveFocus();
    expect(screen.getByLabelText('December 10, 2022')).toHaveFocus();
  }
);

it('<DateRangePicker /> renders without errors', () => {
  const prevMonthButtonLabel = 'prev month';
  const nextMonthButtonLabel = 'next month';
  const monthSelectLabel = 'month';
  const yearInputLabel = 'year';

  render(
    <DateRangePicker
      locale="en"
      prevMonthButtonLabel={prevMonthButtonLabel}
      nextMonthButtonLabel={nextMonthButtonLabel}
      monthSelectLabel={monthSelectLabel}
      yearInputLabel={yearInputLabel}
      value={{ start: '2022-12-05', end: '2022-12-20' }}
      onChangeValue={jest.fn()}
    />
  );

  screen.getByLabelText(prevMonthButtonLabel);
  screen.getByLabelText(nextMonthButtonLabel);
  screen.getByLabelText(monthSelectLabel);
  screen.getByLabelText(yearInputLabel);
  expect(screen.getByRole('grid')).toHaveAccessibleName('December 2022');
  expect(screen.getAllByRole('columnheader')).toHaveLength(DAYS_IN_WEEK);
  expect(screen.getAllByRole('gridcell')).toHaveLength(DAYS_IN_WEEK * 5);
  expect(screen.getByLabelText('December 5, 2022'))
    .toHaveAttribute('tabindex', '0');
  expect(screen.getByLabelText('December 20, 2022'))
    .toHaveAttribute('tabindex', '-1');
});

it('can select date range using keyboard', async () => {
  const user = userEvent.setup();
  const onChangeValueMock = jest.fn();
  render(
    <DateRangePicker
      locale="en"
      value={null}
      onChangeValue={onChangeValueMock}
    />
  );

  await user.tab(); // Move focus to the previous month button.
  await user.tab(); // Move focus to the month selector.
  await user.tab(); // Move focus to the year field.
  await user.tab(); // Move focus to the next month button.
  await user.tab(); // Move focus to the focusable day.
  await user.keyboard('{ArrowLeft}'); // Move focus prev day.
  await user.keyboard(' ');
  await user.keyboard('{ArrowRight}');
  await user.keyboard('{ArrowRight}');
  await user.keyboard('{ArrowRight}');
  await user.keyboard('{Enter}');

  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
  const end = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 2);
  expect(onChangeValueMock).toHaveBeenCalledTimes(1);
  expect(onChangeValueMock).toHaveBeenNthCalledWith(1, {
    start: toDateISO(start),
    end: toDateISO(end),
  });
});

it('can select date range using mouse', async () => {
  const user = userEvent.setup();
  const value = { start: '2022-12-05', end: '2022-12-20' };
  const onChangeValueMock = jest.fn();
  render(
    <DateRangePicker
      locale="en"
      value={value}
      onChangeValue={onChangeValueMock}
    />
  );

  await user.click(screen.getByLabelText('December 11, 2022'));
  await user.click(screen.getByLabelText('December 6, 2022'));

  expect(onChangeValueMock).toHaveBeenCalledTimes(1);
  expect(onChangeValueMock).toHaveBeenNthCalledWith(1, {
    start: '2022-12-06',
    end: '2022-12-11',
  });
});
