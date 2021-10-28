import { classNames } from '../../lib/react-helpers';
import { useEffect, useRef } from 'react';
import { isFunction } from '../../lib/guards';

export interface CalendarDayProps {
  className?: string;
  isCurrent?: boolean;
  isFocused?: boolean;
  isSelected?: boolean;
  isInRange?: boolean;
  isRangeStart?: boolean;
  isRangeEnd?: boolean;
  isInRangePreview?: boolean;
  isRangePreviewStart?: boolean;
  isRangePreviewEnd?: boolean;
  day: Date;

  onPick(day: Date): void;

  onHover?(day: Date): void;
}

export function CalendarDay({
  className,
  isCurrent,
  isFocused,
  isSelected,
  isInRange,
  isRangeStart,
  isRangeEnd,
  isInRangePreview,
  isRangePreviewStart,
  isRangePreviewEnd,
  day,
  onPick,
  onHover,
}: CalendarDayProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const buttonEl = buttonRef.current;
    if (isFocused && buttonEl) {
      buttonEl.focus();
    }
  }, [isFocused]);

  return (
    <div
      className={classNames(
        className,
        'dc-calendar-day',
        isCurrent && 'dc-calendar-day_current',
        isFocused && 'dc-calendar-day_focused',
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
        ref={buttonRef}
        className="dc-calendar-day__btn"
        tabIndex={isFocused ? 0 : -1}
        aria-selected={isSelected}
        onClick={() => onPick(day)}
        onMouseEnter={() => isFunction(onHover) && onHover(day)}
      >
        {day.getDate()}
      </button>
    </div>
  );
}
