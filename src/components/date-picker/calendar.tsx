import { ReactNodeArray, useMemo } from 'react';
import { classNames } from '../../lib/react-helpers';
import { KeyCode } from '../../lib/keyboard-helpers';
import { uniqueId } from '../../lib/util';
import { CalendarRow } from './calendar-row';
import { CalendarHeader } from './calendar-header';
import {
  addDays,
  addMonths,
  addYears,
  DAYS_IN_WEEK,
  getEndOfWeek,
  getStartOfWeek,
} from '../../lib/date-helpers';

export interface CalendarProps {
  className?: string;
  locale?: string;
  nextYearButtonLabel?: string;
  nextMonthButtonLabel?: string;
  prevYearButtonLabel?: string;
  prevMonthButtonLabel?: string;
  children: ReactNodeArray;
  focusDate: Date;

  onChangeFocusDate(focusDate: Date): void;
}

const daysOfWeek = [
  new Date('2021-01-04'), // Monday
  new Date('2021-01-05'), // Tuesday
  new Date('2021-01-06'), // Wednesday
  new Date('2021-01-07'), // Thursday
  new Date('2021-01-08'), // Friday
  new Date('2021-01-09'), // Saturday
  new Date('2021-01-10'), // Sunday
];

export function Calendar({
  className,
  locale,
  nextYearButtonLabel,
  nextMonthButtonLabel,
  prevYearButtonLabel,
  prevMonthButtonLabel,
  children,
  focusDate,
  onChangeFocusDate,
}: CalendarProps) {
  const headerId = useMemo(() => uniqueId('dc-calendar-'), []);

  const intl = useMemo(() => new Intl.DateTimeFormat(locale, {
    weekday: 'short',
  }), [locale]);

  return (
    <div
      className={classNames(className, 'dc-calendar')}
      role="grid"
      aria-labelledby={headerId}
    >
      <CalendarHeader
        id={headerId}
        locale={locale}
        nextYearButtonLabel={nextYearButtonLabel}
        nextMonthButtonLabel={nextMonthButtonLabel}
        prevYearButtonLabel={prevYearButtonLabel}
        prevMonthButtonLabel={prevMonthButtonLabel}
        focusDate={focusDate}
        onChangeFocusDate={onChangeFocusDate}
      />

      <div role="rowgroup">
        <CalendarRow isHead={true}>
          {daysOfWeek.map((weekday, index) => (
            <div
              key={`weekday-${index}`}
              role="columnheader"
              className="dc-calendar__cell-header"
            >
              {intl.format(weekday)}
            </div>
          ))}
        </CalendarRow>
      </div>

      <div
        role="rowgroup"
        className="dc-calendar__row-group"
        onKeyDown={event => {
          let newFocusDate: Date | undefined;
          if (event.key === KeyCode.arrowRight) {
            newFocusDate = addDays(focusDate, 1);
          } else if (event.key === KeyCode.arrowLeft) {
            newFocusDate = addDays(focusDate, -1);
          } else if (event.key === KeyCode.arrowDown) {
            newFocusDate = addDays(focusDate, DAYS_IN_WEEK);
          } else if (event.key === KeyCode.arrowUp) {
            newFocusDate = addDays(focusDate, -DAYS_IN_WEEK);
          } else if (event.key === KeyCode.home) {
            newFocusDate = getStartOfWeek(focusDate);
          } else if (event.key === KeyCode.end) {
            newFocusDate = getEndOfWeek(focusDate);
          } else if (event.key === KeyCode.pageUp) {
            newFocusDate = event.shiftKey
              ? addYears(focusDate, -1)
              : addMonths(focusDate, -1);
          } else if (event.key === KeyCode.pageDown) {
            newFocusDate = event.shiftKey
              ? addYears(focusDate, 1)
              : addMonths(focusDate, 1);
          }

          if (newFocusDate) {
            event.preventDefault();
            onChangeFocusDate(newFocusDate);
          }
        }}
      >
        {children}
      </div>
    </div>
  );
}
