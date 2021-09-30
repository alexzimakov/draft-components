```jsx
import { DatetimeInput, DateComponents } from './';

const [value, setValue] = React.useState(new DateComponents());

<DatetimeInput value={value} onChangeValue={setValue} />;
```

Type `date`

```jsx
import { DatetimeInput, DateComponents } from './';

const [value, setValue] = React.useState(new DateComponents());

<DatetimeInput type="date" value={value} onChangeValue={setValue} />;
```

Type `time`

```jsx
import { DatetimeInput, DateComponents } from './';

const [value, setValue] = React.useState(new DateComponents());

<DatetimeInput type="time" value={value} onChangeValue={setValue} />;
```

Different sizes

```jsx padded
import { DatetimeInput, DateComponents } from './';

const [value, setValue] = React.useState(new DateComponents());

<>
  <DatetimeInput size="sm" value={value} onChangeValue={setValue} />
  <DatetimeInput size="md" value={value} onChangeValue={setValue} />
  <DatetimeInput size="lg" value={value} onChangeValue={setValue} />
</>;
```

Different states

```jsx padded
import { DatetimeInput, DateComponents } from './';

const [value, setValue] = React.useState(
  DateComponents.makeFormDatetimeISO('2021-05-26 17:37')
);

<>
  <DatetimeInput disabled={true} value={value} onChangeValue={setValue} />
  <DatetimeInput readOnly={true} value={value} onChangeValue={setValue} />
  <DatetimeInput invalid={true} value={value} onChangeValue={setValue} />
</>;
```
