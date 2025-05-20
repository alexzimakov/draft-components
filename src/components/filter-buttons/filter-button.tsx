import { type ComponentProps } from 'react';
import { classNames } from '../../lib/react-helpers.js';

type FilterButtonHTMLProps = ComponentProps<'button'>;

type FilterButtonBaseProps = {
  isActive?: boolean;
};

export type FilterButtonProps =
  & FilterButtonBaseProps
  & Omit<FilterButtonHTMLProps, keyof FilterButtonBaseProps>;

export function FilterButton({
  ref,
  isActive = false,
  'aria-pressed': ariaPressed = isActive,
  className,
  children,
  ...props
}: FilterButtonProps) {
  return (
    <button
      {...props}
      ref={ref}
      className={classNames(
        'dc-filter-button',
        isActive && 'active',
        className,
      )}
      data-active={isActive}
      aria-pressed={ariaPressed}
    >
      {children}
    </button>
  );
}
