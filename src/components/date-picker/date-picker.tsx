import { ReactNode, ReactNodeArray, useEffect, useState } from 'react';
import { ISODate, PlainDate } from '../../lib/plain-date';
import { Calendar } from '../calendar/calendar';
import { CalendarRow } from '../calendar/calendar-row';
import { CalendarDay } from '../calendar/calendar-day';

export interface DatePickerProps {
  locale?: string;
  nextYearButtonLabel?: string;
  nextMonthButtonLabel?: string;
  prevYearButtonLabel?: string;
  prevMonthButtonLabel?: string;
  footer?: ReactNode;
  value: ISODate | null;
  onChangeValue(isoDate: ISODate): void;
}

export function DatePicker({
  locale,
  nextYearButtonLabel,
  nextMonthButtonLabel,
  prevYearButtonLabel,
  prevMonthButtonLabel,
  footer,
  value,
  onChangeValue,
}: DatePickerProps) {
  const selectedDate = value ? PlainDate.fromISODate(value) : null;

  const currentDate = PlainDate.now();
  const [focusDate, setFocusDate] = useState(selectedDate
    ? selectedDate
    : currentDate.startOfMonth,
  );
  const firstDate = focusDate.startOfMonth;
  const lastDate = focusDate.endOfMonth;
  const firstWeekday = firstDate.weekday;
  const lastWeekday = lastDate.weekday;
  const weeksCount = Math.ceil(
    (firstWeekday + focusDate.lastDay) / PlainDate.DAYS_IN_WEEK,
  );

  const handleDayPick = (day: PlainDate) => {
    setFocusDate(day);
    onChangeValue(day.toISOString());
  };

  let date = firstDate;
  let renderedWeeks: ReactNodeArray = [];
  for (let w = 0; w < weeksCount; w += 1) {
    const renderedDays: ReactNode[] = [];

    let d;
    if (w === 0) {
      d = firstWeekday;
    } else if (w === weeksCount - 1) {
      d = PlainDate.LAST_WEEKDAY - lastWeekday;
    } else {
      d = 0;
    }

    for (; d < PlainDate.DAYS_IN_WEEK; d += 1) {
      renderedDays.push(
        <CalendarDay
          key={`day-${date.toISOString()}`}
          date={date}
          isCurrent={date.equals(currentDate)}
          isFocused={date.equals(focusDate)}
          isSelected={selectedDate ? date.equals(selectedDate) : false}
          onPick={handleDayPick}
        />,
      );

      date = date.addDays(1);
    }

    renderedWeeks.push(
      <CalendarRow key={`week-${w}`}>{renderedDays}</CalendarRow>,
    );
  }

  useEffect(() => {
    if (value) {
      setFocusDate((focusDate) => focusDate.toISOString() !== value
        ? PlainDate.fromISODate(value)
        : focusDate,
      );
    }
  }, [value]);

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
      {footer && <div className="dc-date-range-picker__footer">{footer}</div>}
    </div>
  );
}
