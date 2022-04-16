import { ReactNode, useRef } from 'react';
import { ISODate } from '../../lib/plain-date';
import { DatePicker } from '../date-picker';
import { Popover, PopoverRef } from '../popover';

export type DatePickerPopoverProps = {
  defaultIsOpen?: boolean;
  locale?: string;
  footer?: ReactNode;
  min?: ISODate;
  max?: ISODate;
  value: ISODate | null;
  children: JSX.Element;
  onChangeValue(value: ISODate): void;
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
  const popover = useRef<PopoverRef>(null);

  function handleChangeValue(value: ISODate): void {
    onChangeValue(value);
    popover.current?.close();
  }

  return (
    <Popover ref={popover} defaultIsOpen={defaultIsOpen} anchor={children}>
      <DatePicker
        locale={locale}
        footer={footer}
        min={min}
        max={max}
        value={value}
        onChangeValue={handleChangeValue}
      />
    </Popover>
  );
}
