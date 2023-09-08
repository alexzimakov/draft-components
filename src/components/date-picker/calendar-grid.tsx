import { JSX, KeyboardEvent } from 'react';
import { KeyboardKeys } from '../../lib/keyboard-keys.js';
import {
  DAYS_IN_WEEK,
  type Weekday,
  addDays,
  addMonths,
  addYears,
  getEndOfMonth,
  getEndOfWeek,
  getStartOfMonth,
  getStartOfWeek,
  isSameDay,
  isWeekend,
  toDateISO,
} from './date-helpers.js';
import { CalendarGridHead } from './calendar-grid-head.js';
import { CalendarDay, CalendarDayProps } from './calendar-day.js';

export type GetCalendarDayProps = (date: Date) => Pick<CalendarDayProps,
  | 'isSelected'
  | 'inRange'
  | 'isRangeStart'
  | 'isRangeEnd'
>;
export type CalendarGridProps = {
  focusDay: Date;
  minDate?: Date | null;
  maxDate?: Date | null;
  locale?: string;
  weekStartsOn?: Weekday;
  getDayProps?: GetCalendarDayProps;
  onHoverDay?(date: Date): void;
  onFocusDay?(date: Date): void;
  onSelectDay(date: Date): void;
  onChangeFocusDay(date: Date): void;
};

export function CalendarGrid({
  focusDay,
  minDate,
  maxDate,
  locale,
  weekStartsOn,
  getDayProps,
  onHoverDay,
  onFocusDay,
  onSelectDay,
  onChangeFocusDay,
}: CalendarGridProps) {
  const today = new Date();
  const monthStart = getStartOfMonth(focusDay);
  const monthEnd = getEndOfMonth(focusDay);
  const startDate = getStartOfWeek(monthStart, weekStartsOn);
  const endDate = getEndOfWeek(monthEnd, weekStartsOn);

  const ariaLabel = monthStart.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
  });
  const rows: JSX.Element[] = [];
  let date = startDate;
  let week = 0;
  while (date <= endDate) {
    const columns: JSX.Element[] = [];
    const endOfWeek = getEndOfWeek(date, weekStartsOn);

    while (date <= endOfWeek) {
      const dateISO = toDateISO(date);
      const inDisplayedMonth = date >= monthStart && date <= monthEnd;

      let calendarDay: JSX.Element | null = null;
      if (inDisplayedMonth) {
        calendarDay = <CalendarDay
          {...getDayProps?.(date)}
          date={date}
          dateISO={dateISO}
          locale={locale}
          isToday={isSameDay(date, today)}
          isWeekend={isWeekend(date)}
          isFocusable={isSameDay(date, focusDay)}
          isDisabled={
            (minDate != null && date < minDate) ||
            (maxDate != null && date > maxDate)
          }
          onClick={handleSelectDay(date)}
          onMouseEnter={handleHoverDay(date)}
        />;
      }
      columns.push(<td key={dateISO} role="gridcell">{calendarDay}</td>);
      date = addDays(date, 1);
    }

    rows.push(<tr key={`week-${week}`} role="row">{columns}</tr>);
    week += 1;
  }

  function handleSelectDay(date: Date) {
    return () => {
      onChangeFocusDay(date);
      onSelectDay(date);
    };
  }

  function handleHoverDay(date: Date) {
    return () => {
      onHoverDay?.(date);
    };
  }

  function handleKeydown(event: KeyboardEvent<HTMLTableSectionElement>) {
    let newFocusDay: Date | null = null;
    if (event.code === KeyboardKeys.ArrowRight) {
      newFocusDay = addDays(focusDay, 1);
    } else if (event.key === KeyboardKeys.ArrowLeft) {
      newFocusDay = addDays(focusDay, -1);
    } else if (event.key === KeyboardKeys.ArrowDown) {
      newFocusDay = addDays(focusDay, DAYS_IN_WEEK);
    } else if (event.key === KeyboardKeys.ArrowUp) {
      newFocusDay = addDays(focusDay, -DAYS_IN_WEEK);
    } else if (event.key === KeyboardKeys.Home) {
      newFocusDay = getStartOfWeek(focusDay, weekStartsOn);
    } else if (event.key === KeyboardKeys.End) {
      newFocusDay = getEndOfWeek(focusDay, weekStartsOn);
    } else if (event.key === KeyboardKeys.PageDown) {
      newFocusDay = event.shiftKey
        ? addYears(focusDay, 1)
        : addMonths(focusDay, 1);
    } else if (event.key === KeyboardKeys.PageUp) {
      newFocusDay = event.shiftKey
        ? addYears(focusDay, -1)
        : addMonths(focusDay, -1);
    }

    if (newFocusDay) {
      event.stopPropagation();
      event.preventDefault();

      if (minDate != null && newFocusDay < minDate) {
        newFocusDay = minDate;
      }
      if (maxDate != null && newFocusDay > maxDate) {
        newFocusDay = maxDate;
      }
      onChangeFocusDay(newFocusDay);

      const gridElement = event.currentTarget;
      const dayISO = toDateISO(newFocusDay);
      setTimeout(() => {
        const dayElement = gridElement.querySelector(`[data-date="${dayISO}"]`);
        if (dayElement instanceof HTMLButtonElement) {
          dayElement.focus();

          if (newFocusDay) {
            onFocusDay?.(newFocusDay);
          }
        }
      }, 0);
    }
  }

  return (
    <table className="dc-calendar__grid" role="grid" aria-label={ariaLabel}>
      <CalendarGridHead locale={locale} weekStartsOn={weekStartsOn} />
      <tbody role="presentation" onKeyDown={handleKeydown}>{rows}</tbody>
    </table>
  );
}
