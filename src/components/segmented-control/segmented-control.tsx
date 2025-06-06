import { type ComponentProps, type ReactNode } from 'react';
import { classNames } from '../../lib/react-helpers.js';
import { SegmentedButton } from './segmented-button.js';

export type SegmentedControlSize = 'sm' | 'md' | 'lg';

export type SegmentedControlOption<T extends string | number> = {
  value: T;
  icon?: ReactNode;
  label?: ReactNode;
};

type SegmentedControlHTMLProps = ComponentProps<'ul'>;

type SegmentedControlBaseProps<T extends string | number> = {
  size?: SegmentedControlSize;
  disabled?: boolean;
  options: SegmentedControlOption<T>[];
  value: T;
  onChangeValue: (value: T) => void;
};

export type SegmentedControlProps<T extends string | number> =
  & SegmentedControlBaseProps<T>
  & Omit<SegmentedControlHTMLProps, keyof SegmentedControlBaseProps<T>>;

export function SegmentedControl<T extends string | number>({
  size = 'md',
  disabled,
  className,
  value,
  options,
  onChangeValue,
  ...props
}: SegmentedControlProps<T>) {
  return (
    <ul
      {...props}
      className={classNames(className, 'dc-segmented', {
        [`dc-segmented_size_${size}`]: size,
        'dc-segmented_disabled': disabled,
      })}
    >
      {options.map((option) => {
        const selected = value === option.value;
        return (
          <li
            key={option.value}
            className={classNames({
              'dc-segmented__item': true,
              'dc-segmented__item_selected': selected,
            })}
          >
            <SegmentedButton
              icon={option.icon}
              value={option.value}
              disabled={disabled}
              selected={selected}
              onChangeValue={onChangeValue}
            >
              {option.label}
            </SegmentedButton>
          </li>
        );
      })}
    </ul>
  );
}
