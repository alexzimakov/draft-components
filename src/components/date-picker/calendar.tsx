import { useState } from 'react';
import { classNames } from '../../lib/react-helpers';
import { Weekday, getStartOfDay } from './date-helpers';
import { CalendarHeader, CalendarHeaderProps } from './calendar-header';
import { CalendarGrid, CalendarGridProps } from './calendar-grid';

export type CalendarProps = {
  className?: string;
  defaultFocusDay?: Date | null;
  weekStartsOn?: Weekday;
  onFocusDay?(date: Date): void;
} & Pick<CalendarGridProps,
  | 'minDate'
  | 'maxDate'
  | 'getDayProps'
  | 'onHoverDay'
  | 'onFocusDay'
  | 'onSelectDay'
> & Pick<CalendarHeaderProps,
  | 'locale'
  | 'nextMonthButtonLabel'
  | 'prevMonthButtonLabel'
  | 'monthSelectLabel'
  | 'yearInputLabel'
>;

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
