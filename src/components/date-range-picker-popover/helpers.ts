import { DateRangePickerPopoverOption, DateRangePickerPopoverSelection } from './types';

export function findSelectedOption(
  selection: DateRangePickerPopoverSelection | null,
  options: DateRangePickerPopoverOption[]
): DateRangePickerPopoverOption | null {
  if (!selection) {
    return null;
  }

  const selectedOption = options.find((option) => {
    const range = option.range;
    return (
      range.start === selection.range.start &&
      range.end === selection.range.end
    );
  });
  return selectedOption || null;
}
