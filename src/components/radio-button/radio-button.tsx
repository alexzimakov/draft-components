import * as React from 'react';
import { classNames } from '../../lib';
import {
  SelectionControl,
  SelectionControlBaseProps,
} from '../selection-control';

export type RadioButtonHtmlAttrs = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  | 'accept'
  | 'alt'
  | 'capture'
  | 'dirname'
  | 'formAction'
  | 'formEncType'
  | 'formMethod'
  | 'formNoValidate'
  | 'formTarget'
  | 'height'
  | 'max'
  | 'maxLength'
  | 'min'
  | 'minLength'
  | 'multiple'
  | 'pattern'
  | 'placeholder'
  | 'size'
  | 'src'
  | 'step'
  | 'type'
  | 'width'
>;

export interface RadioButtonProps
  extends SelectionControlBaseProps,
    RadioButtonHtmlAttrs {}

export const RadioButton = React.forwardRef<HTMLInputElement, RadioButtonProps>(
  function RadioButton(
    { label, description, style, className, disabled, ...props },
    ref
  ) {
    return (
      <SelectionControl
        className={classNames(className, 'dc-radio-btn')}
        style={style}
        label={label}
        description={description}
        isDisabled={disabled}
      >
        <input
          {...props}
          className="dc-radio-btn__input"
          ref={ref}
          type="radio"
          disabled={disabled}
        />
        <span className="dc-radio-btn__radio" aria-hidden={true} />
      </SelectionControl>
    );
  }
);
