import * as React from 'react';
import { classNames } from '../../lib/class-names';

export type SelectionControlProps = {
  children: React.ReactElement | React.ReactElement[];
  label?: React.ReactNode;
  description?: React.ReactNode;
  isDisabled?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

export function SelectionControl({
  children,
  label,
  description,
  isDisabled,

  // Standard HTML Attributes
  className,
  ...props
}: SelectionControlProps) {
  return (
    <div
      {...props}
      className={classNames(className, 'dc-selection-control', {
        'dc-selection-control_disabled': isDisabled,
      })}
    >
      <label className="dc-selection-control__body">
        {children}
        {label ? (
          <span className="dc-selection-control__label">{label}</span>
        ) : null}
      </label>
      {description ? (
        <div className="dc-selection-control__description">{description}</div>
      ) : null}
    </div>
  );
}
