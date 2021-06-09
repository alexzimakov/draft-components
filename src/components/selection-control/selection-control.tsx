import { classNames } from '../../lib/react-helpers';
import type { ComponentPropsWithoutRef, ReactNode, ReactElement } from 'react';

export type SelectionControlHtmlAttrs = Omit<
  ComponentPropsWithoutRef<'div'>,
  'children'
>;

export interface SelectionControlBaseProps {
  label?: ReactNode;
  description?: ReactNode;
}

export interface SelectionControlProps
  extends SelectionControlBaseProps,
    SelectionControlHtmlAttrs {
  children: ReactElement | ReactElement[];
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
