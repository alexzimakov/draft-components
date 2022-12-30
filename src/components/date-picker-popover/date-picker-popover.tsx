import { type DateISO } from '../date-picker/date-helpers';
import { useRef, type ReactNode } from 'react';
import { Popover, type PopoverRef } from '../popover';
import { DatePicker } from '../date-picker';

export type DatePickerChangeValueFn = (value: DateISO) => void;
export type DatePickerPopoverProps = {
  defaultIsOpen?: boolean;
  locale?: string;
  footer?: ReactNode;
  min?: DateISO;
  max?: DateISO;
  children: JSX.Element;
  value: DateISO | null;
  onChangeValue: DatePickerChangeValueFn;
};

export function DatePickerPopover({
  defaultIsOpen = false,
  locale,
  footer,
  min,
  max,
  value,
  children,
  onChangeValue,
}: DatePickerPopoverProps) {
  const popoverRef = useRef<PopoverRef>(null);
  const handleChangeValue: DatePickerChangeValueFn = (value) => {
    onChangeValue(value);
    popoverRef.current?.close();
  };

  return (
    <Popover ref={popoverRef} defaultIsOpen={defaultIsOpen} anchor={children}>
      <DatePicker
        locale={locale}
        min={min}
        max={max}
        value={value}
        onChangeValue={handleChangeValue}
      />
      {footer}
    </Popover>
  );
}
