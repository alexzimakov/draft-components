```jsx
import { useState } from 'react';
import { DateRangePicker } from '../date-picker';

const [value, setValue] = useState({ start: '2021-10-05', end: '2021-10-21' });

<DateRangePicker value={value} onChangeValue={setValue} />;
```
