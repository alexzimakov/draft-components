import { ReactNodeArray, useState } from 'react';
import {
  addDays,
  createDateRange,
  DAYS_IN_WEEK,
  formatISO,
  formatISORange,
  getDayOfWeek,
  getDaysInMonth,
  getEndOfMonth,
  getStartOfMonth,
  isSameDay,
  ISODateRange,
  isRangeContain,
  LAST_DAY_OF_WEEK,
  toDate,
} from '../../lib/date-helpers';
import { Calendar } from './calendar';
import { CalendarRow } from './calendar-row';
import { CalendarDay } from './calendar-day';

export interface DateRangePickerProps {
  locale?: string;
  nextYearButtonLabel?: string;
  nextMonthButtonLabel?: string;
  prevYearButtonLabel?: string;
  prevMonthButtonLabel?: string;
  range: ISODateRange | null;

  onChangeRange(isoDateRange: ISODateRange): void;
}

export function DateRangePicker({
  locale,
  nextYearButtonLabel,
  nextMonthButtonLabel,
  prevYearButtonLabel,
  prevMonthButtonLabel,
  range,
  onChangeRange,
}: DateRangePickerProps) {
  const selectedRange = range ? {
    startDate: toDate(range.startDate),
    endDate: toDate(range.endDate),
  } : null;

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const newRange = startDate && endDate
    ? createDateRange(startDate, endDate)
    : null;

  const currentDate = new Date();
  const [focusDate, setFocusDate] = useState(selectedRange
    ? selectedRange.startDate
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
    if (startDate) {
      onChangeRange(formatISORange(createDateRange(startDate, day)));
      setStartDate(null);
      setEndDate(null);
    } else {
      setStartDate(day);
    }
  };

  const handleDayHover = (day: Date) => {
    if (startDate) {
      setEndDate(day);
    }
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
      let isSelected = false;
      if (startDate) {
        isSelected = isSameDay(startDate, date);
      } else if (selectedRange) {
        isSelected = (
          isSameDay(selectedRange.startDate, date) ||
          isSameDay(selectedRange.endDate, date)
        );
      }

      let isInRange = false;
      let isRangeStart = false;
      let isRangeEnd = false;
      let isInRangePreview = false;
      let isRangePreviewStart = false;
      let isRangePreviewEnd = false;
      if (newRange) {
        isInRangePreview = isRangeContain(newRange, date);
        isRangePreviewStart = isSameDay(date, newRange.startDate);
        isRangePreviewEnd = isSameDay(date, newRange.endDate);
      } else if (startDate) {
        isInRangePreview = isSameDay(date, startDate);
        isRangePreviewStart = isInRangePreview;
        isRangePreviewEnd = isInRangePreview;
      } else if (selectedRange) {
        isInRange = isRangeContain(selectedRange, date);
        isRangeStart = isSameDay(date, selectedRange.startDate);
        isRangeEnd = isSameDay(date, selectedRange.endDate);
      }

      renderedDays.push(
        <CalendarDay
          key={`day-${formatISO(date)}`}
          day={date}
          isCurrent={isSameDay(currentDate, date)}
          isFocused={isSameDay(focusDate, date)}
          isSelected={isSelected}
          isInRange={isInRange}
          isRangeStart={isRangeStart}
          isRangeEnd={isRangeEnd}
          isInRangePreview={isInRangePreview}
          isRangePreviewStart={isRangePreviewStart}
          isRangePreviewEnd={isRangePreviewEnd}
          onPick={handleDayPick}
          onHover={handleDayHover}
        />,
      );

      date = addDays(date, 1);
    }

    renderedWeeks.push(
      <CalendarRow key={`week-${w}`}>{renderedDays}</CalendarRow>,
    );
  }

  return (
    <div className="dc-date-range-picker">
      <Calendar
        locale={locale}
        nextYearButtonLabel={nextYearButtonLabel}
        nextMonthButtonLabel={nextMonthButtonLabel}
        prevYearButtonLabel={prevYearButtonLabel}
        prevMonthButtonLabel={prevMonthButtonLabel}
        focusDate={focusDate}
        onChangeFocusDate={(focusDate) => {
          setFocusDate(focusDate);
          if (startDate) {
            setEndDate(focusDate);
          }
        }}
      >
        {renderedWeeks}
      </Calendar>
    </div>
  );
}

