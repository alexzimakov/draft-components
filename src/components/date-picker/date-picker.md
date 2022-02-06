```jsx
import { useState } from 'react';
import { DatePicker } from '../date-picker';

const [date, setDate] = useState('2021-10-21');

<DatePicker value={date} onChangeValue={setDate} />;
```

```jsx
import { useState } from 'react';
import { DatePicker } from '../date-picker';

const [date, setDate] = useState('2021-10-21');

<DatePicker
  min="2021-10-04"
  max="2021-10-26"
  value={date}
  onChangeValue={setDate}
/>;
```
