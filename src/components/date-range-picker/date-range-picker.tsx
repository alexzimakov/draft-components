import { ReactNode, useEffect, useState } from 'react';
import { Calendar } from '../calendar/calendar';
import { CalendarRow } from '../calendar/calendar-row';
import { CalendarDay } from '../calendar/calendar-day';
import { PlainDate } from '../../lib/plain-date';
import { ISODateRange, PlainDateRange } from '../../lib/plain-date-range';

export interface DateRangePickerProps {
  locale?: string;
  nextYearButtonLabel?: string;
  nextMonthButtonLabel?: string;
  prevYearButtonLabel?: string;
  prevMonthButtonLabel?: string;
  footer?: ReactNode;
  value: ISODateRange | null;
  onChangeValue(isoDateRange: ISODateRange): void;
}

export function DateRangePicker({
  locale,
  nextYearButtonLabel,
  nextMonthButtonLabel,
  prevYearButtonLabel,
  prevMonthButtonLabel,
  footer,
  value,
  onChangeValue,
}: DateRangePickerProps) {
  const selectedRange = value ? PlainDateRange.fromISODateRange(value) : null;

  const [start, setStart] = useState<PlainDate | null>(null);
  const [end, setEnd] = useState<PlainDate | null>(null);
  const newRange = start && end ? new PlainDateRange(start, end) : null;

  const currentDate = PlainDate.now();
  const [focusDate, setFocusDate] = useState(
    selectedRange ? selectedRange.start : currentDate.startOfMonth
  );
  const firstDate = focusDate.startOfMonth;
  const lastDate = focusDate.endOfMonth;
  const firstWeekday = firstDate.weekday;
  const lastWeekday = lastDate.weekday;
  const weeksCount = Math.ceil(
    (firstWeekday + focusDate.lastDay) / PlainDate.DAYS_IN_WEEK
  );

  const handleDayPick = (day: PlainDate) => {
    setFocusDate(day);
    if (start) {
      onChangeValue(new PlainDateRange(start, day).toISODateRange());
      setStart(null);
      setEnd(null);
    } else {
      onChangeValue(new PlainDateRange(day, day).toISODateRange());
      setStart(day);
    }
  };

  const handleDayHover = (day: PlainDate) => {
    if (start) {
      setEnd(day);
    }
  };

  let date = firstDate;
  const renderedWeeks: ReactNode[] = [];
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
      let isSelected = false;
      if (start) {
        isSelected = date.equals(start);
      } else if (selectedRange) {
        isSelected =
          date.equals(selectedRange.start) || date.equals(selectedRange.end);
      }

      let isInRange = false;
      let isRangeStart = false;
      let isRangeEnd = false;

      let isInRangePreview = false;
      let isRangePreviewStart = false;
      let isRangePreviewEnd = false;

      if (newRange) {
        isInRangePreview = newRange.contains(date);
        isRangePreviewStart = date.equals(newRange.start);
        isRangePreviewEnd = date.equals(newRange.end);
      } else if (start) {
        isInRangePreview = date.equals(start);
        isRangePreviewStart = isInRangePreview;
        isRangePreviewEnd = isInRangePreview;
      } else if (selectedRange) {
        isInRange = selectedRange.contains(date);
        isRangeStart = date.equals(selectedRange.start);
        isRangeEnd = date.equals(selectedRange.end);
      }

      renderedDays.push(
        <CalendarDay
          key={`day-${date.toISOString()}`}
          date={date}
          isCurrent={date.equals(currentDate)}
          isFocusable={date.equals(focusDate)}
          isSelected={isSelected}
          isInRange={isInRange}
          isRangeStart={isRangeStart}
          isRangeEnd={isRangeEnd}
          isInRangePreview={isInRangePreview}
          isRangePreviewStart={isRangePreviewStart}
          isRangePreviewEnd={isRangePreviewEnd}
          onPick={handleDayPick}
          onHover={handleDayHover}
        />
      );

      date = date.addDays(1);
    }

    renderedWeeks.push(
      <CalendarRow key={`week-${w}`}>{renderedDays}</CalendarRow>
    );
  }

  useEffect(() => {
    if (value?.start) {
      setFocusDate((focusDate) =>
        focusDate.toISOString() !== value.start
          ? PlainDate.fromISODate(value.start)
          : focusDate
      );
    }
  }, [value?.start]);

  return (
    <div className="dc-date-picker">
      <Calendar
        locale={locale}
        nextYearButtonLabel={nextYearButtonLabel}
        nextMonthButtonLabel={nextMonthButtonLabel}
        prevYearButtonLabel={prevYearButtonLabel}
        prevMonthButtonLabel={prevMonthButtonLabel}
        focusDate={focusDate}
        onChangeFocusDate={(focusDate) => {
          setFocusDate(focusDate);
          if (start) {
            setEnd(focusDate);
          }
        }}
      >
        {renderedWeeks}
      </Calendar>
      {footer && <div className="dc-date-picker__footer">{footer}</div>}
    </div>
  );
}
