import * as React from 'react';
import { classNames } from '../../lib';

export interface TableCellProps extends React.ComponentPropsWithoutRef<'td'> {}

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
