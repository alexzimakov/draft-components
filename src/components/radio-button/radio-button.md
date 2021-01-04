```jsx
import { RadioButton } from './radio-button';

<RadioButton />;
```

With a label:

```jsx
import { RadioButton } from './radio-button';

<RadioButton label="Public access" />;
```

With a label and description:

```jsx
import { RadioButton } from './radio-button';

<RadioButton
  label="Public access"
  description="The repository would be available to anyone"
/>;
```

Disabled state:

```jsx
import { RadioButton } from './radio-button';

<RadioButton
  label="Public access"
  description="The repository would be available to anyone"
  disabled={true}
/>;
```
