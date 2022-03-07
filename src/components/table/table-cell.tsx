import { ComponentPropsWithRef, forwardRef } from 'react';
import { classNames } from '../../lib/react-helpers';

export type TableCellProps = ComponentPropsWithRef<'td'> & {
  isLoading?: boolean;
};

export const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(
  function TableCell(
    { className, isLoading = false, align = 'left', children, ...props },
    ref
  ) {
    return (
      <td
        {...props}
        ref={ref}
        align={align}
        className={classNames(
          'dc-table-cell',
          isLoading && 'dc-table-cell_loading',
          className
        )}
      >
        {children}
      </td>
    );
  }
);
