import { DateISORange } from '../date-picker/date-range';

export type DateRangePickerPopoverSelection = {
  preset: string;
  range: DateISORange
};

export type DateRangePickerPopoverOption = {
  label: string;
  preset: string;
  range: DateISORange;
};
