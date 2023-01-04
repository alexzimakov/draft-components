import {
  forwardRef,
  type ComponentPropsWithRef,
  type ComponentPropsWithoutRef,
  type ElementType,
} from 'react';
import { classNames } from '../../shared/react-helpers';
import { ArrowSmallDown, ArrowSmallUp, ArrowsUpDown } from './icons';

type TableHeadCellBaseProps = ComponentPropsWithRef<'th'>;
export type TableHeadCellSort = 'none' | 'ascending' | 'descending'
export type TableHeadCellProps = {
  isSortable?: boolean;
  sort?: TableHeadCellSort;
  onChangeSort?: (sort: TableHeadCellSort) => void;
} & TableHeadCellBaseProps;

export const TableHeadCell = forwardRef<
  HTMLTableHeaderCellElement,
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

const iconMapping: Record<
  TableHeadCellSort,
  ElementType<ComponentPropsWithoutRef<'svg'>>
> = {
  none: ArrowsUpDown,
  ascending: ArrowSmallUp,
  descending: ArrowSmallDown,
};

const stateMapping: Record<
  TableHeadCellSort,
  TableHeadCellSort
> = {
  none: 'ascending',
  ascending: 'descending',
  descending: 'none',
};
