import { classNames } from '../../lib/react-helpers';
import type { ComponentPropsWithoutRef } from 'react';

export interface TableRowProps extends ComponentPropsWithoutRef<'tr'> {
  isSelected?: boolean;
}

export function TableRow({ isSelected, className, ...props }: TableRowProps) {
  return (
    <tr
      {...props}
      className={classNames(className, 'dc-table-row', {
        'dc-table-row_selected': isSelected,
      })}
    />
  );
}
