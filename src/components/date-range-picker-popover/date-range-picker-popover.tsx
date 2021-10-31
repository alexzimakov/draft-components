import { ReactNode, useMemo, useState } from 'react';
import {
  ISODateRange,
  ISODateRangeWithDatePreset,
} from '../../lib/date-helpers';
import { Popover } from '../popover';
import { Button } from '../button';
import { DateRangePicker } from '../date-picker';
import { DatePresetList, DatePresetOption } from './date-preset-list';

export interface DateRangePickerPopoverProps {
  locale?: string;
  cancelButtonLabel?: ReactNode;
  applyButtonLabel?: ReactNode;
  defaultIsOpen?: boolean;
  options?: DatePresetOption[];
  dateRange: ISODateRangeWithDatePreset | null;
  onChangeDateRange(dateRange: ISODateRangeWithDatePreset): void;
  children(props: {
    isOpen: boolean;
    formattedDateRange: string;
    openPopover(): void;
    closePopover(): void;
    togglePopoverVisibility(): void;
  }): JSX.Element;
}

export function DateRangePickerPopover({
  locale,
  cancelButtonLabel = 'Cancel',
  applyButtonLabel = 'Apply',
  defaultIsOpen = false,
  options,
  children: renderChildren,
  dateRange: defaultDateRange,
  onChangeDateRange,
}: DateRangePickerPopoverProps) {
  const [isOpen, setIsOpen] = useState(defaultIsOpen);
  const [dateRange, setDateRange] = useState(defaultDateRange);

  const selectedOption = useMemo(() => {
    return (
      dateRange &&
      options &&
      options.find(option => option.dateRange.datePreset === dateRange.datePreset)
    ) || null;
  }, [dateRange, options]);


  let formattedDateRange = '';
  if (dateRange) {
    const intl = new Intl.DateTimeFormat(locale, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
    const startDate = intl.format(Date.parse(dateRange.startDate));
    const endDate = intl.format(Date.parse(dateRange.endDate));

    formattedDateRange = startDate !== endDate
      ? `${startDate} - ${endDate}`
      : startDate;

    if (selectedOption) {
      formattedDateRange = `${selectedOption.label}: ${formattedDateRange}`;
    }
  }

  function openPopover() {
    setIsOpen(true);
  }

  function closePopover() {
    setDateRange(defaultDateRange);
    setIsOpen(false);
  }

  function togglePopoverVisibility() {
    if (isOpen) {
      closePopover();
    } else {
      openPopover();
    }
  }

  function handleSelectOption(option: DatePresetOption) {
    setDateRange(option.dateRange);
  }

  function handleApplyButtonClick() {
    if (dateRange) {
      onChangeDateRange(dateRange);
    }
    setIsOpen(false);
  }

  function handleChangeRange(newDateRange: ISODateRange) {
    if (options) {
      const selectedOption = options.find(option => (
        option.dateRange.startDate === newDateRange.startDate &&
        option.dateRange.endDate === newDateRange.endDate
      ));
      if (selectedOption) {
        newDateRange = selectedOption.dateRange;
      }
    }
    setDateRange(newDateRange);
  }

  const content = (
    <div className="dc-date-range-picker-popover__content">
      <div className="dc-date-range-picker-popover__content-body">
        {Array.isArray(options) && options.length > 0 && (
          <DatePresetList
            options={options}
            selectedDateRange={dateRange}
            onSelectedDateRange={handleSelectOption}
          />
        )}

        <DateRangePicker
          locale={locale}
          range={dateRange}
          onChangeRange={handleChangeRange}
        />
      </div>


      <div className="dc-date-range-picker-popover__content-footer">
        <Button type="button" appearance="secondary" onClick={closePopover}>
          {cancelButtonLabel}
        </Button>
        <Button
          type="button"
          appearance="primary"
          onClick={handleApplyButtonClick}
        >
          {applyButtonLabel}
        </Button>
      </div>
    </div>
  );

  return (
    <Popover
      className="dc-date-range-picker-popover"
      isOpen={isOpen}
      content={content}
      onClose={closePopover}
    >
      {renderChildren({
        isOpen,
        formattedDateRange,
        openPopover,
        closePopover,
        togglePopoverVisibility,
      })}
    </Popover>
  );
}
