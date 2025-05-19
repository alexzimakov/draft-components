import { type ChangeEventHandler } from 'react';
import { classNames } from '../../lib/react-helpers.js';
import { SelectionControl } from '../selection-control/index.js';
import { Checkbox } from '../checkbox/index.js';

export type FilterValueListProps = {
  className?: string;
  values: string[];
  checkedValues: string[];
  onChangeCheckedValues: (values: string[]) => void;
  formatValue: (value: string) => string;
};

export function FilterValueList({
  className,
  values,
  checkedValues,
  onChangeCheckedValues,
  formatValue,
}: FilterValueListProps) {
  const onChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const checkboxElement = event.currentTarget;
    const value = checkboxElement.value;
    const checked = checkboxElement.checked;
    onChangeCheckedValues(checked
      ? [...checkedValues, value]
      : checkedValues.filter((prevValue) => prevValue !== value));
  };

  return (
    <ul className={classNames('dc-filter-value-list', className)}>
      {values.map((value) => (
        <li key={value}>
          <SelectionControl label={formatValue(value)}>
            <Checkbox
              value={value}
              checked={checkedValues.includes(value)}
              onChange={onChange}
            />
          </SelectionControl>
        </li>
      ))}
    </ul>
  );
}
