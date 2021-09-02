```jsx
import { NumberField } from './number-field';

const [value, setValue] = React.useState('10');

<NumberField value={value} onChangeValue={setValue} min={0} max={100} />;
```

With add-ons

```jsx padded
import { NumberField } from './number-field';
import { SvgIcon } from '../svg-icon';
import { currencyExchange } from '../../icons/currency-exchange';

const [usd, setUsd] = React.useState('');
const [exchangeRate, setExchangeRate] = React.useState('');

<>
  <NumberField
    leadingAddOn={<SvgIcon size="lg" icon={currencyExchange} />}
    value={usd}
    onChangeValue={setUsd}
  />
  <NumberField
    trailingAddOn="USD"
    value={exchangeRate}
    onChangeValue={setExchangeRate}
  />
</>;
```

Sizes

```jsx padded
import { NumberField } from './number-field';
import { SvgIcon } from '../svg-icon';
import { currencyExchange } from '../../icons/currency-exchange';

const [first, setFirst] = React.useState('');
const [second, setSecond] = React.useState('');
const [third, setThird] = React.useState('');

<>
  <NumberField size="sm" value={first} onChangeValue={setFirst} />
  <NumberField size="md" value={second} onChangeValue={setSecond} />
  <NumberField size="lg" value={third} onChangeValue={setThird} />
</>;
```

Full width

```jsx
import { NumberField } from './number-field';

const [value, setValue] = React.useState('');

<NumberField value={value} onChangeValue={setValue} fullWidth={true} />;
```

Disabled state

```jsx
import { NumberField } from './number-field';

const [value, setValue] = React.useState('');

<NumberField disabled={true} value={value} onChangeValue={setValue} />;
```

```jsx
<input type="number" max="10" step="7" />
```
