```jsx
import { useState } from 'react';
import { Slider } from '../slider';

const [value, setValue] = useState(30);

<Slider value={value} onChangeValue={setValue} />;
```

With tick marks

```jsx
import { useState } from 'react';
import { Slider } from '../slider';

const min = 0;
const max = 16;
const step = 1;
const [value, setValue] = useState(4);

const renderTickMarkLabel = (index) => {
  if (index === 0) {
    return '1 min';
  }
  if (index === 4) {
    return '15 min';
  }
  if (index === 9) {
    return '1 hr';
  }
  if (index === max - 4) {
    return '2 hrs';
  }
  if (index === max) {
    return 'Never';
  }
};

<Slider
  thumb="rect"
  numberOfTickMarks={max + 1}
  min={min}
  max={max}
  step={step}
  value={value}
  onChangeValue={setValue}
  renderTickMarkLabel={renderTickMarkLabel}
/>;
```

Disabled state

```jsx
import { useState } from 'react';
import { Slider } from '../slider';

const [value, setValue] = useState(50);

<Slider disabled={true} value={value} onChangeValue={setValue} />;
```
