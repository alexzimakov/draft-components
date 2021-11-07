```jsx padded
import { TextInput } from './';

<>
  <TextInput size="sm" placeholder="Small text field..." />
  <TextInput placeholder="Default text field..." />
  <TextInput size="lg" placeholder="Large text field..." />
</>;
```

With leading add-on

```jsx padded
import { TextInput } from './';
import { SvgIcon } from '../svg-icon';
import { search } from '../../bootstrap-icons/search';

const icon = <SvgIcon size={16} icon={search} />;

<>
  <TextInput leadingAddOn="https://" placeholder="www.example.com" />
  <TextInput leadingAddOn={icon} placeholder="Search by name" />
</>;
```

With trailing add-on

```jsx padded
import { TextInput } from './';
import { SvgIcon } from '../svg-icon';
import { exclamationCircle } from '../../bootstrap-icons/exclamation-circle';

const icon = <SvgIcon size={16} icon={exclamationCircle} />;

<>
  <TextInput trailingAddOn=".com" placeholder="https://www.example" />
  <TextInput trailingAddOn={icon} placeholder="Enter valid address" />
</>;
```

Invalid state

```jsx
import { TextInput } from './';

<TextInput invalid={true} placeholder="Invalid text field..." />;
```

Disabled state

```jsx padded
import { TextInput } from './';

<>
  <TextInput
    leadingAddOn="https://"
    defaultValue="www.example.com"
    disabled={true}
  />
  <TextInput disabled={true} placeholder="Disabled text field..." />
</>;
```

Full width

```jsx
import { TextInput } from './';

<TextInput size="lg" fullWidth={true} placeholder="Search or enter address" />;
```
