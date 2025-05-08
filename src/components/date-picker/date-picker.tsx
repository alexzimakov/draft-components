import { DateISO, Weekday, isSameDay, isValidDateISO, parseDateISO, toDateISO } from './date-helpers.js';
import { ComponentPropsWithoutRef } from 'react';
import { classNames } from '../../lib/react-helpers.js';
import { parseMinMaxProps } from './parse-min-max-props.js';
import { Calendar, CalendarProps } from './calendar.js';

type DatePickerHTMLProps = ComponentPropsWithoutRef<'div'>;

type CalendarPassedProps = Pick<CalendarProps,
  | 'locale'
  | 'prevMonthButtonLabel'
  | 'nextMonthButtonLabel'
  | 'monthSelectLabel'
  | 'yearInputLabel'
>;

export type DatePickerProps = DatePickerHTMLProps & CalendarPassedProps & {
  weekStartsOn?: Weekday;
  min?: DateISO;
  max?: DateISO;
  value: DateISO | null;
  onChangeValue: (value: DateISO) => void;
};

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
  const allowedRange = parseMinMaxProps({ min, max });

  const selectedDay = value && isValidDateISO(value)
    ? parseDateISO(value)
    : null;

  const getDayProps: CalendarProps['getDayProps'] = (date) => ({
    isSelected: selectedDay != null && isSameDay(selectedDay, date),
  });

  return (
    <div {...props} className={classNames('dc-datepicker', className)}>
      <Calendar
        key={selectedDay ? String(selectedDay) : ''}
        defaultFocusDay={selectedDay}
        minDate={allowedRange.minDate}
        maxDate={allowedRange.maxDate}
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
