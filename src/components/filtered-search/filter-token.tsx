import { type MouseEventHandler, type ReactNode, forwardRef } from 'react';
import { classNames } from '../../lib/react-helpers.js';
import { useTranslations } from './use-translations.js';
import { XMarkIcon } from '../hero-icons/24/outline/x-mark-icon.js';

export type FilterTokenProps = {
  className?: string;
  isHighlighted?: boolean;
  children: ReactNode;
  onClickLabel?: MouseEventHandler<HTMLSpanElement>;
  onClickCloseButton?: MouseEventHandler<HTMLButtonElement>;
};

export const FilterToken = forwardRef<
  HTMLDivElement,
  FilterTokenProps
>(function FilterToken({
  className,
  isHighlighted,
  children,
  onClickLabel,
  onClickCloseButton,
}, ref) {
  const { removeFilterButton } = useTranslations();
  return (
    <div
      ref={ref}
      data-testid="filter-token"
      className={classNames(className, {
        'dc-filter-token': true,
        'dc-filter-token_highlighted': isHighlighted,
      })}
    >
      <button className="dc-filter-token__label" onClick={onClickLabel}>
        {children}
      </button>
      <button
        className="dc-filter-token__button"
        type="button"
        aria-label={removeFilterButton}
        onClick={onClickCloseButton}
      >
        <XMarkIcon width={16} height={16} />
      </button>
    </div>
  );
});
