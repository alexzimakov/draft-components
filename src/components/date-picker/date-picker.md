```jsx
import { useState } from 'react';
import { DatePicker } from '../date-picker';

const [date, setDate] = useState('2021-10-21');

<DatePicker date={date} onChangeDate={setDate} />;
```

Date range picker

```jsx
import { useState } from 'react';
import { DateRangePicker } from '../date-picker';

const [range, setRange] = useState({
  startDate: '2021-10-05',
  endDate: '2021-10-21',
});

<DateRangePicker range={range} onChangeRange={setRange} />;
```
