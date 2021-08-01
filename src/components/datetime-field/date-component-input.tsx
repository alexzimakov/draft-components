import { classNames } from '../../lib/react-helpers';
import type { CSSProperties, ChangeEventHandler } from 'react';

export interface DatePartInputProps {
  id?: string;
  style?: CSSProperties;
  className?: string;
  disabled?: boolean;
  readOnly?: boolean;
  label?: string;
  placeholder?: string;
  name: string;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

export function DateComponentInput({
  id,
  style,
  className,
  disabled,
  readOnly,
  label,
  placeholder,
  name,
  value,
  onChange,
}: DatePartInputProps) {
  return (
    <div
      style={style}
      className={classNames(className, 'dc-date-component-input')}
    >
      <span aria-hidden={true}>{value || placeholder}</span>
      <input
        id={id}
        type="text"
        aria-label={label}
        placeholder={placeholder}
        autoComplete="off"
        disabled={disabled}
        readOnly={readOnly}
        value={value}
        name={name}
        onChange={onChange}
      />
    </div>
  );
}
