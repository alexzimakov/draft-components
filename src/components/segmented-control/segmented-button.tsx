import { ReactNode } from 'react';
import { classNames } from '../../lib/react-helpers.js';

export type SegmentedButtonProps<T extends string | number> = {
  className?: string;
  disabled?: boolean;
  selected: boolean;
  value: T;
  icon?: ReactNode;
  children?: ReactNode;
  onChangeValue: (value: T) => void;
};

export function SegmentedButton<T extends string | number>({
  className,
  disabled,
  selected,
  value,
  icon,
  children,
  onChangeValue,
}: SegmentedButtonProps<T>) {
  function handleClick() {
    if (!selected) {
      onChangeValue(value);
    }
  }

  return (
    <button
      className={classNames('dc-segmented-button', className)}
      type="button"
      value={value}
      disabled={disabled}
      aria-current={selected}
      onClick={handleClick}
    >
      {icon}
      {children}
    </button>
  );
}
