import { expect, it, vi } from 'vitest';
import { Table } from './table.js';
import { TableHead } from './table-head.js';
import { TableBody } from './table-body.js';
import { TableRow } from './table-row.js';
import { TableHeadCell } from './table-head-cell.js';
import { TableCell } from './table-cell.js';
import { TableContainer } from './table-container.js';
import { render, screen, userEvent, within } from '../../test/test-utils.js';

it('renders without errors', () => {
  const headers = ['Person', 'Age'];
  const rows = [
    ['Chris', 38],
    ['Dennis', 45],
  ];
  const expectedRowCount = rows.length + 1;
  const expectedHeaderCellCount = headers.length;
  const expectedDataCellCount = rows.length * headers.length;
  render(
    <TableContainer border={{ top: true, bottom: true }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeadCell>{headers[0]}</TableHeadCell>
            <TableHeadCell>{headers[1]}</TableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>{rows[0][0]}</TableCell>
            <TableCell>{rows[0][1]}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>{rows[1][0]}</TableCell>
            <TableCell>{rows[1][1]}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>,
  );

  const table = screen.getByRole('table');
  expect(within(table).getAllByRole('rowgroup')).toHaveLength(2);
  expect(within(table).getAllByRole('row')).toHaveLength(expectedRowCount);
  expect(within(table).getAllByRole('columnheader')).toHaveLength(
    expectedHeaderCellCount,
  );
  expect(within(table).getAllByRole('cell')).toHaveLength(
    expectedDataCellCount,
  );

  for (const header of headers) {
    screen.getByText(header);
  }

  for (const row of rows) {
    for (const cell of row) {
      screen.getByText(cell);
    }
  }
});

it('renders with sortable header cells', async () => {
  const user = userEvent.setup();
  const onChangeSort = vi.fn();
  render(
    <TableContainer border="all">
      <Table>
        <TableHead>
          <TableRow>
            <TableHeadCell
              isSortable={true}
              sort="none"
              onChangeSort={onChangeSort}
            >
              ID
            </TableHeadCell>
            <TableHeadCell
              isSortable={true}
              sort="ascending"
              onChangeSort={onChangeSort}
            >
              Person
            </TableHeadCell>
            <TableHeadCell
              isSortable={true}
              sort="descending"
              onChangeSort={onChangeSort}
            >
              Age
            </TableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>1</TableCell>
            <TableCell>Chris</TableCell>
            <TableCell>38</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>1</TableCell>
            <TableCell>John</TableCell>
            <TableCell>45</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>,
  );

  const [
    idColumn,
    personColumn,
    ageColumn,
  ] = screen.getAllByRole('columnheader');
  expect(idColumn).toHaveAttribute('aria-sort', 'none');
  expect(personColumn).toHaveAttribute('aria-sort', 'ascending');
  expect(ageColumn).toHaveAttribute('aria-sort', 'descending');

  await user.click(within(idColumn).getByRole('button'));
  await user.click(within(personColumn).getByRole('button'));
  await user.click(within(ageColumn).getByRole('button'));
  expect(onChangeSort).toHaveBeenCalledTimes(3);
  expect(onChangeSort).toHaveBeenNthCalledWith(1, 'ascending');
  expect(onChangeSort).toHaveBeenNthCalledWith(2, 'descending');
  expect(onChangeSort).toHaveBeenNthCalledWith(3, 'none');
});
