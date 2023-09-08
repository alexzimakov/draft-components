import { ComponentPropsWithRef, KeyboardEvent, ReactNode, useRef } from 'react';
import { KeyboardKeys } from '../../lib/keyboard-keys.js';
import { assertIfNullable } from '../../lib/helpers.js';
import { classNames, focusElement } from '../../lib/react-helpers.js';
import { SegmentedControlButton } from './segmented-control-button.js';

export type SegmentedControlOption<T extends string | number> = {
  value: T;
  icon?: ReactNode;
  label?: ReactNode;
};
export type SegmentedControlSize = 'sm' | 'md' | 'lg';
export type SegmentedControlProps<T extends string | number> = {
  size?: SegmentedControlSize;
  disabled?: boolean;
  options: SegmentedControlOption<T>[];
  value: T;
  onChangeValue: (value: T) => void;
} & ComponentPropsWithRef<'ul'>;

export function SegmentedControl<T extends string | number>({
  size = 'md',
  disabled = false,
  className,
  value,
  options,
  onChangeValue,
  ...props
}: SegmentedControlProps<T>) {
  const ref = useRef<HTMLUListElement>(null);

  function handleKeyDown(event: KeyboardEvent<HTMLUListElement>): void {
    const prevIndex = options.findIndex((option) => option.value === value);
    const containerEl = ref.current;
    assertIfNullable(containerEl, 'ref.current is null or undefined');

    let index = prevIndex;
    if (
      event.key === KeyboardKeys.ArrowRight ||
      event.key === KeyboardKeys.ArrowDown
    ) {
      index += 1;
    } else if (
      event.key === KeyboardKeys.ArrowLeft ||
      event.key === KeyboardKeys.ArrowUp
    ) {
      index -= 1;
    }

    if (index < 0) {
      index = options.length - 1;
    } else if (index >= options.length) {
      index = 0;
    }

    if (index !== prevIndex) {
      event.stopPropagation();
      event.preventDefault();

      const option = options[index];
      assertIfNullable(option, `Unable to get option at index ${index}`);
      onChangeValue(option.value);

      const radioEl = containerEl.children[index];
      assertIfNullable(radioEl, `Unable to get radio at index ${index}`);
      focusElement(radioEl);
    }
  }

  return (
    <ul
      {...props}
      ref={ref}
      role="radiogroup"
      className={classNames(className, 'dc-segmented', {
        [`dc-segmented_${size}`]: size,
        'dc-segmented_disabled': disabled,
      })}
      onKeyDown={handleKeyDown}
    >
      {options.map((option) => (
        <SegmentedControlButton
          key={option.value}
          icon={option.icon}
          value={option.value}
          checked={value === option.value}
          onChangeValue={onChangeValue}
        >
          {option.label}
        </SegmentedControlButton>
      ))}
    </ul>
  );
}
