import { type CSSProperties, type ChangeEventHandler, type ReactNode } from 'react';
import { classNames } from '../../lib/react-helpers.js';

export type ColorPickerButtonProps<T extends string | number> = {
  style?: CSSProperties;
  className?: string;
  label: ReactNode;
  name: string;
  color: string;
  value: T;
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onChangeValue?: (value: T) => void;
};

export function ColorPickerButton<T extends string | number>({
  style,
  className,
  label,
  name,
  color,
  value,
  checked,
  defaultChecked,
  onChange,
  onChangeValue,
}: ColorPickerButtonProps<T>) {
  const customProperties = {
    '--dc-color-picker-btn-color': color,
  };
  return (
    <label
      style={{ ...customProperties, ...style }}
      className={classNames('dc-color-picker__btn', className)}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        defaultChecked={defaultChecked}
        onChange={(event) => {
          onChange?.(event);
          onChangeValue?.(value);
        }}
      />
      <span
        className="dc-color-picker__btn-check"
        aria-hidden={true}
      />
      {label}
    </label>
  );
}
