import { ComponentPropsWithRef, forwardRef } from 'react';
import { classNames } from '../../lib/react-helpers';

export interface TableRowProps extends ComponentPropsWithRef<'tr'> {
  isSelected?: boolean;
}

export const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(
  function TableRow({ isSelected, className, ...props }, ref) {
    return (
      <tr
        {...props}
        ref={ref}
        className={classNames(
          'dc-table-row',
          isSelected && 'dc-table-row_selected',
          className
        )}
      />
    );
  }
);
