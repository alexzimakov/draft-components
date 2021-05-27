import * as React from 'react';
import { classNames } from '../../lib/react-helpers';

export interface DatePartInputProps {
  id?: string;
  style?: React.CSSProperties;
  className?: string;
  readOnly?: boolean;
  label?: string;
  placeholder?: string;
  name: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

export function DateComponentInput({
  id,
  style,
  className,
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
        readOnly={readOnly}
        value={value}
        name={name}
        onChange={onChange}
      />
    </div>
  );
}
