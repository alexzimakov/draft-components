import { type ComponentPropsWithoutRef, ReactNode } from 'react';
import { classNames } from '../../shared/react-helpers';
import { ColorPickerButton } from './color-picker-button';

export type ColorPickerOption<T extends string | number> = {
  value: T;
  /* Any valid CSS background */
  color: string;
  label?: ReactNode;
};
export type ColorPickerProps<T extends string | number> = {
  name: string;
  value?: T;
  options: ColorPickerOption<T>[] | Readonly<ColorPickerOption<T>[]>;
  onChangeValue: (value: T) => void;
} & ComponentPropsWithoutRef<'fieldset'>;

export function ColorPicker<T extends string | number>({
  className,
  name,
  options,
  value,
  disabled,
  onChangeValue,
  ...props
}: ColorPickerProps<T>) {
  return (
    <fieldset
      {...props}
      disabled={disabled}
      className={classNames(className, {
        'dc-color-picker': true,
        'dc-color-picker_disabled': disabled,
      })}
    >
      {options.map((option) => (
        <ColorPickerButton
          key={option.value}
          name={name}
          label={option.label}
          color={option.color}
          value={option.value}
          checked={option.value === value}
          onChangeValue={onChangeValue}
        />
      ))}
    </fieldset>
  );
}
