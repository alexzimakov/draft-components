import { forwardRef } from 'react';
import { classNames } from '../../lib/react-helpers';
import { SelectionControl } from '../selection-control';
import type { ComponentPropsWithRef } from 'react';
import type { SelectionControlBaseProps } from '../selection-control';

export type RadioButtonHtmlAttrs = Omit<
  ComponentPropsWithRef<'input'>,
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

export const RadioButton = forwardRef<HTMLInputElement, RadioButtonProps>(
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
