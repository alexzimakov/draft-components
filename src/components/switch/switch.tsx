import * as React from 'react';
import { classNames } from '../../lib/react-helpers';
import { SelectionControl } from '../selection-control';
import { CheckboxProps } from '../checkbox';

export const Switch = React.forwardRef<HTMLInputElement, CheckboxProps>(
  function Switch(
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
          className="dc-switch__input"
          ref={ref}
          type="checkbox"
          disabled={disabled}
        />
        <span className="dc-switch__check" aria-hidden={true} />
      </SelectionControl>
    );
  }
);
