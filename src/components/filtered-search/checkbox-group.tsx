import { useId, useRef, type ChangeEventHandler, type ReactNode } from 'react';
import { classNames } from '../../lib/react-helpers.js';
import { SelectionControl } from '../selection-control/index.js';
import { Checkbox } from '../checkbox/index.js';

type Option = string | {
  value: string;
  label: ReactNode;
  caption?: ReactNode;
};

export type FilterValueListProps = {
  className?: string;
  options: Option[];
  values: string[];
  onChange: (values: string[]) => void;
  formatValue: (value: string) => ReactNode;
};

export function CheckboxGroup({
  className,
  options,
  values: selectedValues,
  onChange,
  formatValue,
}: FilterValueListProps) {
  const id = useId();
  const ref = useRef<HTMLUListElement>(null);
  const name = `checkbox-group-${id}`;
  const handleChange: ChangeEventHandler<HTMLInputElement> = () => {
    const containerElement = ref.current;
    if (containerElement) {
      const inputElements = containerElement.querySelectorAll<HTMLInputElement>(`input[name="${name}"]`);
      const newSelectedValues = Array.from(inputElements)
        .filter((el) => el.checked)
        .map((el) => el.value);
      onChange(newSelectedValues);
    }
  };

  return (
    <ul ref={ref} className={classNames('dc-filter-checkbox-group', className)}>
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
              <Checkbox
                name={name}
                value={value}
                checked={selectedValues.includes(value)}
                onChange={handleChange}
              />
            </SelectionControl>
          </li>
        );
      })}
    </ul>
  );
}
