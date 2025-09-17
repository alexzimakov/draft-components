import { type ComponentProps, type MouseEventHandler, type ReactNode } from 'react';
import { classNames } from '../../lib/react-helpers.js';
import { useTranslations } from './use-translations.js';

type FilterTokenHTMLProps = ComponentProps<'div'>;

type FilterTokenBaseProps = {
  className?: string;
  isHighlighted?: boolean;
  children: ReactNode;
  onClickLabel?: MouseEventHandler<HTMLSpanElement>;
  onClickCloseButton?: MouseEventHandler<HTMLButtonElement>;
};

export type FilterTokenProps =
  & FilterTokenBaseProps
  & Omit<FilterTokenHTMLProps, keyof FilterTokenBaseProps>;

export function FilterToken({
  ref,
  className,
  isHighlighted,
  children,
  onClickLabel,
  onClickCloseButton,
}: FilterTokenProps) {
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
}

function XMarkIcon(props: ComponentProps<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={24}
      height={24}
      stroke="currentColor"
      strokeWidth={1.5}
      fill="none"
      {...props}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
    </svg>
  );
}
