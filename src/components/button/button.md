Default

```jsx padded
import { Button } from './button';

const getProps = (size) => ({
  size,
  appearance: 'default',
  children: 'Button text',
});

<>
  <Button {...getProps('xs')} />
  <Button {...getProps('sm')} />
  <Button {...getProps('md')} />
  <Button {...getProps('lg')} />
</>;
```

Primary button

```jsx padded
import { Button } from './button';

const getProps = (size) => ({
  size,
  appearance: 'primary',
  children: 'Button text',
});

<>
  <Button {...getProps('xs')} />
  <Button {...getProps('sm')} />
  <Button {...getProps('md')} />
  <Button {...getProps('lg')} />
</>;
```

Secondary button

```jsx padded
import { Button } from './button';

const getProps = (size) => ({
  size,
  appearance: 'secondary',
  children: 'Button text',
});

<>
  <Button {...getProps('xs')} />
  <Button {...getProps('sm')} />
  <Button {...getProps('md')} />
  <Button {...getProps('lg')} />
</>;
```

Danger button

```jsx padded
import { Button } from './button';

const getProps = (size) => ({
  size,
  appearance: 'danger',
  children: 'Button text',
});

<>
  <Button {...getProps('xs')} />
  <Button {...getProps('sm')} />
  <Button {...getProps('md')} />
  <Button {...getProps('lg')} />
</>;
```

Success button

```jsx padded
import { Button } from './button';

const getProps = (size) => ({
  size,
  appearance: 'success',
  children: 'Button text',
});

<>
  <Button {...getProps('xs')} />
  <Button {...getProps('sm')} />
  <Button {...getProps('md')} />
  <Button {...getProps('lg')} />
</>;
```

Minimal button

```jsx padded
import { Button } from './button';

const getProps = (size) => ({
  size,
  appearance: 'minimal',
  children: 'Button text',
});

<>
  <Button {...getProps('xs')} />
  <Button {...getProps('sm')} />
  <Button {...getProps('md')} />
  <Button {...getProps('lg')} />
</>;
```

With leading icon

```jsx padded
import { Button } from './button';
import { SvgIcon } from '../svg-icon';
import { bookmark } from '../svg-icon/icons';

const getProps = (size) => ({
  size,
  children: 'Button text',
  leadingIcon: <SvgIcon size="lg" icon={bookmark} />,
});

<>
  <Button {...getProps('xs')} />
  <Button {...getProps('sm')} />
  <Button {...getProps('md')} />
  <Button {...getProps('lg')} />
</>;
```

With trailing icon

```jsx padded
import { Button } from './button';
import { SvgIcon } from '../svg-icon';
import { like } from '../svg-icon/icons';

const icon = <SvgIcon icon={like} />;
const getProps = (size) => ({
  size,
  children: 'Button text',
  trailingIcon: <SvgIcon size="lg" icon={like} />,
});

<>
  <Button {...getProps('xs')} />
  <Button {...getProps('sm')} />
  <Button {...getProps('md')} />
  <Button {...getProps('lg')} />
</>;
```

Icon button

```jsx padded
import { Button } from './button';
import { SvgIcon } from '../svg-icon';
import { remove } from '../svg-icon/icons';

const getProps = (size) => ({
  size,
  noPadding: true,
  appearance: 'secondary',
  leadingIcon: <SvgIcon size="xl" icon={remove} />,
});

<>
  <Button {...getProps('xs')} />
  <Button {...getProps('sm')} />
  <Button {...getProps('md')} />
  <Button {...getProps('lg')} />
</>;
```

Full width

```jsx
import { Button } from './button';

<Button fullWidth={true} size="lg" appearance="primary">
  Button text
</Button>;
```

Loading state

```jsx padded
import { Button } from './button';

const getProps = (size) => ({
  size,
  isLoading: true,
  children: 'Button text',
});

<>
  <Button {...getProps('xs')} />
  <Button {...getProps('sm')} />
  <Button {...getProps('md')} />
  <Button {...getProps('lg')} />
</>;
```

Disabled state

```jsx padded
import { Button } from './button';

const getProps = (appearance) => ({
  appearance,
  disabled: true,
  children: 'Button text',
});

<>
  <Button {...getProps('default')} />
  <Button {...getProps('primary')} />
  <Button {...getProps('secondary')} />
  <Button {...getProps('danger')} />
  <Button {...getProps('success')} />
  <Button {...getProps('minimal')} />
</>;
```
