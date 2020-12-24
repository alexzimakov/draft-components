import * as React from 'react';
import { classNames } from '../../lib';

export type SelectionControlHtmlAttrs = Omit<
  React.ComponentPropsWithoutRef<'div'>,
  'children'
>;

export interface SelectionControlBaseProps {
  label?: React.ReactNode;
  description?: React.ReactNode;
}

// prettier-ignore
export interface SelectionControlProps extends SelectionControlBaseProps, SelectionControlHtmlAttrs {
  children: React.ReactElement | React.ReactElement[];
  isDisabled?: boolean;
}

export function SelectionControl({
  children,
  label,
  description,
  isDisabled,
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
