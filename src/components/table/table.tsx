import { type ComponentProps } from 'react';
import { classNames } from '../../lib/react-helpers.js';
import { TableContainer } from './table-container.js';
import { TableHead } from './table-head.js';
import { TableBody } from './table-body.js';
import { TableRow } from './table-row.js';
import { TableHeadCell } from './table-head-cell.js';
import { TableCell } from './table-cell.js';

export type TableCellSize = 'sm' | 'md' | 'lg';

type TableHTMLProps = ComponentProps<'table'>;

type TableBaseProps = {
  cellSize?: TableCellSize;
  isStriped?: boolean;
  isBordered?: boolean;
  shouldHighlightHoveredRow?: boolean;
};

export type TableProps =
  & TableBaseProps
  & Omit<TableHTMLProps, keyof TableBaseProps>;

export function Table({
  cellSize = 'md',
  isStriped = false,
  isBordered = false,
  shouldHighlightHoveredRow = false,
  className,
  children,
  ...props
}: TableProps) {
  return (
    <table
      {...props}
      className={classNames(className, 'dc-table', {
        [`dc-table_cell_${cellSize}`]: cellSize,
        'dc-table_striped': isStriped,
        'dc-table_bordered': isBordered,
        'dc-table_highlight_row': shouldHighlightHoveredRow,
      })}
    >
      {children}
    </table>
  );
}

Table.Container = TableContainer;
Table.Head = TableHead;
Table.Body = TableBody;
Table.Row = TableRow;
Table.HeadCell = TableHeadCell;
Table.Cell = TableCell;
