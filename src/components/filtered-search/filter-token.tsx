import { MouseEventHandler, ReactNode, forwardRef } from 'react';
import { classNames } from '../../lib';
import { XMarkIcon } from './icons';
import { useTranslations } from './use-translations';

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
        <XMarkIcon />
      </button>
    </div>
  );
});
