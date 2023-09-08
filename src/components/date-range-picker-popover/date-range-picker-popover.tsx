import { DateISORange } from '../date-picker/date-range.js';
import { DateRangePickerPopoverOption, DateRangePickerPopoverSelection } from './types.js';
import { classNames } from '../../lib/react-helpers.js';
import { assertIfNullable } from '../../lib/helpers.js';
import { findSelectedOption } from './helpers.js';
import { JSX, ReactNode, useRef, useState } from 'react';
import { useIsCompactView } from './use-is-compact-view.js';
import { Popover, PopoverAlignment, PopoverPlacement, PopoverRef } from '../popover/index.js';
import { DateRangePicker, DateRangePickerProps } from '../date-picker/index.js';
import { DateRangePickerPopoverFooter } from './date-range-picker-popover-footer.js';
import { DateRangePickerPopoverPresets } from './date-range-picker-popover-presets.js';

export type DateRangePickerPopoverPlacement = PopoverPlacement;
export type DateRangePickerPopoverAlignment = PopoverAlignment;
export type DateRangePickerPopoverRenderFooter = (context: {
  selection: DateRangePickerPopoverSelection | null,
}) => ReactNode;
export type DateRangePickerPopoverProps = {
  className?: string;
  defaultIsOpen?: boolean;
  compactViewBreakpoint?: string;
  customPreset?: string;
  customPresetLabel?: string;
  placement?: DateRangePickerPopoverPlacement;
  alignment?: DateRangePickerPopoverAlignment;
  cancelButtonLabel?: ReactNode;
  confirmButtonLabel?: ReactNode;
  footer?: ReactNode | DateRangePickerPopoverRenderFooter;
  options?: DateRangePickerPopoverOption[];
  children: JSX.Element;
  value: DateRangePickerPopoverSelection | null;
  onChangeValue: (value: DateRangePickerPopoverSelection) => void;
} & Pick<DateRangePickerProps,
  | 'min'
  | 'max'
  | 'locale'
  | 'weekStartsOn'
  | 'prevMonthButtonLabel'
  | 'nextMonthButtonLabel'
  | 'monthSelectLabel'
  | 'yearInputLabel'
>;

export function DateRangePickerPopover({
  defaultIsOpen = false,
  compactViewBreakpoint = '(max-width: 599px)',
  customPreset = 'custom',
  customPresetLabel = 'Custom date preset',
  placement = 'bottom',
  alignment = 'start',
  cancelButtonLabel = 'Cancel',
  confirmButtonLabel = 'Confirm',
  footer = null,
  className,
  options = [],
  children,
  value,
  onChangeValue,
  // DateRangePickerProps
  min,
  max,
  locale,
  weekStartsOn,
  prevMonthButtonLabel,
  nextMonthButtonLabel,
  monthSelectLabel,
  yearInputLabel,
}: DateRangePickerPopoverProps) {
  const [selection, setSelection] = useState(value);
  const popoverRef = useRef<PopoverRef>(null);
  const isCompactView = useIsCompactView(compactViewBreakpoint);

  function getPopover(): PopoverRef {
    const popover = popoverRef.current;
    assertIfNullable(popover, 'Popover ref was not set');
    return popover;
  }

  function handleClickCancelButton() {
    getPopover().close();
  }

  function handleClickConfirmButton() {
    if (selection) {
      onChangeValue(selection);
    }
    getPopover().close();
  }

  function handleChangeDateRange(range: DateISORange) {
    const selection = { range, preset: customPreset };
    const selectedOption = findSelectedOption(selection, options);
    if (selectedOption) {
      setSelection({
        preset: selectedOption.preset,
        range: selectedOption.range,
      });
    } else {
      setSelection(selection);
    }
  }

  return (
    <Popover
      className={classNames(className, {
        'dc-date-range-picker-popover': true,
        'dc-date-range-picker-popover_compact': isCompactView,
      })}
      ref={popoverRef}
      placement={placement}
      alignment={alignment}
      anchor={children}
      defaultIsOpen={defaultIsOpen}
      onOpen={() => setSelection(value)}
    >
      {options.length > 0 && (
        <DateRangePickerPopoverPresets
          isCompactView={isCompactView}
          customPresetLabel={customPresetLabel}
          options={options}
          value={selection}
          onChangeValue={setSelection}
        />
      )}
      <DateRangePicker
        className="dc-date-range-picker-popover__calendar"
        min={min}
        max={max}
        locale={locale}
        weekStartsOn={weekStartsOn}
        prevMonthButtonLabel={prevMonthButtonLabel}
        nextMonthButtonLabel={nextMonthButtonLabel}
        monthSelectLabel={monthSelectLabel}
        yearInputLabel={yearInputLabel}
        value={selection && selection.range}
        onChangeValue={handleChangeDateRange}
      />
      <DateRangePickerPopoverFooter
        cancelButtonLabel={cancelButtonLabel}
        confirmButtonLabel={confirmButtonLabel}
        onClickCancelButton={handleClickCancelButton}
        onClickConfirmButton={handleClickConfirmButton}
      >
        {typeof footer === 'function'
          ? footer({ selection })
          : footer}
      </DateRangePickerPopoverFooter>
    </Popover>
  );
}
