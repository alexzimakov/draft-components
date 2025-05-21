import { type MouseEventHandler, type ReactNode } from 'react';
import { Button } from '../button/index.js';

export type DateRangePickerPopoverFooterProps = {
  children?: ReactNode;
  cancelButtonLabel: ReactNode;
  confirmButtonLabel: ReactNode;
  onClickCancelButton: MouseEventHandler<HTMLButtonElement>;
  onClickConfirmButton: MouseEventHandler<HTMLButtonElement>;
};

export function DateRangePickerPopoverFooter({
  children,
  cancelButtonLabel,
  confirmButtonLabel,
  onClickCancelButton,
  onClickConfirmButton,
}: DateRangePickerPopoverFooterProps) {
  return (
    <div className="dc-date-range-picker-popover__footer">
      {Boolean(children) && (
        <div className="dc-date-range-picker-popover__footer-content">
          {children}
        </div>
      )}
      <Button
        className="dc-date-range-picker-popover__footer-cancel"
        onClick={onClickCancelButton}
      >
        {cancelButtonLabel}
      </Button>
      <Button
        className="dc-date-range-picker-popover__footer-confirm"
        tint="blue"
        onClick={onClickConfirmButton}
      >
        {confirmButtonLabel}
      </Button>
    </div>
  );
}
