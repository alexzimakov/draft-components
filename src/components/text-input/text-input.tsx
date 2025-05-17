import { ChangeEventHandler, ComponentProps, FocusEventHandler, ReactNode, forwardRef, useState } from 'react';
import { classNames } from '../../lib/react-helpers.js';

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
  | 'url'
  | 'week';

export type TextInputSize = 'sm' | 'md' | 'lg';

export type TextInputSlotStyle = 'plain' | 'tinted';

export type TextInputTextAlign = 'left' | 'right' | 'center';

export type TextInputSlotRenderer = (props: { className: string }) => ReactNode;

export type TextInputValueChangeHandler = (value: string) => void;

type TextInputHTMLProps = ComponentProps<'input'>;

type TextInputBaseProps = {
  fullWidth?: boolean;
  invalid?: boolean;
  type?: TextInputType;
  size?: TextInputSize;
  sizeInChars?: number;
  slotLeft?: ReactNode | TextInputSlotRenderer;
  slotRight?: ReactNode | TextInputSlotRenderer;
  slotStyle?: TextInputSlotStyle;
  textAlign?: TextInputTextAlign;
  onChangeValue?: TextInputValueChangeHandler;
};

export type TextInputProps =
  & TextInputBaseProps
  & Omit<TextInputHTMLProps, keyof TextInputBaseProps>;

export const TextInput = forwardRef<
  HTMLInputElement,
  TextInputProps
>(function TextInput({
  style,
  className,
  fullWidth,
  size = 'md',
  sizeInChars,
  slotStyle = 'plain',
  textAlign = 'left',
  slotLeft,
  slotRight,
  type = 'text',
  invalid,
  disabled,
  onChange,
  onFocus,
  onBlur,
  onChangeValue,
  ...props
}, ref) {
  const [focused, setFocused] = useState(false);

  let elementBeforeInput: ReactNode;
  if (slotLeft) {
    const className = 'dc-text-input__slot-left';
    if (typeof slotLeft === 'function') {
      elementBeforeInput = slotLeft({ className });
    } else {
      elementBeforeInput = <div className={className}>{slotLeft}</div>;
    }
  }

  let elementAfterInput: ReactNode;
  if (slotRight) {
    const className = 'dc-text-input__slot-right';
    if (typeof slotRight === 'function') {
      elementAfterInput = slotRight({ className });
    } else {
      elementAfterInput = <div className={className}>{slotRight}</div>;
    }
  }

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    if (typeof onChange === 'function') {
      onChange(event);
    }
    if (typeof onChangeValue === 'function') {
      onChangeValue(event.target.value);
    }
  };

  const handleFocus: FocusEventHandler<HTMLInputElement> = (event) => {
    setFocused(true);
    if (typeof onFocus === 'function') {
      onFocus(event);
    }
  };

  const handleBlur: FocusEventHandler<HTMLInputElement> = (event) => {
    setFocused(false);
    if (typeof onBlur === 'function') {
      onBlur(event);
    }
  };

  return (
    <div
      style={style}
      className={classNames(className, 'dc-text-input', {
        [`dc-text-input_${size}`]: size,
        [`dc-text-input_slot_${slotStyle}`]: slotStyle,
        [`dc-text-input_align_${textAlign}`]: textAlign,
        'dc-text-input_full-width': fullWidth,
        'dc-text-input_invalid': invalid,
        'dc-text-input_focused': focused,
        'dc-text-input_disabled': disabled,
        'dc-text-input_has_slot-left': elementBeforeInput,
        'dc-text-input_has_slot-right': elementAfterInput,
      })}
    >
      {elementBeforeInput}
      <input
        {...props}
        className="dc-text-input__native"
        ref={ref}
        type={type}
        size={sizeInChars}
        disabled={disabled}
        aria-invalid={props['aria-invalid'] ?? invalid}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      {elementAfterInput}
    </div>
  );
});
