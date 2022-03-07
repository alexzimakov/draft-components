import { ComponentPropsWithRef, forwardRef } from 'react';
import { classNames } from '../../lib/react-helpers';

export interface TableProps extends ComponentPropsWithRef<'table'> {
  isLoading?: boolean;
  isBordered?: boolean;
  isStriped?: boolean;
  cellPadding?: 'sm' | 'md' | 'lg';
  hasStickyHeader?: boolean;
  shouldHighlightActiveRow?: boolean;
}

export const Table = forwardRef<HTMLTableElement, TableProps>(function Table(
  {
    isLoading,
    isBordered,
    isStriped,
    cellPadding,
    hasStickyHeader,
    shouldHighlightActiveRow,
    className,
    children,
    ...props
  },
  ref
) {
  return (
    <table
      {...props}
      ref={ref}
      className={classNames(className, 'dc-table', {
        'dc-table_loading': isLoading,
        'dc-table_bordered': isBordered,
        'dc-table_striped': isStriped,
        'dc-table_sticky-header': hasStickyHeader,
        'dc-table_row_highlighted': shouldHighlightActiveRow,
        [`dc-table_padding_${cellPadding}`]: cellPadding,
      })}
      cellSpacing={0}
    >
      {children}
    </table>
  );
});
