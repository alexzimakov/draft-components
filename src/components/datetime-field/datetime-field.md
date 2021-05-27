```jsx
import { DatetimeField, DateComponents } from '../datetime-field';

const [value, setValue] = React.useState(new DateComponents());

<DatetimeField value={value} onChangeValue={setValue} />;
```

Type `date`

```jsx
import { DatetimeField, DateComponents } from '../datetime-field';

const [value, setValue] = React.useState(new DateComponents());

<DatetimeField type="date" value={value} onChangeValue={setValue} />;
```

Type `time`

```jsx
import { DatetimeField, DateComponents } from '../datetime-field';

const [value, setValue] = React.useState(new DateComponents());

<DatetimeField type="time" value={value} onChangeValue={setValue} />;
```

Different sizes

```jsx padded
import { DatetimeField, DateComponents } from '../datetime-field';

const [value, setValue] = React.useState(new DateComponents());

<>
  <DatetimeField size="sm" value={value} onChangeValue={setValue} />
  <DatetimeField size="md" value={value} onChangeValue={setValue} />
  <DatetimeField size="lg" value={value} onChangeValue={setValue} />
</>;
```

Different states

```jsx padded
import { DatetimeField, DateComponents } from '../datetime-field';

const [value, setValue] = React.useState(
  DateComponents.makeFormDatetimeISO('2021-05-26 17:37')
);

<>
  <DatetimeField disabled={true} value={value} onChangeValue={setValue} />
  <DatetimeField readOnly={true} value={value} onChangeValue={setValue} />
  <DatetimeField invalid={true} value={value} onChangeValue={setValue} />
</>;
```
