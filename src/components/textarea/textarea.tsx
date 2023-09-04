import { ChangeEventHandler, ComponentPropsWithRef, forwardRef } from 'react';
import { classNames } from '../../lib/react-helpers';

type TextareaHTMLProps = ComponentPropsWithRef<'textarea'>;
export type TextareaSize = 'sm' | 'md' | 'lg';
export type TextareaValueChangeHandler = (value: string) => void;
export type TextareaProps = TextareaHTMLProps & {
  fullWidth?: boolean;
  invalid?: boolean;
  size?: TextareaSize;
  onChangeValue?: TextareaValueChangeHandler;
};

export const Textarea = forwardRef<
  HTMLTextAreaElement,
  TextareaProps
>(function Textarea({
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
}, ref) {
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
      ref={ref}
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
});
