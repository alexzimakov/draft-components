import { classNames } from '../../lib/react-helpers';

export type CalendarDayProps = {
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
}: CalendarDayProps) {
  return (
    <button
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
      <span
        style={{ pointerEvents: 'none' }}
        className="dc-calendar-day__body"
      >
        {date.getDate()}
      </span>
    </button>
  );
}
