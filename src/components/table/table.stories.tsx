import { type Meta, type StoryFn } from '@storybook/react';
import { type TableHeadCellSort } from './table-head-cell.js';
import { Table } from './table.js';
import { useState, type CSSProperties } from 'react';

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
    isSortable: true,
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
    isSortable: true,
  },
] as const;
const data = [
  {
    browser: 'Chrome',
    sessions: 9562,
    percentage: 0.6881,
    newUsers: 7895,
    avgDuration: 67,
  },
  {
    browser: 'Firefox',
    sessions: 2403,
    percentage: 0.1729,
    newUsers: 2046,
    avgDuration: 59,
  },
  {
    browser: 'Safari',
    sessions: 1089,
    percentage: 0.0263,
    newUsers: 904,
    avgDuration: 59,
  },
  {
    browser: 'Internet Explorer',
    sessions: 366,
    percentage: 0.0263,
    newUsers: 333,
    avgDuration: 61,
  },
  {
    browser: 'Safari (in-app)',
    sessions: 162,
    percentage: 0.0117,
    newUsers: 112,
    avgDuration: 58,
  },
  {
    browser: 'Opera',
    sessions: 103,
    percentage: 0.0074,
    newUsers: 87,
    avgDuration: 82,
  },
  {
    browser: 'Edge',
    sessions: 98,
    percentage: 0.0071,
    newUsers: 69,
    avgDuration: 78,
  },
  {
    browser: 'Other',
    sessions: 275,
    percentage: 0.0602,
    newUsers: 90,
    avgDuration: null,
  },
];

export const Basic: StoryFn<typeof Table> = (args) => {
  const numberFormatter = new Intl.NumberFormat();
  const percentageFormatter = new Intl.NumberFormat(undefined, { style: 'percent', maximumFractionDigits: 2 });
  const durationFormatter = new DurationFormatter();

  let totalSessions = 0;
  let totalPercentage = 0;
  let totalNewUsers = 0;
  let totalAvgDuration = 0;
  const rows = data.map((item, index) => {
    totalSessions += item.sessions;
    totalPercentage += item.percentage;
    totalNewUsers += item.newUsers;
    totalAvgDuration += item.avgDuration || 0;
    return (
      <Table.Row key={`row-${index}`}>
        <Table.Cell>
          {item.browser}
        </Table.Cell>
        <Table.Cell align="right">
          {numberFormatter.format(item.sessions)}
        </Table.Cell>
        <Table.Cell align="right">
          {percentageFormatter.format(item.percentage)}
        </Table.Cell>
        <Table.Cell align="right">
          {numberFormatter.format(item.newUsers)}
        </Table.Cell>
        <Table.Cell align="right">
          {item.avgDuration != null ? durationFormatter.format(item.avgDuration) : 'N/A'}
        </Table.Cell>
      </Table.Row>
    );
  });

  const containerStyle: CSSProperties = {};
  if (args.stickyHeader || args.stickyFooter) {
    containerStyle.height = 256;
  }

  return (
    <Table.Container style={containerStyle}>
      <Table {...args}>
        <Table.Head>
          <Table.Row>
            {headers.map((header) => (
              <Table.HeadCell key={header.column} align={header.align}>
                {header.label}
              </Table.HeadCell>
            ))}
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {rows}
        </Table.Body>
        <Table.Footer>
          <Table.Row>
            <Table.HeadCell>
              Total
            </Table.HeadCell>
            <Table.HeadCell align="right">
              {numberFormatter.format(totalSessions / rows.length)}
            </Table.HeadCell>
            <Table.HeadCell align="right">
              {percentageFormatter.format(totalPercentage / rows.length)}
            </Table.HeadCell>
            <Table.HeadCell align="right">
              {numberFormatter.format(totalNewUsers / rows.length)}
            </Table.HeadCell>
            <Table.HeadCell align="right">
              {durationFormatter.format(totalAvgDuration / rows.length)}
            </Table.HeadCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    </Table.Container>
  );
};
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

export const Sticky = Basic.bind({});
Sticky.args = {
  ...Basic.args,
  stickyHeader: true,
  stickyFooter: true,
};

export const Sortable: StoryFn<typeof Table> = (args) => {
  type Column = typeof headers[number]['column'];
  type SortingState = {
    column: Column;
    sort: TableHeadCellSort;
  };

  const numberFormatter = new Intl.NumberFormat();
  const percentageFormatter = new Intl.NumberFormat(undefined, { style: 'percent', maximumFractionDigits: 2 });
  const durationFormatter = new DurationFormatter();
  const [sorting, setSorting] = useState<SortingState>({
    column: 'browser',
    sort: 'ascending',
  });

  const sortedData = [...data];
  sortedData.sort((firstRow, secondRow) => {
    if (sorting.sort === 'none') {
      return 0;
    }

    const a = firstRow[sorting.column];
    const b = secondRow[sorting.column];
    if (typeof a === 'string') {
      const strB = String(b || '');
      return sorting.sort === 'ascending'
        ? a.localeCompare(strB)
        : strB.localeCompare(a);
    } else if (typeof a === 'number') {
      const numB = Number(b || 0);
      return sorting.sort === 'ascending'
        ? a - numB
        : numB - a;
    }
    return 0;
  });

  let totalSessions = 0;
  let totalPercentage = 0;
  let totalNewUsers = 0;
  let totalAvgDuration = 0;
  const rows = sortedData.map((item, index) => {
    totalSessions += item.sessions;
    totalPercentage += item.percentage;
    totalNewUsers += item.newUsers;
    totalAvgDuration += item.avgDuration || 0;
    return (
      <Table.Row key={`row-${index}`}>
        <Table.Cell>
          {item.browser}
        </Table.Cell>
        <Table.Cell align="right">
          {numberFormatter.format(item.sessions)}
        </Table.Cell>
        <Table.Cell align="right">
          {percentageFormatter.format(item.percentage)}
        </Table.Cell>
        <Table.Cell align="right">
          {numberFormatter.format(item.newUsers)}
        </Table.Cell>
        <Table.Cell align="right">
          {item.avgDuration != null ? durationFormatter.format(item.avgDuration) : 'N/A'}
        </Table.Cell>
      </Table.Row>
    );
  });

  const containerStyle: CSSProperties = {};
  if (args.stickyHeader || args.stickyFooter) {
    containerStyle.height = 256;
  }

  return (
    <Table.Container>
      <Table {...args}>
        <Table.Head>
          <Table.Row>
            {headers.map((header) => {
              const column = header.column;
              return (
                <Table.HeadCell
                  key={column}
                  align={header.align}
                  isSortable={header.isSortable}
                  sort={sorting.column === column ? sorting.sort : 'none'}
                  onChangeSort={(sort) => setSorting({ sort, column })}
                >
                  {header.label}
                </Table.HeadCell>
              );
            })}
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {rows}
        </Table.Body>
        <Table.Footer>
          <Table.Row>
            <Table.HeadCell>
              Total
            </Table.HeadCell>
            <Table.HeadCell align="right">
              {numberFormatter.format(totalSessions / rows.length)}
            </Table.HeadCell>
            <Table.HeadCell align="right">
              {percentageFormatter.format(totalPercentage / rows.length)}
            </Table.HeadCell>
            <Table.HeadCell align="right">
              {numberFormatter.format(totalNewUsers / rows.length)}
            </Table.HeadCell>
            <Table.HeadCell align="right">
              {durationFormatter.format(totalAvgDuration / rows.length)}
            </Table.HeadCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    </Table.Container>
  );
};

class DurationFormatter {
  format(durationInSeconds: number): string {
    const minutes = Math.floor(durationInSeconds / 60);
    const seconds = Math.floor(durationInSeconds % 60);
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }
}
