import { forwardRef, type ComponentPropsWithRef, type ReactNode } from 'react';
import { classNames } from '../../lib/react-helpers';

type TextInputHTMLProps = ComponentPropsWithRef<'input'>;
type TextInputBaseProps = Omit<TextInputHTMLProps,
  | 'type'
  | 'width'
  | 'size'
  | 'prefix'>;
export type TextInputType =
  | 'date'
  | 'datetime-local'
  | 'email'
  | 'number'
  | 'password'
  | 'search'
  | 'tel'
  | 'text'
  | 'time'
  | 'url';
export type TextInputWidth =
  | '2-char'
  | '3-char'
  | '4-char'
  | '5-char'
  | '10-char'
  | '20-char';
export type TextInputSize = 'sm' | 'md' | 'lg';
export type TextInputChangeValueHandler = (value: string) => void;
export type TextInputProps = TextInputBaseProps & {
  hasError?: boolean;
  isBlock?: boolean;
  type?: TextInputType;
  width?: TextInputWidth;
  size?: TextInputSize;
  prefix?: ReactNode;
  suffix?: ReactNode;
  htmlSize?: TextInputHTMLProps['size'];
  onChangeValue?: TextInputChangeValueHandler;
};

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  function TextInput({
    disabled = false,
    hasError = false,
    isBlock = false,
    type = 'text',
    width,
    size = 'md',
    style = {},
    className = '',
    prefix = null,
    suffix = null,
    htmlSize,
    onChange,
    onChangeValue,
    ...props
  }, ref) {
    const shouldRenderPrefix = Boolean(prefix);
    const shouldRenderSuffix = Boolean(suffix);

    return (
      <div
        style={style}
        className={classNames(className, 'dc-text-input__container', {
          'dc-text-input__container_disabled': disabled,
          'dc-text-input__container_has_error': hasError,
          'dc-text-input__container_block': isBlock,
          'dc-text-input__container_sm': size === 'sm',
          'dc-text-input__container_md': size === 'md',
          'dc-text-input__container_lg': size === 'lg',
        })}
      >
        {shouldRenderPrefix && (
          <div className="dc-text-input__prefix" aria-hidden={true}>
            {prefix}
          </div>
        )}
        <input
          {...props}
          className={classNames('dc-text-input', {
            'dc-text-input_has_prefix': shouldRenderPrefix,
            'dc-text-input_has_suffix': shouldRenderSuffix,
            'dc-text-input_width_2': width === '2-char',
            'dc-text-input_width_3': width === '3-char',
            'dc-text-input_width_4': width === '4-char',
            'dc-text-input_width_5': width === '5-char',
            'dc-text-input_width_10': width === '10-char',
            'dc-text-input_width_20': width === '20-char',
          })}
          ref={ref}
          type={type}
          size={htmlSize}
          disabled={disabled}
          onChange={(event) => {
            onChange?.(event);
            onChangeValue?.(event.target.value);
          }}
        />
        {shouldRenderSuffix && (
          <div className="dc-text-input__suffix" aria-hidden={true}>
            {suffix}
          </div>
        )}
      </div>
    );
  }
);
