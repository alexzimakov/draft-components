import { ComponentPropsWithRef, ReactNode, forwardRef } from 'react';
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
export type TextInputRenderAddOn = (props: {
  className: string;
}) => ReactNode;
export type TextInputProps = TextInputBaseProps & {
  hasError?: boolean;
  isBlock?: boolean;
  type?: TextInputType;
  width?: TextInputWidth;
  widthCh?: number;
  size?: TextInputSize;
  leftAddOn?: ReactNode | TextInputRenderAddOn;
  rightAddOn?: ReactNode | TextInputRenderAddOn;
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
  if (leftAddOn) {
    const className = 'dc-text-input__left-addon';
    if (typeof leftAddOn === 'function') {
      leftAddOn = leftAddOn({ className });
    } else {
      leftAddOn = <div className={className}>{leftAddOn}</div>;
    }
  }

  if (rightAddOn) {
    const className = 'dc-text-input__right-addon';
    if (typeof rightAddOn === 'function') {
      rightAddOn = rightAddOn({ className });
    } else {
      rightAddOn = <div className={className}>{rightAddOn}</div>;
    }
  }

  return (
    <div
      style={style}
      className={classNames(className, 'dc-text-input__container', {
        [`dc-text-input__container_${size}`]: size,
        'dc-text-input__container_block': isBlock,
        'dc-text-input__container_disabled': disabled,
        'dc-text-input__container_invalid': hasError,
        'dc-text-input__container_left-addon': leftAddOn,
        'dc-text-input__container_right-addon': rightAddOn,
      })}
    >
      {leftAddOn}
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
      {rightAddOn}
    </div>
  );
});
