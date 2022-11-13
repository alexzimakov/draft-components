import userEvent from '@testing-library/user-event';
import { render, screen, within } from '@testing-library/react';
import { TableContainer } from './table-container';
import { Table } from './table';
import { TableHead } from './table-head';
import { TableBody } from './table-body';
import { TableRow } from './table-row';
import { TableHeaderCell } from './table-header-cell';
import { TableCell } from './table-cell';

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
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell>{headers[0]}</TableHeaderCell>
            <TableHeaderCell>{headers[1]}</TableHeaderCell>
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
    </TableContainer>
  );

  const tableContainer = screen.getByRole('group');
  const table = within(tableContainer).getByRole('table');
  expect(within(table).getAllByRole('rowgroup')).toHaveLength(2);
  expect(within(table).getAllByRole('row')).toHaveLength(expectedRowCount);
  expect(within(table).getAllByRole('columnheader')).toHaveLength(
    expectedHeaderCellCount
  );
  expect(within(table).getAllByRole('cell')).toHaveLength(
    expectedDataCellCount
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
  const onChangeIdOrder = jest.fn();
  const onChangePersonOrder = jest.fn();
  const onChangeAgeOrder = jest.fn();
  render(
    <Table>
      <TableHead>
        <TableRow>
          <TableHeaderCell isSortable={true} onChangeOrder={onChangeIdOrder}>
            ID
          </TableHeaderCell>
          <TableHeaderCell
            isSortable={true}
            order="asc"
            onChangeOrder={onChangePersonOrder}
          >
            Person
          </TableHeaderCell>
          <TableHeaderCell
            isSortable={true}
            order="desc"
            onChangeOrder={onChangeAgeOrder}
          >
            Age
          </TableHeaderCell>
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
          <TableCell>Dennis</TableCell>
          <TableCell>45</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );

  const [idHeaderCell, personHeaderCell, ageHeaderCell] = (
    screen.getAllByRole('columnheader')
  );
  expect(idHeaderCell).toHaveAttribute('aria-sort', 'none');
  expect(personHeaderCell).toHaveAttribute('aria-sort', 'ascending');
  expect(ageHeaderCell).toHaveAttribute('aria-sort', 'descending');

  await user.click(within(idHeaderCell).getByRole('button'));
  expect(onChangeIdOrder).toHaveBeenCalledTimes(1);
  expect(onChangeIdOrder).toHaveBeenCalledWith('asc');

  await user.click(within(personHeaderCell).getByRole('button'));
  expect(onChangePersonOrder).toHaveBeenCalledTimes(1);
  expect(onChangePersonOrder).toHaveBeenCalledWith('desc');

  await user.click(within(ageHeaderCell).getByRole('button'));
  expect(onChangeAgeOrder).toHaveBeenCalledTimes(1);
  expect(onChangeAgeOrder).toHaveBeenCalledWith('none');
});
