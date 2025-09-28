import { type ComponentProps, type ReactNode } from 'react';

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

export function TableHeadCell({
  isSortable = false,
  sort = 'none',
  'aria-sort': ariaSort = sort,
  children,
  onChangeSort,
  ...props
}: TableHeadCellProps) {
  if (isSortable) {
    let icon: ReactNode;
    if (sort === 'ascending') {
      icon = <ChevronUpIcon />;
    } else if (sort === 'descending') {
      icon = <ChevronDownIcon />;
    } else {
      icon = <ChevronUpDownIcon />;
    }

    const handleClick = () => {
      if (typeof onChangeSort === 'function') {
        let nextSort: TableHeadCellSort;
        if (sort === 'ascending') {
          nextSort = 'descending';
        } else if (sort === 'descending') {
          nextSort = 'none';
        } else {
          nextSort = 'ascending';
        }
        onChangeSort(nextSort);
      }
    };

    children = (
      <button
        className="dc-table-cell__sort-btn"
        type="button"
        onClick={handleClick}
      >
        {children}
        {icon && (
          <span className="dc-table-cell__sort-btn-icon" aria-hidden={true}>
            {icon}
          </span>
        )}
      </button>
    );
  }

  return (
    <th
      {...props}
      aria-sort={ariaSort}
      data-sortable={isSortable}
    >
      {children}
    </th>
  );
}

function ChevronUpIcon({
  width = 20,
  height = 20,
  ...props
}: ComponentProps<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      width={width}
      height={height}
      fill="currentColor"
      {...props}
    >
      <path
        d="M9.47 6.47a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 1 1-1.06 1.06L10 8.06l-3.72 3.72a.75.75 0 0 1-1.06-1.06l4.25-4.25Z"
        clipRule="evenodd"
        fillRule="evenodd"
      />
    </svg>
  );
}

function ChevronDownIcon({
  width = 20,
  height = 20,
  ...props
}: ComponentProps<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      width={width}
      height={height}
      fill="currentColor"
      {...props}
    >
      <path
        d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
        clipRule="evenodd"
        fillRule="evenodd"
      />
    </svg>
  );
}

function ChevronUpDownIcon({
  width = 20,
  height = 20,
  ...props
}: ComponentProps<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      width={width}
      height={height}
      fill="currentColor"
      {...props}
    >
      <path
        d="M10.53 3.47a.75.75 0 0 0-1.06 0L6.22 6.72a.75.75 0 0 0 1.06 1.06L10 5.06l2.72 2.72a.75.75 0 1 0 1.06-1.06l-3.25-3.25Zm-4.31 9.81 3.25 3.25a.75.75 0 0 0 1.06 0l3.25-3.25a.75.75 0 1 0-1.06-1.06L10 14.94l-2.72-2.72a.75.75 0 0 0-1.06 1.06Z"
        clipRule="evenodd"
        fillRule="evenodd"
      />
    </svg>
  );
}
