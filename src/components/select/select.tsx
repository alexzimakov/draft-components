import * as React from 'react';
import { classNames } from '../../lib/class-names';

export type SelectHtmlAttrs = Omit<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  'size'
>;

export type SelectProps = {
  size?: 'sm' | 'lg';
  isInvalid?: boolean;
  hasFullWidth?: boolean;
} & SelectHtmlAttrs;

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  function Select({ className, size, isInvalid, hasFullWidth, ...props }, ref) {
    return (
      <select
        {...props}
        ref={ref}
        className={classNames(className, 'dc-base-control', 'dc-select', {
          'dc-base-control_size_sm': size === 'sm',
          'dc-base-control_size_lg': size === 'lg',
          'dc-base-control_invalid': isInvalid,
          'dc-base-control_full_width': hasFullWidth,
        })}
      />
    );
  }
);
