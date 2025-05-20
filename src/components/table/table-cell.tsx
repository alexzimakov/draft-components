import { type ComponentProps } from 'react';
import { classNames } from '../../lib/react-helpers.js';

type TableCellHTMLProps = ComponentProps<'td'>;

export type TableCellProps = TableCellHTMLProps;

export function TableCell({
  className,
  children,
  ...props
}: TableCellProps) {
  return (
    <td
      {...props}
      className={classNames('dc-table-cell', className)}
    >
      {children}
    </td>
  );
}
