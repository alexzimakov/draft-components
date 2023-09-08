import { ComponentPropsWithRef, forwardRef } from 'react';
import { classNames } from '../../lib/react-helpers.js';

export type TableCellProps = ComponentPropsWithRef<'td'>;

export const TableCell = forwardRef<
  HTMLTableCellElement,
  TableCellProps
>(function TableCell({
  className,
  children,
  ...props
}, ref) {
  return (
    <td
      {...props}
      ref={ref}
      className={classNames('dc-table-cell', className)}
    >
      {children}
    </td>
  );
});
