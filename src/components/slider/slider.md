```jsx
import { Slider } from '../slider';

const [value, setValue] = React.useState(50);

<Slider value={value} onChangeValue={setValue} />;
```

With tick marks

```jsx
import { Slider } from '../slider';

const min = 0;
const max = 10;
const step = 1;
const [value, setValue] = React.useState(max / 2);

<Slider
  min={min}
  max={max}
  step={step}
  thumbStyle="rect"
  tickMarksCount={max + 1}
  value={value}
  onChangeValue={setValue}
/>;
```

Disabled state

```jsx
import { Slider } from '../slider';

const [value, setValue] = React.useState(50);

<Slider disabled={true} value={value} onChangeValue={setValue} />;
```
