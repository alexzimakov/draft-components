import { ComponentPropsWithoutRef, ReactNode } from 'react';
import { classNames } from '../../lib/react-helpers';

export type SelectionControlHtmlAttrs = Omit<ComponentPropsWithoutRef<'div'>,
  'children'>;

export interface SelectionControlBaseProps {
  label?: ReactNode;
  description?: ReactNode;
}

export interface SelectionControlProps extends SelectionControlBaseProps, SelectionControlHtmlAttrs {
  children: JSX.Element | JSX.Element[];
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
        {label && <span className="dc-selection-control__label">{label}</span>}
      </label>

      {description && (
        <div className="dc-selection-control__description">{description}</div>
      )}
    </div>
  );
}
