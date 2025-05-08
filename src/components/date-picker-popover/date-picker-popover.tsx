import { DateISO } from '../date-picker/date-helpers.js';
import { classNames } from '../../lib/react-helpers.js';
import { ReactNode, RefCallback, useMemo, useState } from 'react';
import { Popover, PopoverPlacement } from '../popover/index.js';
import { DatePicker, DatePickerProps } from '../date-picker/index.js';

export type DatePickerChangeHandler = (value: DateISO) => void;

export type DatePickerPopoverChildren = (props: {
  ref: RefCallback<HTMLElement>;
  open: () => void;
  close: () => void;
  toggle: () => void;
}) => JSX.Element;

export type DatePickerPopoverProps = Pick<DatePickerProps,
  | 'min'
  | 'max'
  | 'locale'
  | 'weekStartsOn'
  | 'prevMonthButtonLabel'
  | 'nextMonthButtonLabel'
  | 'monthSelectLabel'
  | 'yearInputLabel'
> & {
  className?: string;
  defaultIsOpen?: boolean;
  placement?: PopoverPlacement;
  value: DateISO | null;
  footer?: ReactNode;
  children: DatePickerPopoverChildren;
  onChangeValue: DatePickerChangeHandler;
};

export function DatePickerPopover({
  className,
  defaultIsOpen = false,
  placement,
  value,
  footer,
  children,
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
  const [isOpen, setIsOpen] = useState(defaultIsOpen);
  const popoverApi = useMemo(() => ({
    open: () => {
      setIsOpen(false);
    },
    close: () => {
      setIsOpen(false);
    },
    toggle: () => {
      setIsOpen((isOpen) => !isOpen);
    },
  }), [setIsOpen]);

  const handleChangeValue: DatePickerChangeHandler = (value) => {
    onChangeValue(value);
    setIsOpen(false);
  };

  return (
    <Popover
      className={classNames('dc-date-picker-popover', className)}
      placement={placement}
      isOpen={isOpen}
      onClose={popoverApi.close}
      renderAnchor={({ ref }) => children({ ref, ...popoverApi })}
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
