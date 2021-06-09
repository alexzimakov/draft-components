import * as React from 'react';
import { isFunction } from '../../lib/guards';
import { classNames } from '../../lib/react-helpers';

export type TextFieldHtmlAttrs = Omit<
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

export interface TextFieldProps extends TextFieldHtmlAttrs {
  type?: 'email' | 'password' | 'search' | 'tel' | 'text' | 'url';
  size?: 'sm' | 'md' | 'lg';
  invalid?: boolean;
  fullWidth?: boolean;
  leadingAddOn?: React.ReactNode;
  trailingAddOn?: React.ReactNode;
}

export const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  function TextField(
    {
      size = 'md',
      invalid,
      fullWidth,
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
    const [focused, setFocused] = React.useState(false);

    return (
      <div
        style={style}
        className={classNames(className, 'dc-field', 'dc-text-field', {
          'dc-field_disabled': disabled,
          'dc-field_invalid': invalid,
          'dc-field_focused': focused,
          'dc-field_full_width': fullWidth,
          [`dc-field_size_${size}`]: size,
        })}
      >
        {leadingAddOn && (
          <span className="dc-text-field__add-on">{leadingAddOn}</span>
        )}

        <input
          {...props}
          className="dc-text-field__input"
          ref={ref}
          type={type}
          disabled={disabled}
          onFocus={(event) => {
            setFocused(true);
            isFunction(onFocus) && onFocus(event);
          }}
          onBlur={(event) => {
            setFocused(false);
            isFunction(onBlur) && onBlur(event);
          }}
        />

        {trailingAddOn && (
          <span className="dc-text-field__add-on">{trailingAddOn}</span>
        )}
      </div>
    );
  }
);
