import { CheckboxProps } from '../checkbox';
import { forwardRef } from 'react';
import { isFunction } from '../../lib/guards';
import { classNames } from '../../lib/react-helpers';
import { SelectionControl } from '../selection-control';

export const Switch = forwardRef<HTMLInputElement, CheckboxProps>(
  function Switch(
    {
      label,
      description,
      className,
      style,
      disabled,
      onChange,
      onCheck,
      ...props
    },
    ref,
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
          onChange={(event) => {
            isFunction(onChange) && onChange(event);
            isFunction(onCheck) && onCheck(event.target.checked);
          }}
        />
        <span className="dc-switch__check" aria-hidden={true} />
      </SelectionControl>
    );
  },
);
