import { type ChangeEventHandler, type ReactNode, useEffect, useId, useRef } from 'react';
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
  const ref = useRef<HTMLUListElement>(null);
  const name = `radio-group-${id}`;
  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const radioButtonElement = event.currentTarget;
    const value = radioButtonElement.value;
    const checked = radioButtonElement.checked;
    if (checked) {
      onChange(value);
    }
  };

  useEffect(() => {
    const container = ref.current;
    if (container) {
      if (container.scrollHeight > container.clientHeight) {
        container.classList.add('dc-filter-radio-group_has_scroll');
      } else {
        container.classList.remove('dc-filter-radio-group_has_scroll');
      }
    }
  }, []);

  return (
    <ul ref={ref} className={classNames('dc-filter-radio-group', className)}>
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
