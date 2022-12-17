import {
  isSameDay,
  isValidDateISO,
  parseDateISO,
  type DateISO,
  type Weekday,
} from './date-helpers';
import { useState } from 'react';
import { Calendar, type CalendarProps } from './calendar';
import { parseMinMaxProps } from './parse-min-max-props';
import { DateISORange, DateRange } from './date-range';

export type DateRangePickerProps = {
  value: DateISORange | null;
  onChangeValue: (value: DateISORange) => void;
  weekStartsOn?: Weekday;
  min?: DateISO;
  max?: DateISO;
} & Pick<CalendarProps,
  | 'locale'
  | 'prevMonthButtonLabel'
  | 'nextMonthButtonLabel'
  | 'monthSelectLabel'
  | 'yearInputLabel'
>;

export function DateRangePicker({
  value,
  onChangeValue,
  weekStartsOn = 1,
  min,
  max,
  locale,
  prevMonthButtonLabel,
  nextMonthButtonLabel,
  monthSelectLabel,
  yearInputLabel,
}: DateRangePickerProps) {
  const { minDate, maxDate } = parseMinMaxProps({ min, max });

  const selectedRange = parseValue(value);
  const [start, setStart] = useState<Date | null>(null);
  const [end, setEnd] = useState<Date | null>(null);

  const getCalendarDayProps: CalendarProps['getDayProps'] = (date) => {
    let isSelected = false;
    let inRange = false;
    let isRangeStart = false;
    let isRangeEnd = false;
    if (start) {
      const range = start && end
        ? DateRange.create(start, end)
        : DateRange.create(start, start);
      isRangeStart = isSameDay(range.start, date);
      isRangeEnd = isSameDay(range.end, date);
      inRange = range.contains(date);
      isSelected = isSameDay(start, date);
    } else if (selectedRange) {
      isRangeStart = isSameDay(selectedRange.start, date);
      isRangeEnd = isSameDay(selectedRange.end, date);
      inRange = selectedRange.contains(date);
      isSelected = isRangeStart || isRangeEnd;
    }

    return { isSelected, inRange, isRangeStart, isRangeEnd };
  };

  const updateRange = (date: Date): void => {
    if (start) {
      setEnd(date);
    }
  };

  return (
    <div className="dc-datepicker">
      <Calendar
        defaultFocusDay={selectedRange?.start}
        minDate={minDate}
        maxDate={maxDate}
        locale={locale}
        weekStartsOn={weekStartsOn}
        prevMonthButtonLabel={prevMonthButtonLabel}
        nextMonthButtonLabel={nextMonthButtonLabel}
        monthSelectLabel={monthSelectLabel}
        yearInputLabel={yearInputLabel}
        getDayProps={getCalendarDayProps}
        onHoverDay={updateRange}
        onFocusDay={updateRange}
        onSelectDay={(date) => {
          if (!start) {
            setStart(date);
          } else {
            setStart(null);
            setEnd(null);
            onChangeValue(DateRange.create(start, date).toDateISORange());
          }
        }}
      />
    </div>
  );
}

function parseValue(value: DateRangePickerProps['value']): DateRange | null {
  if (value && isValidDateISO(value.start) && isValidDateISO(value.end)) {
    return DateRange.create(
      parseDateISO(value.start),
      parseDateISO(value.end)
    );
  }
  return null;
}