import { isFunction } from '../../lib/guards';
import { classNames } from '../../lib/react-helpers';
import { PlainDate } from '../../lib/plain-date';

export interface CalendarDayProps {
  className?: string;
  isCurrent?: boolean;
  isFocusable?: boolean;
  isSelected?: boolean;
  isInRange?: boolean;
  isRangeStart?: boolean;
  isRangeEnd?: boolean;
  isInRangePreview?: boolean;
  isRangePreviewStart?: boolean;
  isRangePreviewEnd?: boolean;
  date: PlainDate;
  onPick(day: PlainDate): void;
  onHover?(day: PlainDate): void;
}

export function CalendarDay({
  className,
  isCurrent,
  isFocusable,
  isSelected,
  isInRange,
  isRangeStart,
  isRangeEnd,
  isInRangePreview,
  isRangePreviewStart,
  isRangePreviewEnd,
  date,
  onPick,
  onHover,
}: CalendarDayProps) {
  return (
    <div
      className={classNames(
        className,
        'dc-calendar-day',
        isCurrent && 'dc-calendar-day_current',
        isSelected && 'dc-calendar-day_selected',
        isInRange && 'dc-calendar-day_in-range',
        isRangeStart && 'dc-calendar-day_range-start',
        isRangeEnd && 'dc-calendar-day_range-end',
        isInRangePreview && 'dc-calendar-day_in-range-preview',
        isRangePreviewStart && 'dc-calendar-day_range-preview-start',
        isRangePreviewEnd && 'dc-calendar-day_range-preview-end',
      )}
      role="gridcell"
    >
      {/* eslint-disable-next-line jsx-a11y/role-supports-aria-props */}
      <button
        className="dc-calendar-day__btn"
        tabIndex={isFocusable ? 0 : -1}
        aria-selected={isSelected}
        onClick={() => onPick(date)}
        onMouseEnter={() => isFunction(onHover) && onHover(date)}
      >
        {date.day}
      </button>
    </div>
  );
}
