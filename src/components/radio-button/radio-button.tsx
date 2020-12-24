import * as React from 'react';
import { ComponentWithForwardRef } from '../../common-types';
import { SelectionControl, SelectionControlProps } from '../selection-control';
import { classNames } from '../../lib';

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

export type RadioButtonProps = RadioButtonHtmlAttrs &
  Pick<SelectionControlProps, 'label' | 'description'>;

export const RadioButton: ComponentWithForwardRef<
  HTMLInputElement,
  RadioButtonProps
> = React.forwardRef<HTMLInputElement, RadioButtonProps>(function RadioButton(
  { label, description, style, className, disabled, ...props },
  ref
) {
  return (
    <SelectionControl
      className={classNames(className, 'dc-radio-button')}
      style={style}
      label={label}
      description={description}
      isDisabled={disabled}
    >
      <input
        {...props}
        ref={ref}
        className="dc-radio-button__input"
        type="radio"
        disabled={disabled}
      />
      <span className="dc-radio-button__radio" aria-hidden={true} />
    </SelectionControl>
  );
});
