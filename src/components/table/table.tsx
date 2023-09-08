import { ComponentPropsWithRef, forwardRef } from 'react';
import { classNames } from '../../lib/react-helpers.js';

type TableBaseProps = ComponentPropsWithRef<'table'>;
export type TableCellSize = 'sm' | 'md' | 'lg';
export type TableProps = {
  cellSize?: TableCellSize;
  isStriped?: boolean;
  isBordered?: boolean;
  highlightRowOnHover?: boolean;
} & TableBaseProps;

export const Table = forwardRef<
  HTMLTableElement,
  TableProps
>(function Table({
  cellSize = 'md',
  isStriped = false,
  isBordered = false,
  highlightRowOnHover = false,
  className,
  children,
  ...props
}, ref) {
  return (
    <table
      {...props}
      ref={ref}
      className={classNames(className, 'dc-table', {
        [`dc-table_cell_${cellSize}`]: cellSize,
        'dc-table_striped': isStriped,
        'dc-table_bordered': isBordered,
        'dc-table_highlight_row': highlightRowOnHover,
      })}
    >
      {children}
    </table>
  );
});
