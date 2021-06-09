import { classNames } from '../../lib/react-helpers';
import type { ComponentPropsWithoutRef } from 'react';

export interface TableCellProps extends ComponentPropsWithoutRef<'td'> {}

export function TableCell({
  className,
  align = 'left',
  children,
  ...props
}: TableCellProps) {
  return (
    <td
      {...props}
      align={align}
      className={classNames(className, 'dc-table-cell')}
    >
      {children}
    </td>
  );
}
