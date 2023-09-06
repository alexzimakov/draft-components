import { ComponentPropsWithRef, ComponentPropsWithoutRef, ElementType, forwardRef } from 'react';
import { classNames } from '../../lib/react-helpers';
import { ArrowsUpDownIcon } from '../hero-icons/24/outline/arrows-up-down-icon';
import { ArrowSmallUpIcon } from '../hero-icons/24/outline/arrow-small-up-icon';
import { ArrowSmallDownIcon } from '../hero-icons/24/outline/arrow-small-down-icon';

type TableHeadCellBaseProps = ComponentPropsWithRef<'th'>;
export type TableHeadCellSort = 'none' | 'ascending' | 'descending'
export type TableHeadCellProps = {
  isSortable?: boolean;
  sort?: TableHeadCellSort;
  onChangeSort?: (sort: TableHeadCellSort) => void;
} & TableHeadCellBaseProps;

const iconMapping: Record<
  TableHeadCellSort,
  ElementType<ComponentPropsWithoutRef<'svg'>>
> = {
  none: ArrowsUpDownIcon,
  ascending: ArrowSmallUpIcon,
  descending: ArrowSmallDownIcon,
};

const stateMapping: Record<
  TableHeadCellSort,
  TableHeadCellSort
> = {
  none: 'ascending',
  ascending: 'descending',
  descending: 'none',
};

export const TableHeadCell = forwardRef<
  HTMLTableCellElement,
  TableHeadCellProps
>(function TableHeaderCell({
  isSortable = false,
  sort = 'none',
  className,
  children,
  onChangeSort,
  ...props
}, ref) {
  if (isSortable) {
    const Icon = iconMapping[sort];
    children = (
      <button
        className="dc-table-cell__sort-btn"
        type="button"
        onClick={() => onChangeSort?.(stateMapping[sort])}
      >
        {children} <Icon
          className="dc-table-cell__sort-icon"
          aria-hidden={true}
          strokeWidth={2}
        />
      </button>
    );
  }

  return (
    <th
      {...props}
      className={classNames(className, {
        'dc-table-cell': true,
        'dc-table-cell_head': true,
        'dc-table-cell_sortable': isSortable,
      })}
      ref={ref}
      aria-sort={isSortable ? sort : props['aria-sort']}
    >
      {children}
    </th>
  );
});
