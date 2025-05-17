import { type ComponentProps } from 'react';
import { classNames } from '../../lib/react-helpers.js';

type CalendarDayHTMLProps = ComponentProps<'button'>;

type CalendarDayBaseProps = {
  date: Date;
  dateISO: string;
  locale?: string;
  isSelected?: boolean;
  isDisabled?: boolean;
  isFocusable?: boolean;
  isToday?: boolean;
  isWeekend?: boolean;
  inRange?: boolean;
  isRangeStart?: boolean;
  isRangeEnd?: boolean;
};

export type CalendarDayProps =
  & CalendarDayBaseProps
  & Omit<CalendarDayHTMLProps, keyof CalendarDayBaseProps>;

export function CalendarDay({
  date,
  dateISO,
  locale,
  isSelected,
  isDisabled,
  isFocusable,
  isToday,
  isWeekend,
  inRange,
  isRangeStart,
  isRangeEnd,
  ...props
}: CalendarDayProps) {
  return (
    <button
      {...props}
      className={classNames('dc-calendar-day', {
        'dc-calendar-day_selected': isSelected,
        'dc-calendar-day_today': isToday,
        'dc-calendar-day_weekend': isWeekend,
        'dc-calendar-day_in-range': inRange,
        'dc-calendar-day_range-start': isRangeStart,
        'dc-calendar-day_range-end': isRangeEnd,
      })}
      disabled={isDisabled}
      tabIndex={isFocusable ? 0 : -1}
      data-date={dateISO}
      aria-label={date.toLocaleString(locale, { dateStyle: 'long' })}
    >
      <span className="dc-calendar-day__body">
        {date.getDate()}
      </span>
    </button>
  );
}
