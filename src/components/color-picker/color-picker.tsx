import { ChangeEventHandler, ComponentPropsWithoutRef, ReactNode } from 'react';
import { classNames } from '../../lib/react-helpers';
import { ColorPickerButton } from './color-picker-button';

export type ColorPickerOption<T extends string | number> = {
  value: T;
  color: string; // Any valid CSS background
  label?: ReactNode;
};
export type ColorPickerProps<T extends string | number> = {
  name: string;
  options: ColorPickerOption<T>[] | Readonly<ColorPickerOption<T>[]>;
  value?: T;
  defaultValue?: T;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onChangeValue?: (value: T) => void;
} & ComponentPropsWithoutRef<'fieldset'>;

export function ColorPicker<T extends string | number>({
  className,
  name,
  disabled,
  options,
  value,
  defaultValue,
  onChange,
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
      {options.map((option) => {
        let checked: boolean | undefined;
        let defaultChecked: boolean | undefined;
        if (value !== undefined) {
          checked = option.value === value;
        } else if (defaultValue !== undefined) {
          defaultChecked = option.value === defaultValue;
        }
        return (
          <ColorPickerButton
            key={option.value}
            name={name}
            label={option.label}
            color={option.color}
            value={option.value}
            checked={checked}
            defaultChecked={defaultChecked}
            onChange={onChange}
            onChangeValue={onChangeValue}
          />
        );
      })}
    </fieldset>
  );
}
