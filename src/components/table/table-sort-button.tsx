import { isFunction } from '../../lib/guards';
import { classNames } from '../../lib/react-helpers';
import { Button } from '../button';
import { SvgIcon } from '../svg-icon';
import { arrowDownUp } from '../../icons/arrow-down-up';
import { arrowDown } from '../../icons/arrow-down';
import { arrowUp } from '../../icons/arrow-up';
import type { ReactNode } from 'react';
import type { ButtonProps } from '../button';
import type { Icon } from '../svg-icon';

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
  none: arrowDownUp,
  desc: arrowDown,
  asc: arrowUp,
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
      leadingIcon={<SvgIcon icon={orderIcons[order]} size={16} />}
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
