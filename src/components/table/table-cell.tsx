import { ComponentPropsWithoutRef } from 'react';
import { classNames } from '../../lib/react-helpers';

export type TableCellProps = ComponentPropsWithoutRef<'td'> & {
  isLoading?: boolean;
};

export function TableCell({
  className,
  isLoading = false,
  align = 'left',
  children,
  ...props
}: TableCellProps) {
  return (
    <td
      {...props}
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
