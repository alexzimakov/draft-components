```jsx
import { Switch } from '../switch';

<Switch />;
```

With a label

```jsx
import { Switch } from '../switch';

<Switch label="Enable Location Services" />;
```

With the label and description

```jsx
import { Switch } from '../switch';

<Switch
  label="Enable Location Services"
  description="Allow selected apps to determine your location."
/>;
```

Disabled state

```jsx
import { Switch } from '../switch';

<Switch
  label="Enable Location Services"
  description="Allow selected apps to determine your location."
  disabled={true}
/>;
```
