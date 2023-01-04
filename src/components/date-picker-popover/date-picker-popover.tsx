import { type DateISO } from '../date-picker/date-helpers';
import { classNames } from '../../shared/react-helpers';
import { useRef, type ReactNode } from 'react';
import { Popover, type PopoverRef } from '../popover';
import { DatePicker, type DatePickerProps } from '../date-picker';

export type DatePickerChangeValueFn = (value: DateISO) => void;
export type DatePickerPopoverProps = {
  className?: string;
  defaultIsOpen?: boolean;
  footer?: ReactNode;
  children: JSX.Element;
  value: DateISO | null;
  onChangeValue: DatePickerChangeValueFn;
} & Pick<DatePickerProps,
  | 'min'
  | 'max'
  | 'locale'
  | 'weekStartsOn'
  | 'prevMonthButtonLabel'
  | 'nextMonthButtonLabel'
  | 'monthSelectLabel'
  | 'yearInputLabel'
>;

export function DatePickerPopover({
  defaultIsOpen = false,
  footer,
  className,
  children,
  value,
  onChangeValue,
  // DatePickerProps
  min,
  max,
  locale,
  weekStartsOn,
  prevMonthButtonLabel,
  nextMonthButtonLabel,
  monthSelectLabel,
  yearInputLabel,
}: DatePickerPopoverProps) {
  const popoverRef = useRef<PopoverRef>(null);
  const handleChangeValue: DatePickerChangeValueFn = (value) => {
    onChangeValue(value);
    popoverRef.current?.close();
  };

  return (
    <Popover
      ref={popoverRef}
      className={classNames('dc-date-picker-popover', className)}
      defaultIsOpen={defaultIsOpen}
      anchor={children}
    >
      <DatePicker
        min={min}
        max={max}
        locale={locale}
        weekStartsOn={weekStartsOn}
        prevMonthButtonLabel={prevMonthButtonLabel}
        nextMonthButtonLabel={nextMonthButtonLabel}
        monthSelectLabel={monthSelectLabel}
        yearInputLabel={yearInputLabel}
        value={value}
        onChangeValue={handleChangeValue}
      />
      {footer}
    </Popover>
  );
}
