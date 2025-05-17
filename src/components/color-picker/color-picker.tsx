import { ChangeEventHandler, ComponentProps, ReactNode } from 'react';
import { classNames } from '../../lib/react-helpers.js';
import { ColorPickerButton } from './color-picker-button.js';

export type ColorPickerValue = string | number;

export type ColorPickerOption<T extends ColorPickerValue> = {
  value: T;
  color: string;
  label?: ReactNode;
};

type ColorPickerHTMLProps = ComponentProps<'fieldset'>;

type ColorPickerBaseProps<T extends ColorPickerValue> = {
  options: ColorPickerOption<T>[] | Readonly<ColorPickerOption<T>[]>;
  name: string;
  value?: T;
  defaultValue?: T;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onChangeValue?: (value: T) => void;
};

export type ColorPickerProps<T extends ColorPickerValue> =
  & ColorPickerBaseProps<T>
  & Omit<ColorPickerHTMLProps, keyof ColorPickerBaseProps<T>>;

export function ColorPicker<T extends ColorPickerValue>({
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
