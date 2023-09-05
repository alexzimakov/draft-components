import { MONTHS_IN_YEAR, addMonths, setDateMonth, setDateYear } from './date-helpers';
import { classNames } from '../../lib/react-helpers';
import { JSX, useEffect, useState } from 'react';
import { IconButton } from '../button';
import { Select } from '../select';
import { TextInput } from '../text-input';
import { ChevronLeftIcon, ChevronRightIcon } from './icons';

export type CalendarHeaderProps = {
  focusDay: Date;
  onChangeFocusDay: (date: Date) => void;
  className?: string;
  locale?: string;
  nextMonthButtonLabel?: string;
  prevMonthButtonLabel?: string;
  monthSelectLabel?: string;
  yearInputLabel?: string;
};

export function CalendarHeader({
  focusDay,
  onChangeFocusDay,
  className,
  locale,
  nextMonthButtonLabel = 'next month',
  prevMonthButtonLabel = 'previous month',
  monthSelectLabel = 'month',
  yearInputLabel = 'year',
}: CalendarHeaderProps) {
  const selectedYear = focusDay.getFullYear();
  const selectedMonth = focusDay.getMonth();
  const [year, setYear] = useState(formatYear(selectedYear));

  useEffect(() => {
    setYear((prevYear) => (parseYear(prevYear) === selectedYear
      ? prevYear
      : formatYear(selectedYear)));
  }, [selectedYear]);

  return (
    <div className={classNames('dc-calendar__header', className)}>
      <IconButton
        className="dc-calendar-prev-month"
        size="sm"
        aria-label={prevMonthButtonLabel}
        onClick={() => onChangeFocusDay(addMonths(focusDay, -1))}
      >
        <ChevronLeftIcon width={14} height={14} />
      </IconButton>

      <Select
        className="dc-calendar-month-select"
        aria-label={monthSelectLabel}
        size="sm"
        name="month"
        value={selectedMonth}
        onChange={(event) => {
          const month = Number(event.target.value);
          onChangeFocusDay(setDateMonth(focusDay, month));
        }}
      >
        {generateMonthOptions(locale)}
      </Select>

      <TextInput
        className="dc-calendar-year-input"
        aria-label={yearInputLabel}
        size="sm"
        sizeInChars={4}
        value={year}
        maxLength={4}
        onBlur={() => setYear(formatYear(year))}
        onChangeValue={(value) => {
          if (value.match(/^\d*$/)) {
            setYear(value);
            onChangeFocusDay(setDateYear(focusDay, parseYear(value)));
          }
        }}
      />

      <IconButton
        className="dc-calendar-next-month"
        aria-label={nextMonthButtonLabel}
        onClick={() => onChangeFocusDay(addMonths(focusDay, 1))}
      >
        <ChevronRightIcon width={14} height={14} />
      </IconButton>
    </div>
  );
}

function generateMonthOptions(locale = 'en'): JSX.Element[] {
  const options: JSX.Element[] = [];
  const date = new Date();
  for (let month = 0; month < MONTHS_IN_YEAR; month += 1) {
    date.setMonth(month);
    options.push(
      <option key={month} value={month}>
        {date.toLocaleDateString(locale, { month: 'long' })}
      </option>,
    );
  }
  return options;
}

function formatYear(year: number | string): string {
  return String(year).padStart(4, '0');
}

function parseYear(year: string): number {
  return Number(year);
}
