import { ReactNode, RefObject, useEffect, useMemo, useState } from 'react';
import { classNames } from '../../lib/react-helpers';
import { ISODateRange } from '../../lib/plain-date-range';
import { DateRangePicker } from '../date-range-picker';
import { Button } from '../Button';
import {
  DatePreset,
  DatePresetOption,
  DatePresetSelect,
} from './date-preset-select';

export interface DatePresetPickerProps {
  cancelButtonRef?: RefObject<HTMLButtonElement>;
  confirmButtonRef?: RefObject<HTMLButtonElement>;
  locale?: string;
  cancelButtonLabel?: ReactNode;
  confirmButtonLabel?: ReactNode;
  formattedDateRange?: ReactNode;
  formattedTimeZone?: ReactNode;
  customDatePresetLabel?: string;
  disableActionButtons?: boolean;
  showLoadingIndicator?: boolean;
  options: DatePresetOption[];
  datePreset: DatePreset;
  dateRange: ISODateRange | null;
  onChangeDatePreset(preset: string): void;
  onChangeDateRange(range: ISODateRange): void;
  onCancel(): void;
  onConfirm(): void;
}

export function DatePresetPicker({
  locale,
  cancelButtonLabel = 'Cancel',
  confirmButtonLabel = 'Confirm',
  customDatePresetLabel,
  formattedDateRange,
  formattedTimeZone,
  disableActionButtons,
  showLoadingIndicator,
  options,
  datePreset,
  dateRange,
  onChangeDatePreset,
  onChangeDateRange,
  onCancel,
  onConfirm,
}: DatePresetPickerProps) {
  const phoneBreakpoint = useMemo(
    () => window.matchMedia('(max-width: 599px)'),
    []
  );
  const [isPhoneView, setIsPhoneView] = useState(phoneBreakpoint.matches);

  useEffect(() => {
    const handleMediaQueryMatch = (event: MediaQueryListEvent) => {
      setIsPhoneView(event.matches);
    };

    phoneBreakpoint.addEventListener('change', handleMediaQueryMatch);
    return () => {
      phoneBreakpoint.removeEventListener('change', handleMediaQueryMatch);
    };
  }, [phoneBreakpoint]);

  return (
    <div
      className={classNames(
        'dc-date-preset-picker',
        isPhoneView && 'dc-date-preset-picker_phone-view'
      )}
    >
      <div className="dc-date-preset-picker__body">
        {options.length > 0 && (
          <DatePresetSelect
            shouldRenderAsNativeSelect={isPhoneView}
            customDatePresetLabel={customDatePresetLabel}
            options={options}
            value={datePreset}
            onChangeValue={onChangeDatePreset}
          />
        )}
        <DateRangePicker
          locale={locale}
          value={dateRange}
          onChangeValue={onChangeDateRange}
        />
      </div>
      <div className="dc-date-preset-picker__footer">
        {formattedDateRange && (
          <div className="dc-date-preset-picker__selection">
            <span>{formattedDateRange}</span>
            {formattedTimeZone && <small>{formattedTimeZone}</small>}
          </div>
        )}
        <div className="dc-date-preset-picker__btns">
          <Button
            appearance="secondary"
            disabled={disableActionButtons}
            onClick={onCancel}
          >
            {cancelButtonLabel}
          </Button>
          <Button
            appearance="primary"
            disabled={disableActionButtons}
            isLoading={showLoadingIndicator}
            onClick={onConfirm}
          >
            {confirmButtonLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
