import { ReactNodeArray } from 'react';
import { classNames } from '../../lib/react-helpers';

export interface CalendarWeekProps {
  className?: string;
  isHead?: boolean;
  children: ReactNodeArray;
}

export function CalendarRow({
  className,
  isHead,
  children,
}: CalendarWeekProps) {
  return (
    <div
      className={classNames(
        className,
        'dc-calendar-row',
        isHead && 'dc-calendar-row_head',
      )}
      role="row"
    >
      {children}
    </div>
  );
}
