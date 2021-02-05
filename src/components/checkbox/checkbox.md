```jsx
import { Checkbox } from './checkbox';

<Checkbox />;
```

Mixed:

```jsx
import { Checkbox } from './checkbox';

<Checkbox isMixed={true} />;
```

With a label:

```jsx
import { Checkbox } from './checkbox';

<Checkbox label="Enable Location Services" />;
```

With the label and description:

```jsx
import { Checkbox } from './checkbox';

<Checkbox
  label="Enable Location Services"
  description="Allow selected apps to determine your location."
/>;
```

Disabled state:

```jsx
import { Checkbox } from './checkbox';

<Checkbox
  label="Enable Location Services"
  description="Allow selected apps to determine your location."
  disabled={true}
/>;
```
