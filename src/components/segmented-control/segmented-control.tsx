import * as React from 'react';
import { SegmentedControlItem } from './segmented-control-item';
import { classNames } from '../../lib';

export interface SegmentedControlProps
  extends React.ComponentPropsWithoutRef<'div'> {
  size?: 'sm' | 'md' | 'lg';
}

export function SegmentedControl({
  size = 'md',
  className,
  children,
  ...props
}: SegmentedControlProps) {
  return (
    <div
      {...props}
      role="group"
      className={classNames(
        className,
        'dc-segmented-control',
        `dc-segmented-control_size_${size}`
      )}
    >
      {children}
    </div>
  );
}

SegmentedControl.Item = SegmentedControlItem;
