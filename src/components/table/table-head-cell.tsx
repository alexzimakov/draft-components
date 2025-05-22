import { type ComponentProps, type ElementType } from 'react';
import { classNames } from '../../lib/react-helpers.js';
import { ArrowsUpDownIcon } from '../hero-icons/24/outline/arrows-up-down-icon.js';
import { ArrowUpIcon } from '../hero-icons/24/outline/arrow-up-icon.js';
import { ArrowDownIcon } from '../hero-icons/24/outline/arrow-down-icon.js';

export type TableHeadCellSort = 'none' | 'ascending' | 'descending';

type TableHeadCellHTMLProps = ComponentProps<'th'>;

type TableHeadCellBaseProps = {
  isSortable?: boolean;
  sort?: TableHeadCellSort;
  onChangeSort?: (sort: TableHeadCellSort) => void;
};

export type TableHeadCellProps =
  & TableHeadCellBaseProps
  & Omit<TableHeadCellHTMLProps, keyof TableHeadCellBaseProps>;

const iconMapping: Record<
  TableHeadCellSort,
  ElementType<ComponentProps<'svg'>>
> = {
  none: ArrowsUpDownIcon,
  ascending: ArrowUpIcon,
  descending: ArrowDownIcon,
};

const stateMapping: Record<
  TableHeadCellSort,
  TableHeadCellSort
> = {
  none: 'ascending',
  ascending: 'descending',
  descending: 'none',
};

export function TableHeadCell({
  isSortable = false,
  sort = 'none',
  className,
  children,
  onChangeSort,
  ...props
}: TableHeadCellProps) {
  if (isSortable) {
    const Icon = iconMapping[sort];
    children = (
      <button
        className="dc-table-cell__sort-btn"
        type="button"
        onClick={() => {
          if (typeof onChangeSort === 'function') {
            onChangeSort(stateMapping[sort]);
          }
        }}
      >
        {children}
        {' '}
        <Icon
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
      aria-sort={isSortable ? sort : props['aria-sort']}
    >
      {children}
    </th>
  );
}
