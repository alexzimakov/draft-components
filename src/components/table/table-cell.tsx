import { forwardRef, type ComponentPropsWithRef } from 'react';
import { classNames } from '../../shared/react-helpers';

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
