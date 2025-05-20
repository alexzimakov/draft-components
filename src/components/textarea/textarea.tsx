import { type ChangeEventHandler, type ComponentProps } from 'react';
import { classNames } from '../../lib/react-helpers.js';

export type TextareaSize = 'sm' | 'md' | 'lg';

export type TextareaValueChangeHandler = (value: string) => void;

type TextareaHTMLProps = ComponentProps<'textarea'>;

type TextareaBaseProps = {
  fullWidth?: boolean;
  invalid?: boolean;
  size?: TextareaSize;
  onChangeValue?: TextareaValueChangeHandler;
};

export type TextareaProps =
  & TextareaBaseProps
  & Omit<TextareaHTMLProps, keyof TextareaBaseProps>;

export function Textarea({
  style,
  className,
  fullWidth,
  size = 'md',
  rows = 3,
  invalid,
  disabled,
  onChange,
  onChangeValue,
  ...props
}: TextareaProps) {
  const handleChange: ChangeEventHandler<HTMLTextAreaElement> = (event) => {
    if (typeof onChange === 'function') {
      onChange(event);
    }
    if (typeof onChangeValue === 'function') {
      onChangeValue(event.target.value);
    }
  };

  return (
    <textarea
      {...props}
      style={style}
      className={classNames(className, 'dc-textarea', {
        [`dc-textarea_${size}`]: size,
        'dc-textarea_full-width': fullWidth,
        'dc-textarea_invalid': invalid,
        'dc-textarea_disabled': disabled,
      })}
      rows={rows}
      disabled={disabled}
      aria-invalid={props['aria-invalid'] ?? invalid}
      onChange={handleChange}
    />
  );
}
