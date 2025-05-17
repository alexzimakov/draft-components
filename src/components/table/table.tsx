import { ComponentProps, forwardRef } from 'react';
import { classNames } from '../../lib/react-helpers.js';

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

export const Table = forwardRef<
  HTMLTableElement,
  TableProps
>(function Table({
  cellSize = 'md',
  isStriped = false,
  isBordered = false,
  shouldHighlightHoveredRow = false,
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
        'dc-table_highlight_row': shouldHighlightHoveredRow,
      })}
    >
      {children}
    </table>
  );
});
