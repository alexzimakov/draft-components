import {
  isSameDay,
  isValidDateISO,
  parseDateISO,
  toDateISO,
  type DateISO,
  type Weekday,
} from './date-helpers';
import { Calendar, type CalendarProps } from './calendar';
import { parseMinMaxProps } from './parse-min-max-props';

export type DatePickerProps = {
  value: DateISO | null;
  onChangeValue: (value: DateISO) => void;
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

export function DatePicker({
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
}: DatePickerProps) {
  const { minDate, maxDate } = parseMinMaxProps({ min, max });

  const selectedDay = value && isValidDateISO(value)
    ? parseDateISO(value)
    : null;
  const getDayProps: CalendarProps['getDayProps'] = (date) => ({
    isSelected: selectedDay != null && isSameDay(selectedDay, date),
  });

  return (
    <div className="dc-datepicker">
      <Calendar
        defaultFocusDay={selectedDay}
        minDate={minDate}
        maxDate={maxDate}
        locale={locale}
        weekStartsOn={weekStartsOn}
        prevMonthButtonLabel={prevMonthButtonLabel}
        nextMonthButtonLabel={nextMonthButtonLabel}
        monthSelectLabel={monthSelectLabel}
        yearInputLabel={yearInputLabel}
        getDayProps={getDayProps}
        onSelectDay={(date) => onChangeValue(toDateISO(date))}
      />
    </div>
  );
}
