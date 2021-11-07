Default

```jsx padded
import { Button } from '../button';

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
import { Button } from '../button';

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
import { Button } from '../button';

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
import { Button } from '../button';

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
import { Button } from '../button';

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
import { Button } from '../button';

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
import { Button } from '../button';
import { SvgIcon } from '../svg-icon';
import { bookmark } from '../../bootstrap-icons/bookmark';

const getProps = (size) => ({
  size,
  children: 'Button text',
  leadingIcon: <SvgIcon icon={bookmark} />,
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
import { Button } from '../button';
import { SvgIcon } from '../svg-icon';
import { heart } from '../../bootstrap-icons/heart';

const getProps = (size) => ({
  size,
  children: 'Button text',
  trailingIcon: <SvgIcon icon={heart} />,
});

<>
  <Button {...getProps('xs')} />
  <Button {...getProps('sm')} />
  <Button {...getProps('md')} />
  <Button {...getProps('lg')} />
</>;
```

Rounded

```jsx padded
import { Button } from '../button';

const getProps = (appearance) => ({
  appearance,
  isRounded: true,
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

Icon button

```jsx padded
import { Button } from '../button';
import { SvgIcon } from '../svg-icon';
import { xLg } from '../../bootstrap-icons/x-lg';

const getProps = (size) => ({
  size,
  noPadding: true,
  appearance: 'secondary',
  leadingIcon: <SvgIcon icon={xLg} />,
});

<>
  <Button {...getProps('xs')} />
  <Button {...getProps('sm')} />
  <Button {...getProps('md')} />
  <Button {...getProps('lg')} />
</>;
```

Icon circle button

```jsx padded
import { Button } from '../button';
import { SvgIcon } from '../svg-icon';
import { plusLg } from '../../bootstrap-icons/plus-lg';

const getProps = (size) => ({
  size,
  isCircle: true,
  leadingIcon: <SvgIcon size="sm" icon={plusLg} />,
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
import { Button } from '../button';

<Button fullWidth={true} size="lg" appearance="primary">
  Button text
</Button>;
```

Loading state

```jsx padded
import { Button } from '../button';

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
import { Button } from '../button';

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
