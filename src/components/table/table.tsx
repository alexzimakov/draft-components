import { classNames } from '../../lib/react-helpers';
import { TableContainer } from './table-container';
import { TableHead } from './table-head';
import { TableBody } from './table-body';
import { TableRow } from './table-row';
import { TableHeaderCell } from './table-header-cell';
import { TableCell } from './table-cell';
import type { ComponentPropsWithoutRef } from 'react';

export interface TableProps extends ComponentPropsWithoutRef<'table'> {
  isLoading?: boolean;
  isBordered?: boolean;
  isStriped?: boolean;
  densePadding?: boolean;
  hasStickyHeader?: boolean;
  shouldHighlightActiveRow?: boolean;
}

export function Table({
  isLoading,
  isBordered,
  isStriped,
  densePadding,
  hasStickyHeader,
  shouldHighlightActiveRow,
  style,
  className,
  children,
  ...props
}: TableProps) {
  return (
    <table
      {...props}
      className={classNames(className, 'dc-table', {
        'dc-table_loading': isLoading,
        'dc-table_bordered': isBordered,
        'dc-table_striped': isStriped,
        'dc-table_dense-padding': densePadding,
        'dc-table_sticky-header': hasStickyHeader,
        'dc-table_row_highlighted': shouldHighlightActiveRow,
      })}
      cellSpacing={0}
    >
      {children}
    </table>
  );
}

Table.Container = TableContainer;
Table.Head = TableHead;
Table.Body = TableBody;
Table.Row = TableRow;
Table.HeaderCell = TableHeaderCell;
Table.Cell = TableCell;
