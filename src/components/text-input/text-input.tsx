import { ChangeEventHandler, ComponentPropsWithRef, ReactNode, forwardRef } from 'react';
import { classNames } from '../../lib/react-helpers.js';

type TextInputHTMLProps = ComponentPropsWithRef<'input'>;
type TextInputBaseProps = Omit<TextInputHTMLProps, 'type' | 'size'>;
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
export type TextInputSlotRenderer = (props: { className: string }) => ReactNode;
export type TextInputValueChangeHandler = (value: string) => void;
export type TextInputProps = TextInputBaseProps & {
  fullWidth?: boolean;
  invalid?: boolean;
  type?: TextInputType;
  size?: TextInputSize;
  sizeInChars?: number;
  slotLeft?: ReactNode | TextInputSlotRenderer;
  slotRight?: ReactNode | TextInputSlotRenderer;
  slotStyle?: TextInputSlotStyle;
  onChangeValue?: TextInputValueChangeHandler;
};

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
  slotLeft,
  slotRight,
  type = 'text',
  invalid,
  disabled,
  onChange,
  onChangeValue,
  ...props
}, ref) {
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

  return (
    <div
      style={style}
      className={classNames(className, 'dc-text-input', {
        [`dc-text-input_${size}`]: size,
        [`dc-text-input_slot_${slotStyle}`]: slotStyle,
        'dc-text-input_full-width': fullWidth,
        'dc-text-input_invalid': invalid,
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
      />
      {elementAfterInput}
    </div>
  );
});
