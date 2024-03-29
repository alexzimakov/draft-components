import { ComponentPropsWithRef, forwardRef } from 'react';
import { classNames } from '../../lib/react-helpers.js';

type TableRowBaseProps = ComponentPropsWithRef<'tr'>;
export type TableRowProps = {
  isSelected?: boolean;
} & TableRowBaseProps;

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
