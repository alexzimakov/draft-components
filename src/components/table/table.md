```jsx
import {Table} from '../table';

const headers = [
  {id: 'browser', label: 'Browser'},
  {id: 'sessions', label: 'Sessions', align: 'right'},
  {id: 'percentage', label: 'Percentage', align: 'right'},
  {id: 'newUsers', label: 'New Users', align: 'right'},
  {id: 'avgDuration', label: 'Avg. Duration', align: 'right'},
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

<Table.Container>
  <Table>
    <Table.Head>
      <Table.Row>
        {headers.map((header) => (
          <Table.HeaderCell key={header.id} align={header.align}>
            {header.label}
          </Table.HeaderCell>
        ))}
      </Table.Row>
    </Table.Head>
    <Table.Body>
      {rows.map((row, index) => (
        <Table.Row key={index}>
          {headers.map((header) => (
            <Table.Cell key={header.id} align={header.align}>
              {row[header.id]}
            </Table.Cell>
          ))}
        </Table.Row>
      ))}
    </Table.Body>
  </Table>
</Table.Container>;
```

Bordered

```jsx
import {Table} from '../table';

const headers = [
  {id: 'browser', label: 'Browser'},
  {id: 'sessions', label: 'Sessions', align: 'right'},
  {id: 'percentage', label: 'Percentage', align: 'right'},
  {id: 'newUsers', label: 'New Users', align: 'right'},
  {id: 'avgDuration', label: 'Avg. Duration', align: 'right'},
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

<Table.Container>
  <Table isBordered={true}>
    <Table.Head>
      <Table.Row>
        {headers.map((header) => (
          <Table.HeaderCell key={header.id} align={header.align}>
            {header.label}
          </Table.HeaderCell>
        ))}
      </Table.Row>
    </Table.Head>
    <Table.Body>
      {rows.map((row, index) => (
        <Table.Row key={index}>
          {headers.map((header) => (
            <Table.Cell key={header.id} align={header.align}>
              {row[header.id]}
            </Table.Cell>
          ))}
        </Table.Row>
      ))}
    </Table.Body>
  </Table>
</Table.Container>;
```

Striped

```jsx
import {Table} from '../table';

const headers = [
  {id: 'browser', label: 'Browser'},
  {id: 'sessions', label: 'Sessions', align: 'right'},
  {id: 'percentage', label: 'Percentage', align: 'right'},
  {id: 'newUsers', label: 'New Users', align: 'right'},
  {id: 'avgDuration', label: 'Avg. Duration', align: 'right'},
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

<Table.Container>
  <Table isStriped={true}>
    <Table.Head>
      <Table.Row>
        {headers.map((header) => (
          <Table.HeaderCell key={header.id} align={header.align}>
            {header.label}
          </Table.HeaderCell>
        ))}
      </Table.Row>
    </Table.Head>
    <Table.Body>
      {rows.map((row, index) => (
        <Table.Row key={index}>
          {headers.map((header) => (
            <Table.Cell key={header.id} align={header.align}>
              {row[header.id]}
            </Table.Cell>
          ))}
        </Table.Row>
      ))}
    </Table.Body>
  </Table>
</Table.Container>;
```

With sticky header

> _It only works when for table container defined height!_

```jsx
import {Table} from '../table';

const headers = [
  {id: 'browser', label: 'Browser'},
  {id: 'sessions', label: 'Sessions', align: 'right'},
  {id: 'percentage', label: 'Percentage', align: 'right'},
  {id: 'newUsers', label: 'New Users', align: 'right'},
  {id: 'avgDuration', label: 'Avg. Duration', align: 'right'},
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

<Table.Container style={{width: '100%', height: 272}}>
  <Table hasStickyHeader={true} isBordered={true}>
    <Table.Head>
      <Table.Row>
        {headers.map((header) => (
          <Table.HeaderCell key={header.id} align={header.align}>
            {header.label}
          </Table.HeaderCell>
        ))}
      </Table.Row>
    </Table.Head>
    <Table.Body>
      {rows.map((row, index) => (
        <Table.Row key={index}>
          {headers.map((header) => (
            <Table.Cell key={header.id} align={header.align}>
              {row[header.id]}
            </Table.Cell>
          ))}
        </Table.Row>
      ))}
    </Table.Body>
  </Table>
</Table.Container>;
```

Selectable

```jsx
import {Table} from '../table';
import {Checkbox} from '../checkbox';

const [selectedRows, setSelectedRows] = React.useState(new Set());
const headers = [
  {id: 'browser', label: 'Browser'},
  {id: 'sessions', label: 'Sessions', align: 'right'},
  {id: 'percentage', label: 'Percentage', align: 'right'},
  {id: 'newUsers', label: 'New Users', align: 'right'},
  {id: 'avgDuration', label: 'Avg. Duration', align: 'right'},
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
  firstCell: {width: 18},
};

<Table.Container>
  <Table>
    <Table.Head>
      <Table.Row>
        <Table.HeaderCell style={styles.firstCell}>
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
        </Table.HeaderCell>
        {headers.map((header) => (
          <Table.HeaderCell key={header.id} align={header.align}>
            {header.label}
          </Table.HeaderCell>
        ))}
      </Table.Row>
    </Table.Head>
    <Table.Body>
      {rows.map((row, index) => {
        const isSelected = selectedRows.has(row.browser);
        return (
          <Table.Row key={index} isSelected={isSelected}>
            <Table.Cell style={styles.firstCell}>
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
            </Table.Cell>
            {headers.map((header) => (
              <Table.Cell key={header.id} align={header.align}>
                {row[header.id]}
              </Table.Cell>
            ))}
          </Table.Row>
        );
      })}
    </Table.Body>
  </Table>
</Table.Container>;
```

Loading

```jsx
import {Table} from '../table';

const headers = [
  {id: 'browser', label: 'Browser'},
  {id: 'sessions', label: 'Sessions', align: 'right'},
  {id: 'percentage', label: 'Percentage', align: 'right'},
  {id: 'newUsers', label: 'New Users', align: 'right'},
  {id: 'avgDuration', label: 'Avg. Duration', align: 'right'},
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

<Table.Container>
  <Table isLoading={true}>
    <Table.Head>
      <Table.Row>
        {headers.map((header) => (
          <Table.HeaderCell key={header.id} align={header.align}>
            {header.label}
          </Table.HeaderCell>
        ))}
      </Table.Row>
    </Table.Head>
    <Table.Body>
      {rows.map((row, index) => (
        <Table.Row key={index}>
          {headers.map((header) => (
            <Table.Cell key={header.id} align={header.align}>
              {row[header.id]}
            </Table.Cell>
          ))}
        </Table.Row>
      ))}
    </Table.Body>
  </Table>
</Table.Container>;
```

Sortable

```jsx
import {Table} from '../table';

const headers = [
  {id: 'browser', label: 'Browser'},
  {id: 'sessions', label: 'Sessions', align: 'right', isSortable: true},
  {id: 'percentage', label: 'Percentage', align: 'right'},
  {id: 'newUsers', label: 'New Users', align: 'right', isSortable: true},
  {id: 'avgDuration', label: 'Avg. Duration', align: 'right'},
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

<Table.Container>
  <Table shouldHighlightActiveRow={true}>
    <Table.Head>
      <Table.Row>
        {headers.map((header) => (
          <Table.HeaderCell
            key={header.id}
            align={header.align}
            isSortable={header.isSortable}
            order={sorting.column === header.id ? sorting.order : 'none'}
            onSort={(order) => setSorting({column: header.id, order})}
          >
            {header.label}
          </Table.HeaderCell>
        ))}
      </Table.Row>
    </Table.Head>
    <Table.Body>
      {getSortedRows().map((row, index) => (
        <Table.Row key={index}>
          {headers.map((header) => (
            <Table.Cell key={header.id} align={header.align}>
              {row[header.id]}
            </Table.Cell>
          ))}
        </Table.Row>
      ))}
    </Table.Body>
  </Table>
</Table.Container>;
```

Dense padding

```jsx
import {Table} from '../table';

const headers = [
  {id: 'browser', label: 'Browser'},
  {id: 'sessions', label: 'Sessions', align: 'right'},
  {id: 'percentage', label: 'Percentage', align: 'right'},
  {id: 'newUsers', label: 'New Users', align: 'right'},
  {id: 'avgDuration', label: 'Avg. Duration', align: 'right'},
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

<Table.Container>
  <Table shouldHighlightActiveRow={true} densePadding={true}>
    <Table.Head>
      <Table.Row>
        {headers.map((header) => (
          <Table.HeaderCell key={header.id} align={header.align}>
            {header.label}
          </Table.HeaderCell>
        ))}
      </Table.Row>
    </Table.Head>
    <Table.Body>
      {rows.map((row, index) => (
        <Table.Row key={index}>
          {headers.map((header) => (
            <Table.Cell key={header.id} align={header.align}>
              {row[header.id]}
            </Table.Cell>
          ))}
        </Table.Row>
      ))}
    </Table.Body>
  </Table>
</Table.Container>;
```
