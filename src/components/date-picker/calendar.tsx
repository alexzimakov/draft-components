import { useState } from 'react';
import { classNames } from '../../lib/react-helpers.js';
import { type Weekday, getStartOfDay } from './date-helpers.js';
import { CalendarHeader, type CalendarHeaderProps } from './calendar-header.js';
import { CalendarGrid, type CalendarGridProps } from './calendar-grid.js';

type CalendarHeaderPassedProps = Pick<CalendarHeaderProps,
  | 'locale'
  | 'nextMonthButtonLabel'
  | 'prevMonthButtonLabel'
  | 'monthSelectLabel'
  | 'yearInputLabel'
>;

type CalendarGridPassedProps = Pick<CalendarGridProps,
  | 'minDate'
  | 'maxDate'
  | 'getDayProps'
  | 'onHoverDay'
  | 'onFocusDay'
  | 'onSelectDay'
>;

export type CalendarProps = CalendarHeaderPassedProps & CalendarGridPassedProps & {
  className?: string;
  weekStartsOn?: Weekday;
  defaultFocusDay?: Date | null;
  onFocusDay?: (date: Date) => void;
};

export function Calendar({
  className,
  defaultFocusDay,
  minDate,
  maxDate,
  locale,
  weekStartsOn,
  nextMonthButtonLabel,
  prevMonthButtonLabel,
  getDayProps,
  onHoverDay,
  onFocusDay,
  onSelectDay,
}: CalendarProps) {
  const [focusDay, setFocusDay] = useState(() => {
    const focusDate = getStartOfDay(defaultFocusDay ?? new Date());
    if (minDate && focusDate < minDate) {
      return minDate;
    }
    if (maxDate && focusDate > maxDate) {
      return maxDate;
    }
    return focusDate;
  });

  return (
    <div className={classNames('dc-calendar', className)}>
      <CalendarHeader
        focusDay={focusDay}
        onChangeFocusDay={setFocusDay}
        locale={locale}
        nextMonthButtonLabel={nextMonthButtonLabel}
        prevMonthButtonLabel={prevMonthButtonLabel}
      />
      <CalendarGrid
        focusDay={focusDay}
        minDate={minDate}
        maxDate={maxDate}
        locale={locale}
        weekStartsOn={weekStartsOn}
        getDayProps={getDayProps}
        onHoverDay={onHoverDay}
        onFocusDay={onFocusDay}
        onSelectDay={onSelectDay}
        onChangeFocusDay={setFocusDay}
      />
    </div>
  );
}
