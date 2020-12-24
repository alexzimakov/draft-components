import * as React from 'react';
import { classNames } from '../../lib';

export type TextInputHtmlAttrs = Omit<
  React.ComponentPropsWithoutRef<'input'>,
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
  | 'size'
  | 'src'
  | 'step'
  | 'type'
  | 'width'
>;

export interface TextFieldProps extends TextInputHtmlAttrs {
  type?: 'email' | 'password' | 'search' | 'tel' | 'text' | 'url';
  size?: 'sm' | 'md' | 'lg';
  isInvalid?: boolean;
  hasFullWidth?: boolean;
  leadingAddOn?: React.ReactNode;
  trailingAddOn?: React.ReactNode;
}

export const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  function TextField(
    {
      size = 'md',
      isInvalid,
      hasFullWidth,
      leadingAddOn,
      trailingAddOn,
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
        className={classNames(className, 'dc-base-control', 'dc-text-field', {
          'dc-base-control_disabled': disabled,
          'dc-base-control_focused': hasFocus,
          'dc-base-control_invalid': isInvalid,
          'dc-base-control_full_width': hasFullWidth,
          'dc-text-field_has_leading-add-on': leadingAddOn,
          'dc-text-field_has_trailing-add-on': trailingAddOn,
          [`dc-base-control_size_${size}`]: size,
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
