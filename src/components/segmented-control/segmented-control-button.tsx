import { type ReactNode } from 'react';
import { classNames } from '../../shared/react-helpers';

export type SegmentedControlButtonProps<T extends string | number> = {
  icon?: ReactNode;
  children?: ReactNode;
  className?: string;
  checked: boolean;
  value: T;
  onChangeValue: (value: T) => void;
};

export function SegmentedControlButton<T extends string | number>({
  className,
  checked,
  icon,
  children,
  value,
  onChangeValue,
}: SegmentedControlButtonProps<T>) {
  function handleClick() {
    if (!checked) {
      onChangeValue(value);
    }
  }

  return (
    <li
      className={classNames(className, 'dc-segmented__button')}
      role="radio"
      data-value={value}
      aria-checked={checked}
      tabIndex={checked ? 0 : -1}
      onClick={handleClick}
    >
      {icon}
      {children}
    </li>
  );
}
