import { ComponentPropsWithoutRef } from 'react';
import { classNames } from '../../lib/react-helpers';

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
