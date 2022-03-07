import { ComponentPropsWithRef, forwardRef } from 'react';
import { classNames } from '../../lib/react-helpers';
import {
  Order,
  TableSortButton,
  TableSortButtonProps,
} from './table-sort-button';

export interface TableHeaderCellProps extends ComponentPropsWithRef<'th'> {
  isSortable?: boolean;
  order?: TableSortButtonProps['order'];
  onChangeOrder?: TableSortButtonProps['onSort'];
  renderSortButtonLabel?: TableSortButtonProps['renderLabel'];
}

const ariaSortValues: Record<Order, TableHeaderCellProps['aria-sort']> = {
  none: 'none',
  asc: 'ascending',
  desc: 'descending',
};

export const TableHeaderCell = forwardRef<
  HTMLTableHeaderCellElement,
  TableHeaderCellProps
>(function TableHeaderCell(
  {
    isSortable,
    order = 'none',
    renderSortButtonLabel,
    onChangeOrder,
    className,
    role = 'columnheader',
    align = 'left',
    children,
    ...props
  },
  ref
) {
  return (
    <th
      aria-sort={isSortable ? ariaSortValues[order] : undefined}
      {...props}
      ref={ref}
      className={classNames(className, 'dc-table-cell', 'dc-table-cell_header')}
      role={role}
      align={align}
    >
      <div className="dc-table-cell__body">
        {children}
        {isSortable && (
          <TableSortButton
            className="dc-table-cell__sort-btn"
            column={children}
            order={order}
            onSort={onChangeOrder}
            renderLabel={renderSortButtonLabel}
          />
        )}
      </div>
    </th>
  );
});
