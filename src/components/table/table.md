```jsx
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableHeaderCell,
  TableRow,
} from '../table';

const headers = [
  { id: 'browser', label: 'Browser' },
  { id: 'sessions', label: 'Sessions', align: 'right' },
  { id: 'percentage', label: 'Percentage', align: 'right' },
  { id: 'newUsers', label: 'New Users', align: 'right' },
  { id: 'avgDuration', label: 'Avg. Duration', align: 'right' },
];
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
];

<TableContainer>
  <Table>
    <TableHead>
      <TableRow>
        {headers.map((header) => (
          <TableHeaderCell key={header.id} align={header.align}>
            {header.label}
          </TableHeaderCell>
        ))}
      </TableRow>
    </TableHead>
    <TableBody>
      {rows.map((row, index) => (
        <TableRow key={index}>
          {headers.map((header) => (
            <TableCell key={header.id} align={header.align}>
              {row[header.id]}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>;
```

Bordered

```jsx
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableHeaderCell,
  TableRow,
} from '../table';

const headers = [
  { id: 'browser', label: 'Browser' },
  { id: 'sessions', label: 'Sessions', align: 'right' },
  { id: 'percentage', label: 'Percentage', align: 'right' },
  { id: 'newUsers', label: 'New Users', align: 'right' },
  { id: 'avgDuration', label: 'Avg. Duration', align: 'right' },
];
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
];

<TableContainer>
  <Table isBordered={true}>
    <TableHead>
      <TableRow>
        {headers.map((header) => (
          <TableHeaderCell key={header.id} align={header.align}>
            {header.label}
          </TableHeaderCell>
        ))}
      </TableRow>
    </TableHead>
    <TableBody>
      {rows.map((row, index) => (
        <TableRow key={index}>
          {headers.map((header) => (
            <TableCell key={header.id} align={header.align}>
              {row[header.id]}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>;
```

Striped

```jsx
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableHeaderCell,
  TableRow,
} from '../table';

const headers = [
  { id: 'browser', label: 'Browser' },
  { id: 'sessions', label: 'Sessions', align: 'right' },
  { id: 'percentage', label: 'Percentage', align: 'right' },
  { id: 'newUsers', label: 'New Users', align: 'right' },
  { id: 'avgDuration', label: 'Avg. Duration', align: 'right' },
];
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
];

<TableContainer>
  <Table isStriped={true}>
    <TableHead>
      <TableRow>
        {headers.map((header) => (
          <TableHeaderCell key={header.id} align={header.align}>
            {header.label}
          </TableHeaderCell>
        ))}
      </TableRow>
    </TableHead>
    <TableBody>
      {rows.map((row, index) => (
        <TableRow key={index}>
          {headers.map((header) => (
            <TableCell key={header.id} align={header.align}>
              {row[header.id]}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>;
```

With sticky header

> _It only works when for table container defined height!_

```jsx
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableHeaderCell,
  TableRow,
} from '../table';

const headers = [
  { id: 'browser', label: 'Browser' },
  { id: 'sessions', label: 'Sessions', align: 'right' },
  { id: 'percentage', label: 'Percentage', align: 'right' },
  { id: 'newUsers', label: 'New Users', align: 'right' },
  { id: 'avgDuration', label: 'Avg. Duration', align: 'right' },
];
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

<TableContainer style={{ width: '100%', height: 272 }}>
  <Table hasStickyHeader={true} isBordered={true}>
    <TableHead>
      <TableRow>
        {headers.map((header) => (
          <TableHeaderCell key={header.id} align={header.align}>
            {header.label}
          </TableHeaderCell>
        ))}
      </TableRow>
    </TableHead>
    <TableBody>
      {rows.map((row, index) => (
        <TableRow key={index}>
          {headers.map((header) => (
            <TableCell key={header.id} align={header.align}>
              {row[header.id]}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>;
```

Selectable

```jsx
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableHeaderCell,
  TableRow,
} from '../table';
import { Checkbox } from '../checkbox';

const [selectedRows, setSelectedRows] = React.useState(new Set());
const headers = [
  { id: 'browser', label: 'Browser' },
  { id: 'sessions', label: 'Sessions', align: 'right' },
  { id: 'percentage', label: 'Percentage', align: 'right' },
  { id: 'newUsers', label: 'New Users', align: 'right' },
  { id: 'avgDuration', label: 'Avg. Duration', align: 'right' },
];
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
];
const styles = {
  firstCell: { width: 18 },
};

<TableContainer>
  <Table>
    <TableHead>
      <TableRow>
        <TableHeaderCell style={styles.firstCell}>
          <Checkbox
            checked={selectedRows.size > 0}
            isMixed={selectedRows.size < rows.length}
            onChange={() => {
              const newSelectedRows = new Set(selectedRows);
              if (selectedRows.size === 0) {
                rows.forEach((row) => newSelectedRows.add(row.browser));
              } else {
                newSelectedRows.clear();
              }
              setSelectedRows(newSelectedRows);
            }}
          />
        </TableHeaderCell>
        {headers.map((header) => (
          <TableHeaderCell key={header.id} align={header.align}>
            {header.label}
          </TableHeaderCell>
        ))}
      </TableRow>
    </TableHead>
    <TableBody>
      {rows.map((row, index) => {
        const isSelected = selectedRows.has(row.browser);
        return (
          <TableRow key={index} isSelected={isSelected}>
            <TableCell style={styles.firstCell}>
              <Checkbox
                checked={isSelected}
                onChange={() => {
                  const newSelectedRows = new Set(selectedRows);
                  if (selectedRows.has(row.browser)) {
                    newSelectedRows.delete(row.browser);
                  } else {
                    newSelectedRows.add(row.browser);
                  }
                  setSelectedRows(newSelectedRows);
                }}
              />
            </TableCell>
            {headers.map((header) => (
              <TableCell key={header.id} align={header.align}>
                {row[header.id]}
              </TableCell>
            ))}
          </TableRow>
        );
      })}
    </TableBody>
  </Table>
</TableContainer>;
```

Loading

```jsx
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableHeaderCell,
  TableRow,
} from '../table';

const headers = [
  { id: 'browser', label: 'Browser' },
  { id: 'sessions', label: 'Sessions', align: 'right' },
  { id: 'percentage', label: 'Percentage', align: 'right' },
  { id: 'newUsers', label: 'New Users', align: 'right' },
  { id: 'avgDuration', label: 'Avg. Duration', align: 'right' },
];
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
];

<TableContainer>
  <Table isLoading={true}>
    <TableHead>
      <TableRow>
        {headers.map((header) => (
          <TableHeaderCell key={header.id} align={header.align}>
            {header.label}
          </TableHeaderCell>
        ))}
      </TableRow>
    </TableHead>
    <TableBody>
      {rows.map((row, index) => (
        <TableRow key={index}>
          {headers.map((header) => (
            <TableCell key={header.id} align={header.align}>
              {row[header.id]}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>;
```

Sortable

```jsx
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableHeaderCell,
  TableRow,
} from '../table';

const headers = [
  { id: 'browser', label: 'Browser' },
  { id: 'sessions', label: 'Sessions', align: 'right', isSortable: true },
  { id: 'percentage', label: 'Percentage', align: 'right' },
  { id: 'newUsers', label: 'New Users', align: 'right', isSortable: true },
  { id: 'avgDuration', label: 'Avg. Duration', align: 'right' },
];
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
const [sorting, setSorting] = React.useState({
  column: headers[1].id,
  order: 'asc',
});
const getSortedRows = () => {
  const rowsCopy = [...rows];
  rowsCopy.sort((a, b) => {
    if (sorting.order === 'asc') {
      return a[sorting.column] - b[sorting.column];
    }
    if (sorting.order === 'desc') {
      return b[sorting.column] - a[sorting.column];
    }
    return 0;
  });
  return rowsCopy;
};

<TableContainer>
  <Table shouldHighlightActiveRow={true}>
    <TableHead>
      <TableRow>
        {headers.map((header) => (
          <TableHeaderCell
            key={header.id}
            align={header.align}
            isSortable={header.isSortable}
            order={sorting.column === header.id ? sorting.order : 'none'}
            onChangeOrder={(order) => setSorting({ column: header.id, order })}
          >
            {header.label}
          </TableHeaderCell>
        ))}
      </TableRow>
    </TableHead>
    <TableBody>
      {getSortedRows().map((row, index) => (
        <TableRow key={index}>
          {headers.map((header) => (
            <TableCell key={header.id} align={header.align}>
              {row[header.id]}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>;
```

`lg` cell padding

```jsx
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableHeaderCell,
  TableRow,
} from '../table';

const headers = [
  { id: 'browser', label: 'Browser' },
  { id: 'sessions', label: 'Sessions', align: 'right' },
  { id: 'percentage', label: 'Percentage', align: 'right' },
  { id: 'newUsers', label: 'New Users', align: 'right' },
  { id: 'avgDuration', label: 'Avg. Duration', align: 'right' },
];
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

<TableContainer>
  <Table shouldHighlightActiveRow={true} cellPadding="lg">
    <TableHead>
      <TableRow>
        {headers.map((header) => (
          <TableHeaderCell key={header.id} align={header.align}>
            {header.label}
          </TableHeaderCell>
        ))}
      </TableRow>
    </TableHead>
    <TableBody>
      {rows.map((row, index) => (
        <TableRow key={index}>
          {headers.map((header) => (
            <TableCell key={header.id} align={header.align}>
              {row[header.id]}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>;
```

`sm` cell padding

```jsx
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableHeaderCell,
  TableRow,
} from '../table';

const headers = [
  { id: 'browser', label: 'Browser' },
  { id: 'sessions', label: 'Sessions', align: 'right' },
  { id: 'percentage', label: 'Percentage', align: 'right' },
  { id: 'newUsers', label: 'New Users', align: 'right' },
  { id: 'avgDuration', label: 'Avg. Duration', align: 'right' },
];
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

<TableContainer>
  <Table shouldHighlightActiveRow={true} cellPadding="sm">
    <TableHead>
      <TableRow>
        {headers.map((header) => (
          <TableHeaderCell key={header.id} align={header.align}>
            {header.label}
          </TableHeaderCell>
        ))}
      </TableRow>
    </TableHead>
    <TableBody>
      {rows.map((row, index) => (
        <TableRow key={index}>
          {headers.map((header) => (
            <TableCell key={header.id} align={header.align}>
              {row[header.id]}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>;
```
