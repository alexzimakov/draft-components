// noinspection ES6PreferShortImport

import * as React from 'react';
import { guards, reactHelpers } from '../../lib';
import { Button, ButtonProps } from '../button';
import { SvgIcon, Icon } from '../svg-icon';
import { arrowDownUp } from '../../icons/arrow-down-up';
import { arrowDown } from '../../icons/arrow-down';
import { arrowUp } from '../../icons/arrow-up';

export type Order = 'none' | 'asc' | 'desc';

export interface TableSortButtonProps
  extends Pick<ButtonProps, 'id' | 'style' | 'className'> {
  column: React.ReactNode;
  order: Order;
  onSort?(sortDirection: Order): void;
  renderLabel?(column: React.ReactNode, order: Order): React.ReactNode;
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
      className={reactHelpers.classNames(className, 'dc-table-sort-btn')}
      appearance="minimal"
      noPadding={true}
      size="xs"
      leadingIcon={<SvgIcon icon={orderIcons[order]} size={16} />}
      onClick={() => {
        guards.isFunction(onSort) && onSort(nextOrder);
      }}
    >
      {renderLabel(column, nextOrder)}
    </Button>
  );
}

function renderDefaultLabel(
  column: React.ReactNode,
  order: Order
): React.ReactNode {
  return (
    <>
      Sort by {column} in {displayedOrders[order]} order
    </>
  );
}
