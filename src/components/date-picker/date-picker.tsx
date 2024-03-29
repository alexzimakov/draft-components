import { DateISO, Weekday, isSameDay, isValidDateISO, parseDateISO, toDateISO } from './date-helpers.js';
import { ComponentPropsWithoutRef } from 'react';
import { classNames } from '../../lib/react-helpers.js';
import { parseMinMaxProps } from './parse-min-max-props.js';
import { Calendar, CalendarProps } from './calendar.js';

type DatePickerHTMLProps = ComponentPropsWithoutRef<'div'>;
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
> & DatePickerHTMLProps;

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
  className,
  ...props
}: DatePickerProps) {
  const { minDate, maxDate } = parseMinMaxProps({ min, max });

  const selectedDay = value && isValidDateISO(value)
    ? parseDateISO(value)
    : null;
  const getDayProps: CalendarProps['getDayProps'] = (date) => ({
    isSelected: selectedDay != null && isSameDay(selectedDay, date),
  });

  return (
    <div {...props} className={classNames('dc-datepicker', className)}>
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
