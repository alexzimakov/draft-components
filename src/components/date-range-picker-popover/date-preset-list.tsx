import { ReactNode } from 'react';
import { ISODateRangeWithDatePreset } from '../../lib/date-helpers';
import { classNames } from '../../lib/react-helpers';

export interface DatePresetOption {
  label: ReactNode;
  dateRange: ISODateRangeWithDatePreset;
}

export interface DatePresetsListProps {
  className?: string;
  options: DatePresetOption[];
  selectedDateRange: ISODateRangeWithDatePreset | null;
  onSelectedDateRange(option: DatePresetOption): void;
}

export function DatePresetList({
  className,
  options,
  selectedDateRange,
  onSelectedDateRange,
}: DatePresetsListProps) {
  return (
    <ul className={classNames(className, 'dc-date-preset-list')} role="menu">
      {options.map(option => {
        const datePreset = option.dateRange.datePreset;
        const isSelected = selectedDateRange
          ? selectedDateRange.datePreset === datePreset
          : false;
        return (
          <DatePresetListItem
            key={datePreset}
            isSelected={isSelected}
            option={option}
            onSelect={onSelectedDateRange}
          />
        );
      })}
    </ul>
  );
}

export function DatePresetListItem(props: {
  isSelected: boolean;
  option: DatePresetOption;
  onSelect(option: DatePresetOption): void;
}) {
  const { isSelected, option, onSelect } = props;
  return (
    <li
      className="dc-date-preset-list-item"
      role="menuitemradio"
      aria-checked={isSelected}
    >
      <button
        className={classNames(
          'dc-date-preset-list-item__btn',
          isSelected && 'dc-date-preset-list-item__btn_selected',
        )}
        type="button"
        onClick={() => onSelect(option)}
      >
        {option.label}
      </button>
    </li>
  );
}
