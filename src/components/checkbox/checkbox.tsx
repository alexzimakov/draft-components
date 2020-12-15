import * as React from 'react';
import { classNames } from '../../lib/class-names';
import { SelectionControl, SelectionControlProps } from '../selection-control';

export type CheckboxHtmlAttrs = Omit<
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

export type CheckboxProps = CheckboxHtmlAttrs &
  Pick<SelectionControlProps, 'label' | 'description'>;

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  function Checkbox(
    {
      label,
      description,

      // Standard HTML Attributes
      style,
      className,
      disabled,
      ...props
    },
    ref
  ) {
    return (
      <SelectionControl
        className={classNames(className, 'dc-checkbox')}
        style={style}
        label={label}
        description={description}
        isDisabled={disabled}
      >
        <input
          {...props}
          ref={ref}
          className="dc-checkbox__input"
          type="checkbox"
          disabled={disabled}
        />
        <span className="dc-checkbox__check" aria-hidden={true}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="dc-checkbox__check-icon"
            viewBox="0 0 24 24"
            width={24}
            height={24}
            fill="none"
            stroke="currentColor"
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </span>
      </SelectionControl>
    );
  }
);
