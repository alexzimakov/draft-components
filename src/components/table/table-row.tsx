import * as React from 'react';
import { classNames } from '../../lib';

export interface TableRowProps extends React.ComponentPropsWithoutRef<'tr'> {
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
