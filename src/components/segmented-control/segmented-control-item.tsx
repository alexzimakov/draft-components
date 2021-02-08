import * as React from 'react';
import { classNames } from '../../lib';

export interface SegmentedControlItemProps
  extends React.ComponentPropsWithoutRef<'button'> {
  isActive?: boolean;
}

export function SegmentedControlItem({
  isActive,
  className,
  type = 'button',
  children,
  ...props
}: SegmentedControlItemProps) {
  return (
    <button
      {...props}
      className={classNames(className, 'dc-segmented-control__item', {
        'dc-segmented-control__item_active': isActive,
      })}
      type={type}
    >
      {children}
    </button>
  );
}
