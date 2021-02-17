```jsx padded
import { IconButton } from './icon-button';

<>
  <IconButton size="xs" icon="remove" />
  <IconButton size="sm" icon="remove" />
  <IconButton icon="remove" />
  <IconButton size="lg" icon="remove" />
</>;
```

Rounded:

```jsx padded
import { IconButton } from './icon-button';

<>
  <IconButton size="xs" isRounded={true} icon="minus" appearance="danger" />
  <IconButton size="sm" isRounded={true} icon="minus" appearance="danger" />
  <IconButton isRounded={true} icon="minus" appearance="danger" />
  <IconButton size="lg" isRounded={true} icon="minus" appearance="danger" />
</>;
```

With the custom icon:

```jsx padded
import { IconButton } from './icon-button';
import { SvgIcon } from '../svg-icon';
import * as icons from '../svg-icon/icons';

const icon = <SvgIcon size="sm" icon={icons.like} />;

<>
  <IconButton size="xs" icon={icon} appearance="default" />
  <IconButton size="sm" icon={icon} appearance="default" />
  <IconButton icon={icon} appearance="default" />
  <IconButton size="lg" icon={icon} appearance="default" />
</>;
```
