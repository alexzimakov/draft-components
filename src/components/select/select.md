```jsx padded
import { Select } from './select';

const options = (
  <>
    <option>Choose a browser</option>
    <option>Chrome</option>
    <option>Firefox</option>
    <option>Internet Explorer</option>
    <option>Opera</option>
    <option>Safari</option>
    <option>Microsoft Edge</option>
  </>
);

<>
  <Select size="sm">{options}</Select>
  <Select>{options}</Select>
  <Select size="lg">{options}</Select>
</>;
```

Multiselect:

```jsx
import { Select } from './select';

<Select multiple={true}>
  <option>Chrome</option>
  <option>Firefox</option>
  <option>Internet Explorer</option>
  <option>Opera</option>
  <option>Safari</option>
  <option>Microsoft Edge</option>
</Select>;
```

Invalid state:

```jsx
import { Select } from './select';

<Select isInvalid={true}>
  <option>Choose a browser</option>
  <option>Chrome</option>
  <option>Firefox</option>
  <option>Internet Explorer</option>
  <option>Opera</option>
  <option>Safari</option>
  <option>Microsoft Edge</option>
</Select>;
```

Disabled state:

```jsx
import { Select } from './select';

<Select disabled={true}>
  <option>Choose a browser</option>
  <option>Chrome</option>
  <option>Firefox</option>
  <option>Internet Explorer</option>
  <option>Opera</option>
  <option>Safari</option>
  <option>Microsoft Edge</option>
</Select>;
```

Full width:

```jsx
import { Select } from './select';

<Select hasFullWidth={true}>
  <option>Choose a browser</option>
  <option>Chrome</option>
  <option>Firefox</option>
  <option>Internet Explorer</option>
  <option>Opera</option>
  <option>Safari</option>
  <option>Microsoft Edge</option>
</Select>;
```
