```jsx padded
import { TextField } from '../text-field';

<>
  <TextField size="sm" placeholder="Small text field..." />
  <TextField placeholder="Default text field..." />
  <TextField size="lg" placeholder="Large text field..." />
</>;
```

With leading add-on

```jsx padded
import { TextField } from '../text-field';
import { SvgIcon } from '../svg-icon';
import { search } from '../../icons/search';

const icon = <SvgIcon size={16} icon={search} />;

<>
  <TextField leadingAddOn="https://" placeholder="www.example.com" />
  <TextField leadingAddOn={icon} placeholder="Search by name" />
</>;
```

With trailing add-on

```jsx padded
import { TextField } from '../text-field';
import { SvgIcon } from '../svg-icon';
import { exclamationCircle } from '../../icons/exclamation-circle';

const icon = <SvgIcon size={16} icon={exclamationCircle} />;

<>
  <TextField trailingAddOn=".com" placeholder="https://www.example" />
  <TextField trailingAddOn={icon} placeholder="Enter valid address" />
</>;
```

Invalid state

```jsx
import { TextField } from '../text-field';

<TextField invalid={true} placeholder="Invalid text field..." />;
```

Disabled state

```jsx padded
import { TextField } from '../text-field';

<>
  <TextField
    leadingAddOn="https://"
    defaultValue="www.example.com"
    disabled={true}
  />
  <TextField disabled={true} placeholder="Disabled text field..." />
</>;
```

Full width

```jsx
import { TextField } from '../text-field';

<TextField size="lg" fullWidth={true} placeholder="Search or enter address" />;
```
