import { ISODateRange } from '../../lib/plain-date-range';
import { Select } from '../select';
import { RadioGroup } from '../radio-group';

export type DatePreset = string;

export interface DatePresetOption {
  label: string;
  datePreset: DatePreset;
  dateRange: ISODateRange;
}

export interface DatePresetSelectProps {
  shouldRenderAsNativeSelect?: boolean;
  customDatePresetLabel?: string;
  options: DatePresetOption[];
  value: DatePreset;
  onChangeValue(value: DatePreset): void;
}

export function DatePresetSelect({
  shouldRenderAsNativeSelect,
  customDatePresetLabel = 'Custom',
  options,
  value,
  onChangeValue,
}: DatePresetSelectProps) {
  return shouldRenderAsNativeSelect ? (
    <Select fullWidth={true} value={value} onChangeValue={onChangeValue}>
      <option value="" disabled={true}>{customDatePresetLabel}</option>
      {options.map((option) => (
        <option key={option.datePreset} value={option.datePreset}>
          {option.label}
        </option>
      ))}
    </Select>
  ) : (
    <RadioGroup type="simple-list" value={value} onChangeValue={onChangeValue}>
      {options.map((option) => (
        <RadioGroup.Item
          key={option.datePreset}
          value={option.datePreset}
          label={option.label}
        />
      ))}
    </RadioGroup>
  );
}
