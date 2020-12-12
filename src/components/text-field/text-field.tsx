import * as React from 'react';
import { classNames } from '../../lib/class-names';

export type TextInputHtmlAttrs = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  | 'accept'
  | 'alt'
  | 'capture'
  | 'checked'
  | 'defaultChecked'
  | 'formAction'
  | 'formEncType'
  | 'formMethod'
  | 'formNoValidate'
  | 'formTarget'
  | 'height'
  | 'max'
  | 'min'
  | 'src'
  | 'step'
  | 'width'
>;

export type TextFieldProps = {
  type?: 'email' | 'password' | 'search' | 'tel' | 'text' | 'url';
  size?: 'sm' | 'lg';
  isInvalid?: boolean;
  hasFullWidth?: boolean;
  leadingAddOn?: React.ReactNode;
  trailingAddOn?: React.ReactNode;
} & TextInputHtmlAttrs;

export const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  function TextField(
    {
      size,
      isInvalid,
      hasFullWidth,
      leadingAddOn,
      trailingAddOn,

      // Standard HTML Attributes
      style,
      className,
      type = 'text',
      disabled,
      onFocus,
      onBlur,
      ...props
    },
    ref
  ) {
    const [hasFocus, setHasFocus] = React.useState(false);

    return (
      <div
        style={style}
        className={classNames(className, 'dc-text-field', {
          'dc-text-field_has_focus': hasFocus,
          'dc-text-field_size_sm': size === 'sm',
          'dc-text-field_size_lg': size === 'lg',
          'dc-text-field_invalid': isInvalid,
          'dc-text-field_disabled': disabled,
          'dc-text-field_has_full-width': hasFullWidth,
          'dc-text-field_has_leading-add-on': Boolean(leadingAddOn),
          'dc-text-field_has_trailing-add-on': Boolean(trailingAddOn),
        })}
      >
        {leadingAddOn ? (
          <span className="dc-text-field__leading-add-on">{leadingAddOn}</span>
        ) : null}
        <input
          className="dc-text-field__input"
          ref={ref}
          type={type}
          disabled={disabled}
          onFocus={(event) => {
            setHasFocus(true);
            onFocus?.(event);
          }}
          onBlur={(event) => {
            setHasFocus(false);
            onBlur?.(event);
          }}
          {...props}
        />
        {trailingAddOn ? (
          <span className="dc-text-field__trailing-add-on">
            {trailingAddOn}
          </span>
        ) : null}
      </div>
    );
  }
);
