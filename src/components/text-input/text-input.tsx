import { type ComponentPropsWithRef, type ReactNode, forwardRef } from 'react';
import { classNames } from '../../lib/react-helpers';

type TextInputHTMLProps = ComponentPropsWithRef<'input'>;
type TextInputBaseProps = Omit<TextInputHTMLProps,
  | 'type'
  | 'width'
  | 'size'>;
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
  leftAddOn?: ReactNode;
  rightAddOn?: ReactNode;
  htmlSize?: TextInputHTMLProps['size'];
  onChangeValue?: TextInputChangeValueHandler;
};

export const TextInput = forwardRef<
  HTMLInputElement,
  TextInputProps
>(function TextInput({
  hasError = false,
  isBlock = false,
  type = 'text',
  size = 'md',
  leftAddOn,
  rightAddOn,
  style,
  className,
  disabled,
  width,
  htmlSize,
  onChange,
  onChangeValue,
  ...props
}, ref) {
  const showLeftAddOn = Boolean(leftAddOn);
  const showRightAddOn = Boolean(rightAddOn);

  return (
    <div
      style={style}
      className={classNames(className, 'dc-text-input__container', {
        [`dc-text-input__container_${size}`]: size,
        'dc-text-input__container_block': isBlock,
        'dc-text-input__container_disabled': disabled,
        'dc-text-input__container_has_error': hasError,
        'dc-text-input__container_has_left-addon': showLeftAddOn,
        'dc-text-input__container_has_right-addon': showRightAddOn,
      })}
    >
      {showLeftAddOn && (
        <div className="dc-text-input__left-addon">
          {leftAddOn}
        </div>
      )}
      <input
        {...props}
        className={classNames({
          'dc-text-input': true,
          [`dc-text-input_width_${width}`]: width,
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
      {showRightAddOn && (
        <div className="dc-text-input__right-addon">
          {rightAddOn}
        </div>
      )}
    </div>
  );
});
