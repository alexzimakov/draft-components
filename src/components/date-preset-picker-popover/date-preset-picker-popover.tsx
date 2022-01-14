import { forwardRef, useRef, useState } from 'react';
import { ISODateRange } from '../../lib/plain-date-range';
import { Popover, PopoverProps } from '../popover';
import { DatePresetPicker, DatePresetPickerProps } from './date-preset-picker';
import { DatePreset, DatePresetOption } from './date-preset-select';

export interface ISODateRangeWithPreset {
  datePreset: DatePreset;
  dateRange: ISODateRange;
}

export interface DatePresetPickerPopoverProps {
  locale?: string;
  timeZone?: string;
  defaultIsOpen?: boolean;
  hideSelectedRange?: boolean;
  position?: PopoverProps['position'];
  alignment?: PopoverProps['alignment'];
  cancelButtonLabel?: DatePresetPickerProps['cancelButtonLabel'];
  confirmButtonLabel?: DatePresetPickerProps['confirmButtonLabel'];
  customDatePresetLabel?: DatePresetPickerProps['customDatePresetLabel'];
  disableActionButtons?: DatePresetPickerProps['disableActionButtons'];
  showLoadingIndicator?: DatePresetPickerProps['showLoadingIndicator'];
  options: DatePresetOption[];
  value: ISODateRangeWithPreset | null;
  onChangeValue(value: ISODateRangeWithPreset): void;
  children(props: {
    isShown: boolean;
    formattedValue: string;
    formattedDatePreset: string;
    formattedDateRange: string;
    formattedTimeZone: string;
    openPopover(): void;
    closePopover(): void;
    togglePopover(): void;
  }): JSX.Element;
}

interface SelectionState {
  option: DatePresetOption | null;
  dateRange: ISODateRange | null;
}

export const DatePresetPickerPopover = forwardRef<
  HTMLDivElement,
  DatePresetPickerPopoverProps
>(function DatePresetPickerPopover(
  {
    locale,
    timeZone,
    defaultIsOpen = false,
    hideSelectedRange = false,
    position = 'bottom',
    alignment = 'start',
    cancelButtonLabel,
    confirmButtonLabel,
    customDatePresetLabel,
    disableActionButtons,
    showLoadingIndicator,
    options,
    value,
    onChangeValue,
    children: render,
  },
  ref
) {
  const [isShown, setIsShown] = useState(defaultIsOpen);
  const confirmButtonRef = useRef<HTMLButtonElement>(null);

  const [selectionState, setSelectionState] = useState(valueToSelectionState);
  const selectedDateRange = selectionState.dateRange;
  const selectedOption = selectionState.option;

  let formattedDatePreset = '';
  if (selectedOption) {
    formattedDatePreset = selectedOption.label;
  }

  let formattedDateRange = '';
  if (selectedDateRange) {
    const intl = new Intl.DateTimeFormat(locale, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
    const startDate = intl.format(new Date(selectedDateRange.start));
    const endDate = intl.format(new Date(selectedDateRange.end));
    formattedDateRange =
      startDate !== endDate ? `${startDate} - ${endDate}` : startDate;
  }

  let formattedTimeZone = '';
  if (timeZone) {
    const intl = new Intl.DateTimeFormat(locale, {
      timeZone,
      second: '2-digit',
      timeZoneName: 'long',
    });
    formattedTimeZone = intl.format(new Date()).replace(/^\d{1,2} /, '');
  }

  function valueToSelectionState(): SelectionState {
    const emptySelectionState = { option: null, dateRange: null };
    if (!value) {
      return emptySelectionState;
    } else if (!value.datePreset && value.dateRange) {
      return { option: null, dateRange: value.dateRange };
    } else {
      const datePreset = value.datePreset;
      const option = options.find((option) => option.datePreset === datePreset);
      return option
        ? { option, dateRange: option.dateRange }
        : emptySelectionState;
    }
  }

  function handleChangeDatePreset(preset: string): void {
    const option = options.find((option) => option.datePreset === preset);
    if (option) {
      setSelectionState({ option, dateRange: option.dateRange });
    }
  }

  function handleChangeDateRange(dateRange: ISODateRange): void {
    const option = options.find((option) => {
      const optionDateRange = option.dateRange;
      return (
        optionDateRange.start === dateRange.start &&
        optionDateRange.end === dateRange.end
      );
    });
    setSelectionState({ dateRange, option: option || null });
  }

  function handleConfirm(): void {
    if (
      selectedOption &&
      (value == null || value.datePreset !== selectedOption.datePreset)
    ) {
      onChangeValue({
        datePreset: selectedOption.datePreset,
        dateRange: selectedOption.dateRange,
      });
    } else if (
      selectedDateRange &&
      (value == null ||
        value.dateRange.start !== selectedDateRange.start ||
        value.dateRange.end !== selectedDateRange.end)
    ) {
      onChangeValue({
        datePreset: '',
        dateRange: selectedDateRange,
      });
    }
    setIsShown(false);
  }

  function openPopover(): void {
    setIsShown(true);
  }

  function closePopover(): void {
    setSelectionState(valueToSelectionState());
    setIsShown(false);
  }

  function togglePopover(): void {
    if (isShown) {
      closePopover();
    } else {
      openPopover();
    }
  }

  return (
    <Popover
      ref={ref}
      className="dc-date-preset-picker-popover"
      isShown={isShown}
      position={position}
      alignment={alignment}
      content={
        <DatePresetPicker
          confirmButtonRef={confirmButtonRef}
          locale={locale}
          formattedDateRange={hideSelectedRange ? null : formattedDateRange}
          formattedTimeZone={formattedTimeZone}
          cancelButtonLabel={cancelButtonLabel}
          confirmButtonLabel={confirmButtonLabel}
          customDatePresetLabel={customDatePresetLabel}
          disableActionButtons={disableActionButtons}
          showLoadingIndicator={showLoadingIndicator}
          options={options}
          datePreset={selectionState.option?.datePreset || ''}
          dateRange={selectionState.dateRange}
          onChangeDatePreset={handleChangeDatePreset}
          onChangeDateRange={handleChangeDateRange}
          onCancel={closePopover}
          onConfirm={handleConfirm}
        />
      }
      focusElementRefAfterOpen={confirmButtonRef}
      onClose={closePopover}
    >
      {render({
        isShown,
        openPopover,
        closePopover,
        togglePopover,
        formattedDatePreset,
        formattedDateRange,
        formattedTimeZone,
        formattedValue:
          formattedDatePreset && formattedDateRange
            ? `${formattedDatePreset}: ${formattedDateRange}`
            : formattedDateRange,
      })}
    </Popover>
  );
});
