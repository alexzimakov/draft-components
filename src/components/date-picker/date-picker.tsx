import { ReactNodeArray, useState } from 'react';
import {
  addDays,
  DAYS_IN_WEEK,
  formatISO,
  getDayOfWeek,
  getDaysInMonth,
  getEndOfMonth,
  getStartOfMonth,
  isSameDay,
  LAST_DAY_OF_WEEK,
  toDate,
} from '../../lib/date-helpers';
import { Calendar } from './calendar';
import { CalendarRow } from './calendar-row';
import { CalendarDay } from './calendar-day';

export interface DatePickerProps {
  locale?: string;
  nextYearButtonLabel?: string;
  nextMonthButtonLabel?: string;
  prevYearButtonLabel?: string;
  prevMonthButtonLabel?: string;
  date: string | null;

  onChangeDate(isoDate: string): void;
}

export function DatePicker({
  locale,
  nextYearButtonLabel,
  nextMonthButtonLabel,
  prevYearButtonLabel,
  prevMonthButtonLabel,
  date: selectedISODate,
  onChangeDate,
}: DatePickerProps) {
  const selectedDate = selectedISODate ? toDate(selectedISODate) : null;

  const currentDate = new Date();
  const [focusDate, setFocusDate] = useState(selectedDate
    ? selectedDate
    : getStartOfMonth(currentDate),
  );
  const firstDate = getStartOfMonth(focusDate);
  const lastDate = getEndOfMonth(focusDate);
  const firstWeekday = getDayOfWeek(firstDate);
  const lastWeekday = getDayOfWeek(lastDate);
  const daysInMonth = getDaysInMonth(focusDate);
  const weeksCount = Math.ceil((firstWeekday + daysInMonth) / DAYS_IN_WEEK);

  const handleDayPick = (day: Date) => {
    setFocusDate(day);
    onChangeDate(formatISO(day));
  };

  let date = firstDate;
  let renderedWeeks: ReactNodeArray = [];
  for (let w = 0; w < weeksCount; w += 1) {
    const renderedDays: ReactNodeArray = [];

    let d;
    if (w === 0) {
      d = firstWeekday;
    } else if (w === weeksCount - 1) {
      d = LAST_DAY_OF_WEEK - lastWeekday;
    } else {
      d = 0;
    }

    for (; d < DAYS_IN_WEEK; d += 1) {
      renderedDays.push(
        <CalendarDay
          key={`day-${formatISO(date)}`}
          day={date}
          isCurrent={isSameDay(currentDate, date)}
          isFocused={isSameDay(focusDate, date)}
          isSelected={selectedDate ? isSameDay(selectedDate, date) : false}
          onPick={handleDayPick}
        />,
      );

      date = addDays(date, 1);
    }

    renderedWeeks.push(
      <CalendarRow key={`week-${w}`}>{renderedDays}</CalendarRow>,
    );
  }

  return (
    <div className="dc-date-picker">
      <Calendar
        locale={locale}
        nextYearButtonLabel={nextYearButtonLabel}
        nextMonthButtonLabel={nextMonthButtonLabel}
        prevYearButtonLabel={prevYearButtonLabel}
        prevMonthButtonLabel={prevMonthButtonLabel}
        focusDate={focusDate}
        onChangeFocusDate={setFocusDate}
      >
        {renderedWeeks}
      </Calendar>
    </div>
  );
}

