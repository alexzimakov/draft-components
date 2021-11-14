import { ReactNode, useEffect, useMemo, useRef } from 'react';
import { classNames } from '../../lib/react-helpers';
import { KeyCode } from '../../lib/keyboard-helpers';
import { uniqueId } from '../../lib/util';
import { CalendarRow } from './calendar-row';
import { CalendarHeader } from './calendar-header';
import { PlainDate } from '../../lib/plain-date';

export interface CalendarProps {
  className?: string;
  locale?: string;
  nextYearButtonLabel?: string;
  nextMonthButtonLabel?: string;
  prevYearButtonLabel?: string;
  prevMonthButtonLabel?: string;
  children: ReactNode[];
  focusDate: PlainDate;
  onChangeFocusDate(focusDate: PlainDate): void;
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
  const isFocused = useRef(false);
  const gridRef = useRef<HTMLDivElement>(null);
  const headerId = useRef('');
  const intl = useMemo(() => new Intl.DateTimeFormat(locale, {
    weekday: 'short',
  }), [locale]);

  useEffect(() => {
    if (gridRef.current && isFocused.current) {
      const dayButtonEl = gridRef.current.querySelector('[tabindex="0"]');
      if (dayButtonEl instanceof HTMLElement) {
        dayButtonEl.focus();
      }
    }
  }, [focusDate]);

  if (!headerId.current) {
    headerId.current = uniqueId('dc-calendar-');
  }

  return (
    <div
      className={classNames(className, 'dc-calendar')}
      role="grid"
      aria-labelledby={headerId.current}
    >
      <CalendarHeader
        id={headerId.current}
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
        ref={gridRef}
        role="rowgroup"
        className="dc-calendar__row-group"
        onFocus={() => {
          isFocused.current = true;
        }}
        onBlur={() => {
          isFocused.current = false;
        }}
        onKeyDown={event => {
          let newFocusDate: PlainDate | null = null;
          if (event.key === KeyCode.arrowRight) {
            newFocusDate = focusDate.addDays(1);
          } else if (event.key === KeyCode.arrowLeft) {
            newFocusDate = focusDate.addDays(-1);
          } else if (event.key === KeyCode.arrowDown) {
            newFocusDate = focusDate.addWeeks(1);
          } else if (event.key === KeyCode.arrowUp) {
            newFocusDate = focusDate.addWeeks(-1);
          } else if (event.key === KeyCode.home) {
            newFocusDate = focusDate.startOfWeek;
          } else if (event.key === KeyCode.end) {
            newFocusDate = focusDate.endOfWeek;
          } else if (event.key === KeyCode.pageUp) {
            newFocusDate = event.shiftKey
              ? focusDate.addYears(-1)
              : focusDate.addMonths(-1);
          } else if (event.key === KeyCode.pageDown) {
            newFocusDate = event.shiftKey
              ? focusDate.addYears(1)
              : focusDate.addMonths(1);
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
