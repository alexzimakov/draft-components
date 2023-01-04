import { forwardRef, type ComponentPropsWithRef } from 'react';
import { classNames } from '../../shared/react-helpers';

type FilterButtonHTMLProps = ComponentPropsWithRef<'button'>;
export type FilterButtonProps = {
  isActive?: boolean;
} & FilterButtonHTMLProps;

export const FilterButton = forwardRef<
  HTMLButtonElement,
  FilterButtonProps
>(function FilterButton({
  isActive = false,
  'aria-pressed': ariaPressed = isActive,
  className,
  children,
  ...props
}, ref) {
  return (
    <button
      {...props}
      ref={ref}
      className={classNames(
        'dc-filter-button',
        isActive && 'active',
        className
      )}
      data-active={isActive}
      aria-pressed={ariaPressed}
    >
      {children}
    </button>
  );
});