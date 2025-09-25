import { type ChangeEventHandler, type ReactNode, useId } from 'react';
import { classNames } from '../../lib/react-helpers.js';
import { SelectionControl } from '../selection-control/index.js';
import { Radio } from '../radio/index.js';

type Option = string | {
  value: string;
  label: ReactNode;
  caption?: ReactNode;
};

export type RadioGroupProps = {
  className?: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  formatValue: (value: string) => ReactNode;
};

export function RadioGroup({
  className,
  options,
  value: selectedValue,
  onChange,
  formatValue,
}: RadioGroupProps) {
  const id = useId();
  const name = `radio-group-${id}`;
  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const radioButtonElement = event.currentTarget;
    const value = radioButtonElement.value;
    const checked = radioButtonElement.checked;
    if (checked) {
      onChange(value);
    }
  };

  return (
    <ul className={classNames('dc-filter-radio-group', className)}>
      {options.map((option) => {
        let value: string;
        let label: ReactNode;
        let caption: ReactNode;
        if (typeof option === 'string') {
          value = option;
          label = formatValue(option);
          caption = null;
        } else {
          value = option.value;
          label = option.label;
          caption = option.caption;
        }
        return (
          <li key={value}>
            <SelectionControl label={label} caption={caption}>
              <Radio
                name={name}
                value={value}
                checked={value === selectedValue}
                onChange={handleChange}
              />
            </SelectionControl>
          </li>
        );
      })}
    </ul>
  );
}
