import { ReactNode } from 'react';
import { isFunction } from '../../lib/guards';
import { classNames } from '../../lib/react-helpers';
import { Button, ButtonProps } from '../button';
import { Icon, SvgIcon } from '../svg-icon';

export type Order = 'none' | 'asc' | 'desc';

export interface TableSortButtonProps
  extends Pick<ButtonProps, 'id' | 'style' | 'className'> {
  column: ReactNode;
  order: Order;
  onSort?(sortDirection: Order): void;
  renderLabel?(column: ReactNode, order: Order): ReactNode;
}

const orderSequence: Record<Order, Order> = {
  none: 'asc',
  asc: 'desc',
  desc: 'none',
};
const orderIcons: Record<Order, Icon> = {
  none: {
    name: 'sort',
    width: 16,
    height: 16,
    viewBox: '0 0 16 16',
    children: (
      <path
        fill="currentColor"
        d="M4.7065 8.96458H11.6935C12.3217 8.96458 12.6359 9.74529 12.1926 10.2005L8.69907 13.7875C8.42311 14.0708 7.97689 14.0708 7.70386 13.7875L4.20743 10.2005C3.76414 9.74529 4.07826 8.96458 4.7065 8.96458ZM12.1926 5.79955L8.69907 2.21251C8.42311 1.92916 7.97689 1.92916 7.70386 2.21251L4.20743 5.79955C3.76414 6.25471 4.07826 7.03542 4.7065 7.03542H11.6935C12.3217 7.03542 12.6359 6.25471 12.1926 5.79955Z"
      />
    ),
  },
  asc: {
    name: 'sort-asc',
    width: 16,
    height: 16,
    viewBox: '0 0 16 16',
    children: (
      <path
        fill="currentColor"
        d="M12.1599 5H3.84116C3.09317 5 2.71918 5.93026 3.24697 6.47261L7.40634 10.7468C7.7349 11.0844 8.26618 11.0844 8.59124 10.7468L12.7506 6.47261C13.2819 5.93026 12.9079 5 12.1599 5Z"
      />
    ),
  },
  desc: {
    name: 'sort-desc',
    width: 16,
    height: 16,
    viewBox: '0 0 16 16',
    children: (
      <path
        fill="currentColor"
        d="M12.1599 11H3.84116C3.09317 11 2.71918 10.0697 3.24697 9.52739L7.40634 5.25322C7.7349 4.91559 8.26618 4.91559 8.59124 5.25322L12.7506 9.52739C13.2819 10.0697 12.9079 11 12.1599 11Z"
      />
    ),
  },
};
const displayedOrders: Record<Order, string> = {
  none: 'default',
  asc: 'ascending',
  desc: 'descending',
};

export function TableSortButton({
  column,
  order,
  onSort,
  renderLabel = renderDefaultLabel,
  className,
  ...props
}: TableSortButtonProps) {
  const nextOrder = orderSequence[order] ?? 'asc';
  return (
    <Button
      {...props}
      className={classNames(className, 'dc-table-sort-btn')}
      appearance="minimal"
      noPadding={true}
      size="xs"
      leadingIcon={<SvgIcon icon={orderIcons[order]} size={14} />}
      onClick={() => {
        isFunction(onSort) && onSort(nextOrder);
      }}
    >
      {renderLabel(column, nextOrder)}
    </Button>
  );
}

function renderDefaultLabel(column: ReactNode, order: Order): ReactNode {
  return (
    <>
      Sort by {column} in {displayedOrders[order]} order
    </>
  );
}
