import { DateISORange } from '../date-picker/date-range.js';
import { DateRangePickerPopoverOption, DateRangePickerPopoverSelection } from './types.js';
import { classNames } from '../../lib/react-helpers.js';
import { findSelectedOption } from './helpers.js';
import { useIsCompactView } from './use-is-compact-view.js';
import { JSX, ReactNode, RefCallback, useMemo, useState } from 'react';
import { Popover, PopoverPlacement } from '../popover/index.js';
import { DateRangePicker, DateRangePickerProps } from '../date-picker/index.js';
import { DateRangePickerPopoverFooter } from './date-range-picker-popover-footer.js';
import { DateRangePickerPopoverPresets } from './date-range-picker-popover-presets.js';

export type DateRangePickerPopoverFooter = (props: {
  selection: DateRangePickerPopoverSelection | null;
}) => ReactNode;

export type DateRangePickerPopoverChildren = (props: {
  ref: RefCallback<HTMLElement>;
  open: () => void;
  close: () => void;
  toggle: () => void;
}) => JSX.Element;

export type DateRangePickerPopoverProps = Pick<DateRangePickerProps,
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
  compactViewBreakpoint?: string;
  customPreset?: string;
  customPresetLabel?: string;
  cancelButtonLabel?: ReactNode;
  confirmButtonLabel?: ReactNode;
  options?: DateRangePickerPopoverOption[];
  value: DateRangePickerPopoverSelection | null;
  footer?: ReactNode | DateRangePickerPopoverFooter;
  children: DateRangePickerPopoverChildren;
  onChangeValue: (value: DateRangePickerPopoverSelection) => void;
};

export function DateRangePickerPopover({
  className,
  defaultIsOpen = false,
  placement = 'bottom-start',
  compactViewBreakpoint = '(max-width: 599px)',
  customPreset = 'custom',
  customPresetLabel = 'Custom date preset',
  cancelButtonLabel = 'Cancel',
  confirmButtonLabel = 'Confirm',
  options = [],
  value,
  footer,
  children,
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
  const isCompactView = useIsCompactView(compactViewBreakpoint);

  function handleClickCancelButton() {
    popoverApi.close();
  }

  function handleClickConfirmButton() {
    if (selection) {
      onChangeValue(selection);
    }
    popoverApi.close();
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
      placement={placement}
      isOpen={isOpen}
      onClose={popoverApi.close}
      onUnmount={() => setSelection(value)}
      renderAnchor={({ ref }) => children({ ref, ...popoverApi })}
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
        {typeof footer === 'function' ? footer({ selection }) : footer}
      </DateRangePickerPopoverFooter>
    </Popover>
  );
}
