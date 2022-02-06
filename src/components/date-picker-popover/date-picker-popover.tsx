import { ReactNode, useState } from 'react';
import { ISODate } from '../../lib/plain-date';
import { Popover } from '../popover';
import { DatePicker } from '../date-picker';

export type DatePickerPopoverProps = {
  defaultIsOpen?: boolean;
  locale?: string;
  footer?: ReactNode;
  min?: ISODate;
  max?: ISODate;
  value: ISODate | null;
  onChangeValue(value: ISODate): void;
  children(props: {
    isOpen: boolean;
    openPopover(): void;
    closePopover(): void;
    togglePopover(): void;
  }): JSX.Element;
};

export function DatePickerPopover({
  defaultIsOpen = false,
  locale,
  footer,
  min,
  max,
  value,
  onChangeValue,
  children,
}: DatePickerPopoverProps) {
  const [isOpen, setIsOpen] = useState(defaultIsOpen);

  function openPopover(): void {
    setIsOpen(true);
  }

  function closePopover(): void {
    setIsOpen(false);
  }

  function togglePopover(): void {
    if (isOpen) {
      closePopover();
    } else {
      openPopover();
    }
  }

  function handleChangeValue(value: ISODate): void {
    onChangeValue(value);
    closePopover();
  }

  return (
    <Popover
      isShown={isOpen}
      onClose={closePopover}
      content={
        <DatePicker
          locale={locale}
          footer={footer}
          min={min}
          max={max}
          value={value}
          onChangeValue={handleChangeValue}
        />
      }
    >
      {children({
        isOpen,
        openPopover,
        closePopover,
        togglePopover,
      })}
    </Popover>
  );
}
