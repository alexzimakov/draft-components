import { type CSSProperties, ReactNode } from 'react';
import { classNames } from '../../shared/react-helpers';

export type ColorPickerButtonProps<T extends string | number> = {
  style?: CSSProperties;
  className?: string;
  label: ReactNode;
  name: string;
  color: string;
  value: T;
  checked: boolean;
  onChangeValue: (value: T) => void;
};

export function ColorPickerButton<T extends string | number>({
  style,
  className,
  label,
  name,
  color,
  value,
  checked,
  onChangeValue,
}: ColorPickerButtonProps<T>) {
  const customProperties = {
    '--dc-color-picker-btn-color': color,
  };
  return (
    <label
      style={{ ...customProperties, ...style }}
      className={classNames(className, {
        'dc-color-picker__btn': true,
        'dc-color-picker__btn_checked': checked,
      })}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={() => onChangeValue(value)}
      />
      {label}
    </label>
  );
}
