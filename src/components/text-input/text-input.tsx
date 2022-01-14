import { ComponentPropsWithRef, forwardRef, ReactNode, useState } from 'react';
import { isFunction } from '../../lib/guards';
import { classNames } from '../../lib/react-helpers';

export type TextInputHtmlAttrs = Omit<
  ComponentPropsWithRef<'input'>,
  'checked' | 'defaultChecked' | 'size'
>;

export const textInputTypes = new Set([
  'email',
  'password',
  'search',
  'tel',
  'text',
  'url',
  'datetime',
  'date',
  'time',
  'week',
  'month',
]);

export interface TextInputProps extends TextInputHtmlAttrs {
  size?: 'sm' | 'md' | 'lg';
  invalid?: boolean;
  fullWidth?: boolean;
  leadingAddOn?: ReactNode;
  trailingAddOn?: ReactNode;
  onChangeValue?(value: string): void;
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  function TextInput(
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
      onChange,
      onChangeValue,
      ...props
    },
    ref
  ) {
    const [focused, setFocused] = useState(false);
    return (
      <div
        style={style}
        className={classNames(className, 'dc-input', 'dc-text-input', {
          'dc-input_disabled': disabled,
          'dc-input_invalid': invalid,
          'dc-input_focused': focused,
          'dc-input_full_width': fullWidth,
          [`dc-input_size_${size}`]: size,
        })}
      >
        {leadingAddOn && (
          <span className="dc-text-input__add-on">{leadingAddOn}</span>
        )}

        <input
          {...props}
          className="dc-text-input__native-input"
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
          onChange={(event) => {
            isFunction(onChangeValue) && onChangeValue(event.target.value);
            isFunction(onChange) && onChange(event);
          }}
        />

        {trailingAddOn && (
          <span className="dc-text-input__add-on">{trailingAddOn}</span>
        )}
      </div>
    );
  }
);
