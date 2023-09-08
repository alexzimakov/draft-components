import { classNames } from '../../lib/index.js';
import { Select } from '../select/index.js';

export type FilterOperatorSelectProps<T extends string> = {
  className?: string;
  accessibleName?: string;
  label: string;
  values: T[];
  value: T;
  onChange: (value: T) => void;
  formatValue: (value: T) => string;
};

export function FilterOperatorSelect<T extends string>({
  accessibleName,
  className,
  label,
  values,
  value,
  onChange,
  formatValue,
}: FilterOperatorSelectProps<T>) {
  const shouldRenderSelect = values.length > 1;
  const onValueChanged = (newValue: string) => {
    onChange(newValue as T);
  };
  return (
    <div className={classNames('dc-filter-operator-select', className)}>
      <span>
        {shouldRenderSelect
          ? label
          : `${label} ${formatValue(value)}`}
      </span>
      {shouldRenderSelect && (
        <Select
          size="sm"
          data-testid="filter-operator-select"
          aria-label={accessibleName}
          value={value}
          onChangeValue={onValueChanged}
        >
          {values.map((value) => (
            <option key={value} value={value}>
              {formatValue(value)}
            </option>
          ))}
        </Select>
      )}
    </div>
  );
}
