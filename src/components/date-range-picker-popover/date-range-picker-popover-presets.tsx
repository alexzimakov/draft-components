import { DateRangePickerPopoverOption, DateRangePickerPopoverSelection } from './types';
import { ChangeEvent, useId } from 'react';
import { findSelectedOption } from './helpers';
import { Select } from '../select';
import { Radio } from '../radio';
import { SelectionControl } from '../selection-control';

export type DateRangePickerPopoverPresetsProps = {
  isCompactView: boolean;
  customPresetLabel: string;
  options: DateRangePickerPopoverOption[];
  value: DateRangePickerPopoverSelection | null;
  onChangeValue: (value: DateRangePickerPopoverSelection) => void,
};

export function DateRangePickerPopoverPresets({
  isCompactView,
  customPresetLabel,
  options,
  value,
  onChangeValue,
}: DateRangePickerPopoverPresetsProps) {
  const id = useId();
  const name = `${id}-date-preset`;
  const selectedOption = findSelectedOption(value, options);
  const selectedPreset = selectedOption ? selectedOption.preset : '';

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) {
    const value = event.target.value;
    const option = options.find((option) => option.preset === value);
    if (option) {
      onChangeValue({
        preset: option.preset,
        range: option.range,
      });
    }
  }

  if (isCompactView) {
    return (
      <div className="dc-date-range-picker-popover__presets">
        <Select
          size="md"
          fullWidth={true}
          value={selectedPreset}
          onChange={handleChange}
        >
          <option value="" disabled={true}>{customPresetLabel}</option>
          {options.map((option) => (
            <option key={option.preset} value={option.preset}>
              {option.label}
            </option>
          ))}
        </Select>
      </div>
    );
  }

  return (
    <ul className="dc-date-range-picker-popover__presets">
      {options.map((option) => {
        const preset = option.preset;
        const id = `${name}-${preset}`;
        return (
          <li key={option.preset}>
            <SelectionControl label={option.label} labelFor={id}>
              <Radio
                icon="check"
                id={id}
                name={name}
                value={preset}
                checked={preset === selectedPreset}
                onChange={handleChange}
              />
            </SelectionControl>
          </li>
        );
      })}
    </ul>
  );
}
