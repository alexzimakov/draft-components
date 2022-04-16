import { ReactNode, useRef, useState } from 'react';
import { ISODateRange } from '../../lib/plain-date-range';
import { Alignment, Placement } from '../positioner/types';
import { Popover, PopoverRef } from '../popover';
import { DatePresetPicker } from './date-preset-picker';
import { DatePreset, DatePresetOption } from './date-preset-select';

export type ISODateRangeWithPreset = {
  datePreset: DatePreset;
  dateRange: ISODateRange;
};

export type DateRangeFormatter = (
  dateRange: ISODateRange,
  locale?: string | string[]
) => string;

export type TimeZoneFormatter = (
  timeZone: string,
  locale?: string | string[]
) => string;

export type DatePresetPickerPopoverProps = {
  locale?: string;
  timeZone?: string;
  defaultIsOpen?: boolean;
  hideSelectedRange?: boolean;
  placement?: Placement;
  alignment?: Alignment;
  formatTimeZone?: TimeZoneFormatter;
  formatDateRange?: DateRangeFormatter;
  cancelButtonLabel?: ReactNode;
  confirmButtonLabel?: ReactNode;
  customDatePresetLabel?: string;
  disableActionButtons?: boolean;
  showLoadingIndicator?: boolean;
  options: DatePresetOption[];
  value: ISODateRangeWithPreset | null;
  children: JSX.Element;
  onChangeValue(value: ISODateRangeWithPreset): void;
};

type Selection = {
  option: DatePresetOption | null;
  dateRange: ISODateRange | null;
};

export function DatePresetPickerPopover({
  locale,
  timeZone,
  defaultIsOpen = false,
  hideSelectedRange = false,
  placement = 'bottom',
  alignment = 'start',
  formatTimeZone = DatePresetPickerPopover.formatTimeZone,
  formatDateRange = DatePresetPickerPopover.formatDateRange,
  cancelButtonLabel,
  confirmButtonLabel,
  customDatePresetLabel,
  disableActionButtons,
  showLoadingIndicator,
  options,
  value,
  children,
  onChangeValue,
}: DatePresetPickerPopoverProps) {
  const popover = useRef<PopoverRef>(null);
  const [selection, setSelection] = useState(() =>
    mapValueToSelection(value, options)
  );
  const selectedDateRange = selection.dateRange;
  const selectedOption = selection.option;

  function handleOpenPopover(): void {
    setSelection(mapValueToSelection(value, options));
  }

  function handleChangeDatePreset(datePreset: DatePreset): void {
    const option = options.find((option) => option.datePreset === datePreset);
    if (option) {
      setSelection({ option, dateRange: option.dateRange });
    }
  }

  function handleChangeDateRange(dateRange: ISODateRange): void {
    const option = options.find((option) => {
      return (
        option.dateRange.start === dateRange.start &&
        option.dateRange.end === dateRange.end
      );
    });
    setSelection({ dateRange, option: option || null });
  }

  function handleCancel(): void {
    popover.current?.close();
  }

  function handleConfirm(): void {
    if (selectedOption) {
      const isChanged =
        value == null || value.datePreset !== selectedOption.datePreset;

      if (isChanged) {
        onChangeValue({
          datePreset: selectedOption.datePreset,
          dateRange: selectedOption.dateRange,
        });
      }
    } else if (selectedDateRange) {
      const isChanged =
        value == null ||
        value.dateRange.start !== selectedDateRange.start ||
        value.dateRange.end !== selectedDateRange.end;

      if (isChanged) {
        onChangeValue({ datePreset: '', dateRange: selectedDateRange });
      }
    }

    popover.current?.close();
  }

  const formattedTimeZone = timeZone ? formatTimeZone(timeZone) : '';
  const formattedDateRange = selectedDateRange
    ? formatDateRange(selectedDateRange)
    : '';
  return (
    <Popover
      ref={popover}
      className="dc-date-preset-picker-popover"
      defaultIsOpen={defaultIsOpen}
      placement={placement}
      alignment={alignment}
      anchor={children}
      onOpen={handleOpenPopover}
    >
      <DatePresetPicker
        locale={locale}
        formattedTimeZone={formattedTimeZone}
        formattedDateRange={hideSelectedRange ? '' : formattedDateRange}
        cancelButtonLabel={cancelButtonLabel}
        confirmButtonLabel={confirmButtonLabel}
        customDatePresetLabel={customDatePresetLabel}
        disableActionButtons={disableActionButtons}
        showLoadingIndicator={showLoadingIndicator}
        options={options}
        dateRange={selection.dateRange}
        datePreset={selection.option?.datePreset || ''}
        onChangeDatePreset={handleChangeDatePreset}
        onChangeDateRange={handleChangeDateRange}
        onCancel={handleCancel}
        onConfirm={handleConfirm}
      />
    </Popover>
  );
}

function mapValueToSelection(
  value: ISODateRangeWithPreset | null,
  options: DatePresetOption[]
): Selection {
  if (value?.datePreset) {
    const datePreset = value.datePreset;
    const option = options.find((option) => option.datePreset === datePreset);
    if (option) {
      return { option, dateRange: option.dateRange };
    }
  }

  if (value?.dateRange) {
    return { option: null, dateRange: value.dateRange };
  }

  return { option: null, dateRange: null };
}

const formatDateRange: DateRangeFormatter = (dateRange, locale) => {
  const intl = new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
  const startDate = intl.format(new Date(dateRange.start));
  const endDate = intl.format(new Date(dateRange.end));
  return startDate !== endDate ? `${startDate} - ${endDate}` : startDate;
};
DatePresetPickerPopover.formatDateRange = formatDateRange;

const formatTimeZone: TimeZoneFormatter = (timeZone, locale) => {
  const intl = new Intl.DateTimeFormat(locale, {
    timeZone,
    second: '2-digit',
    timeZoneName: 'long',
  });
  return intl.format(new Date()).replace(/^\d{1,2} /, '');
};
DatePresetPickerPopover.formatTimeZone = formatTimeZone;
