import { ComponentProps, forwardRef } from 'react';
import { classNames } from '../../lib/react-helpers.js';

type TableRowHTMLProps = ComponentProps<'tr'>;

type TableRowBaseProps = {
  isSelected?: boolean;
};

export type TableRowProps =
  & TableRowBaseProps
  & Omit<TableRowHTMLProps, keyof TableRowBaseProps>;

export const TableRow = forwardRef<
  HTMLTableRowElement,
  TableRowProps
>(function TableRow({ isSelected, className, ...props }, ref) {
  return (
    <tr
      {...props}
      ref={ref}
      className={classNames(className, {
        'dc-table-row': true,
        'dc-table-row_selected': isSelected,
      })}
    />
  );
});
