import { ComponentPropsWithoutRef } from 'react';
import { classNames } from '../../lib/react-helpers';

export type TableCellProps = ComponentPropsWithoutRef<'td'>;

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
