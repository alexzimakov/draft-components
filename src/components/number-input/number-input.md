```jsx
import { NumberInput } from '../number-input';

const [value, setValue] = React.useState('10');

<NumberInput value={value} onChangeValue={setValue} min={0} max={100} />;
```

With add-ons

```jsx padded
import { NumberInput } from '../number-input';
import { SvgIcon } from '../svg-icon';
import { currencyExchange } from '../../bootstrap-icons/currency-exchange';

const [usd, setUsd] = React.useState('');
const [exchangeRate, setExchangeRate] = React.useState('');

<>
  <NumberInput
    leadingAddOn={<SvgIcon size="lg" icon={currencyExchange} />}
    value={usd}
    onChangeValue={setUsd}
  />
  <NumberInput
    trailingAddOn="USD"
    value={exchangeRate}
    onChangeValue={setExchangeRate}
  />
</>;
```

Without increment buttons

```jsx
import { NumberInput } from '../number-input';

const [value, setValue] = React.useState('10');

<NumberInput
  value={value}
  onChangeValue={setValue}
  trailingAddOn="%"
  min={0}
  max={100}
  showIncrementButtons={false}
/>;
```

Sizes

```jsx padded
import { NumberInput } from '../number-input';
import { SvgIcon } from '../svg-icon';
import { currencyExchange } from '../../bootstrap-icons/currency-exchange';

const [first, setFirst] = React.useState('');
const [second, setSecond] = React.useState('');
const [third, setThird] = React.useState('');

<>
  <NumberInput size="sm" value={first} onChangeValue={setFirst} />
  <NumberInput size="md" value={second} onChangeValue={setSecond} />
  <NumberInput size="lg" value={third} onChangeValue={setThird} />
</>;
```

Full width

```jsx
import { NumberInput } from '../number-input';

const [value, setValue] = React.useState('');

<NumberInput value={value} onChangeValue={setValue} fullWidth={true} />;
```

Disabled state

```jsx
import { NumberInput } from '../number-input';

const [value, setValue] = React.useState('');

<NumberInput disabled={true} value={value} onChangeValue={setValue} />;
```
