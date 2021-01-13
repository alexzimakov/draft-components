Default

```jsx padded
import { Button } from './button';

<>
  <Button size="xs">Button text</Button>
  <Button size="sm">Button text</Button>
  <Button>Button text</Button>
  <Button size="lg">Button text</Button>
</>;
```

Primary button

```jsx padded
import { Button } from './button';

<>
  <Button size="xs" appearance="primary">
    Button text
  </Button>
  <Button size="sm" appearance="primary">
    Button text
  </Button>
  <Button appearance="primary">Button text</Button>
  <Button size="lg" appearance="primary">
    Button text
  </Button>
</>;
```

Danger button

```jsx padded
import { Button } from './button';

<>
  <Button size="xs" appearance="danger">
    Button text
  </Button>
  <Button size="sm" appearance="danger">
    Button text
  </Button>
  <Button appearance="danger">Button text</Button>
  <Button size="lg" appearance="danger">
    Button text
  </Button>
</>;
```

Success button

```jsx padded
import { Button } from './button';

<>
  <Button size="xs" appearance="success">
    Button text
  </Button>
  <Button size="sm" appearance="success">
    Button text
  </Button>
  <Button appearance="success">Button text</Button>
  <Button size="lg" appearance="success">
    Button text
  </Button>
</>;
```

Minimal button

```jsx padded
import { Button } from './button';

<>
  <Button size="xs" appearance="minimal">
    Button text
  </Button>
  <Button size="sm" appearance="minimal">
    Button text
  </Button>
  <Button appearance="minimal">Button text</Button>
  <Button size="lg" appearance="minimal">
    Button text
  </Button>
</>;
```

With leading icon

```jsx padded
import { Button } from './button';
import { SvgIcon } from '../svg-icon';
import { bookmarkIcon } from '../svg-icon/icons';

const icon = <SvgIcon icon={bookmarkIcon} />;

<>
  <Button size="xs" leadingIcon={icon}>
    Button text
  </Button>
  <Button size="sm" leadingIcon={icon}>
    Button text
  </Button>
  <Button leadingIcon={icon}>Button text</Button>
  <Button size="lg" leadingIcon={icon}>
    Button text
  </Button>
</>;
```

With trailing icon

```jsx padded
import { Button } from './button';
import { SvgIcon } from '../svg-icon';
import { likeIcon } from '../svg-icon/icons';

const icon = <SvgIcon icon={likeIcon} />;

<>
  <Button size="xs" trailingIcon={icon}>
    Button text
  </Button>
  <Button size="sm" trailingIcon={icon}>
    Button text
  </Button>
  <Button trailingIcon={icon}>Button text</Button>
  <Button size="lg" trailingIcon={icon}>
    Button text
  </Button>
</>;
```

Full width

```jsx
import { Button } from './button';

<Button hasFullWidth={true} size="lg" appearance="primary">
  Button text
</Button>;
```

Loading state

```jsx padded
import { Button } from './button';

<>
  <Button size="xs" isLoading={true}>
    Button text
  </Button>
  <Button size="sm" isLoading={true}>
    Button text
  </Button>
  <Button isLoading={true}>Button text</Button>
  <Button size="lg" isLoading={true}>
    Button text
  </Button>
</>;
```

Disabled state

```jsx padded
import { Button } from './button';

<>
  <Button disabled={true}>Button text</Button>
  <Button disabled={true} appearance="primary">
    Button text
  </Button>
  <Button disabled={true} appearance="danger">
    Button text
  </Button>
  <Button disabled={true} appearance="success">
    Button text
  </Button>
  <Button disabled={true} appearance="minimal">
    Button text
  </Button>
</>;
```
