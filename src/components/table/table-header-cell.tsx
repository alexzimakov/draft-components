import * as React from 'react';
import { classNames } from '../../lib';
import {
  TableSortButton,
  TableSortButtonProps,
  Order,
} from './table-sort-button';

export interface TableHeaderCellProps
  extends React.ComponentPropsWithoutRef<'th'> {
  isSortable?: boolean;
  order?: TableSortButtonProps['order'];
  onSort?: TableSortButtonProps['onSort'];
  renderSortButtonLabel?: TableSortButtonProps['renderLabel'];
}

const ariaSortValues: Record<Order, TableHeaderCellProps['aria-sort']> = {
  none: 'none',
  asc: 'ascending',
  desc: 'descending',
};

export function TableHeaderCell({
  isSortable,
  order = 'none',
  renderSortButtonLabel,
  onSort,
  className,
  role = 'columnheader',
  align = 'left',
  children,
  ...props
}: TableHeaderCellProps) {
  return (
    <th
      aria-sort={isSortable ? ariaSortValues[order] : undefined}
      {...props}
      className={classNames(className, 'dc-table-cell', 'dc-table-cell_header')}
      role={role}
      align={align}
    >
      <div className="dc-table-cell__body">
        {isSortable && (
          <TableSortButton
            className="dc-table-cell__sort-btn"
            column={children}
            order={order}
            onSort={onSort}
            renderLabel={renderSortButtonLabel}
          />
        )}
        {children}
      </div>
    </th>
  );
}
