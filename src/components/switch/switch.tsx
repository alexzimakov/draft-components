import * as React from 'react';
import { CheckboxHtmlAttrs } from '../checkbox';
import { SelectionControl, SelectionControlProps } from '../selection-control';
import { classNames } from '../../lib/class-names';

export type SwitchProps = CheckboxHtmlAttrs &
  Pick<SelectionControlProps, 'label' | 'description'>;

export const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  function Switch(
    {
      label,
      description,

      // Standard HTML Attributes
      className,
      style,
      disabled,
      ...props
    },
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
  }
);
