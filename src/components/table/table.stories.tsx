import { type Meta, type StoryFn } from '@storybook/react';
import { TableContainer } from './table-container';
import { Table } from './table';
import { TableHead } from './table-head';
import { TableBody } from './table-body';
import { TableRow } from './table-row';
import { TableHeadCell, TableHeadCellSort } from './table-head-cell';
import { TableCell } from './table-cell';
import { useState } from 'react';

const meta: Meta<typeof Table> = {
  title: 'Data Display/Table',
  component: Table,
};
export default meta;

const headers = [
  {
    column: 'browser',
    label: 'Browser',
    align: 'left',
    isSortable: true,
  },
  {
    column: 'sessions',
    label: 'Sessions',
    align: 'right',
    isSortable: true,
  },
  {
    column: 'percentage',
    label: 'Percentage',
    align: 'right',
    isSortable: false,
  },
  {
    column: 'newUsers',
    label: 'New Users',
    align: 'right',
    isSortable: true,
  },
  {
    column: 'avgDuration',
    label: 'Avg. Duration',
    align: 'right',
    isSortable: false,
  },
] as const;
const rows = [
  {
    browser: 'Chrome',
    sessions: 9562,
    percentage: '68.81%',
    newUsers: 7895,
    avgDuration: '01:07',
  },
  {
    browser: 'Firefox',
    sessions: 2403,
    percentage: '17.29%',
    newUsers: 2046,
    avgDuration: '00:59',
  },
  {
    browser: 'Safari',
    sessions: 1089,
    percentage: '2.63%',
    newUsers: 904,
    avgDuration: '00:59',
  },
  {
    browser: 'Internet Explorer',
    sessions: 366,
    percentage: '2.63%',
    newUsers: 333,
    avgDuration: '01:01',
  },
  {
    browser: 'Safari (in-app)',
    sessions: 162,
    percentage: '1.17%',
    newUsers: 112,
    avgDuration: '00:58',
  },
  {
    browser: 'Opera',
    sessions: 103,
    percentage: '0.74%',
    newUsers: 87,
    avgDuration: '01:22',
  },
  {
    browser: 'Edge',
    sessions: 98,
    percentage: '0.71%',
    newUsers: 69,
    avgDuration: '01:18',
  },
  {
    browser: 'Other',
    sessions: 275,
    percentage: '6.02%',
    newUsers: 90,
    avgDuration: 'N/A',
  },
];

export const Basic: StoryFn<typeof Table> = (args) => (
  <TableContainer border={{ top: true, bottom: true }}>
    <Table {...args}>
      <TableHead>
        <TableRow>
          {headers.map((header) => (
            <TableHeadCell key={header.column} align={header.align}>
              {header.label}
            </TableHeadCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row, index) => (
          <TableRow key={index}>
            {headers.map((header) => (
              <TableCell key={header.column} align={header.align}>
                {row[header.column]}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);
Basic.args = {
  cellSize: 'md',
};

export const Stripped = Basic.bind({});
Stripped.args = {
  ...Basic.args,
  isStriped: true,
};

export const Bordered = Basic.bind({});
Bordered.args = {
  ...Basic.args,
  isBordered: true,
};

export const Sortable: StoryFn<typeof Table> = (args) => {
  type Column = typeof headers[number]['column'];
  type SortingState = {
    column: Column,
    sort: TableHeadCellSort,
  };
  const [sorting, setSorting] = useState<SortingState>({
    column: 'browser',
    sort: 'ascending',
  });

  const sortedRows = [...rows];
  sortedRows.sort((firstRow, secondRow) => {
    if (sorting.sort === 'none') {
      return 0;
    }

    const a = firstRow[sorting.column];
    const b = secondRow[sorting.column];
    if (typeof a === 'string' && typeof b === 'string') {
      return sorting.sort === 'ascending'
        ? a.localeCompare(b)
        : b.localeCompare(a);
    } else if (typeof a === 'number' && typeof b === 'number') {
      return sorting.sort === 'ascending'
        ? a - b
        : b - a;
    }
    return 0;
  });

  return (
    <TableContainer border={{ top: true, bottom: true }}>
      <Table {...args}>
        <TableHead>
          <TableRow>
            {headers.map((header) => {
              const column = header.column;
              return (
                <TableHeadCell
                  key={column}
                  align={header.align}
                  isSortable={header.isSortable}
                  sort={sorting.column === column ? sorting.sort : 'none'}
                  onChangeSort={(sort) => setSorting({ sort, column })}
                >
                  {header.label}
                </TableHeadCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedRows.map((row, index) => (
            <TableRow key={index}>
              {headers.map((header) => (
                <TableCell key={header.column} align={header.align}>
                  {row[header.column]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
