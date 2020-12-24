import * as React from 'react';
import { ComponentWithForwardRef } from '../../common-types';
import { CheckboxProps } from '../checkbox';
import { SelectionControl } from '../selection-control';
import { classNames } from '../../lib';

export const Switch: ComponentWithForwardRef<
  HTMLInputElement,
  CheckboxProps
> = React.forwardRef<HTMLInputElement, CheckboxProps>(function Switch(
  { label, description, className, style, disabled, ...props },
  ref
) {
  return (
    <SelectionControl
      className={classNames(className, 'dc-switch')}
      style={style}
      label={label}
      description={description}
      isDisabled={disabled}
    >
      <input
        {...props}
        ref={ref}
        className="dc-switch__input"
        type="checkbox"
        disabled={disabled}
      />
      <span className="dc-switch__check" aria-hidden={true} />
    </SelectionControl>
  );
});
