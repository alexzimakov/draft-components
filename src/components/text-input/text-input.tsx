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
  | '2ch'
  | '3ch'
  | '4ch'
  | '5ch'
  | '10ch'
  | '20ch'
  | '40ch';
export type TextInputSize = 'sm' | 'md' | 'lg';
export type TextInputChangeValueHandler = (value: string) => void;
export type TextInputProps = TextInputBaseProps & {
  hasError?: boolean;
  isBlock?: boolean;
  type?: TextInputType;
  width?: TextInputWidth;
  widthCh?: number;
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
          [`dc-text-input__container_${size}`]: size !== undefined,
          'dc-text-input__container_disabled': disabled,
          'dc-text-input__container_has_error': hasError,
          'dc-text-input__container_block': isBlock,
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
            [`dc-text-input_width_${width}`]: width !== undefined,
            'dc-text-input_has_prefix': shouldRenderPrefix,
            'dc-text-input_has_suffix': shouldRenderSuffix,
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
