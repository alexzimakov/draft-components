```jsx padded
import { SvgIcon } from './svg-icon';

<>
  <SvgIcon size="lg" icon="delete" />
  <SvgIcon size="lg" icon="minus" />
  <SvgIcon size="lg" icon="search" />
  <SvgIcon size="lg" icon="error" />
  <SvgIcon size="lg" icon="warning" />
  <SvgIcon size="lg" icon="info" />
  <SvgIcon size="lg" icon="success" />
  <SvgIcon size="lg" icon="like" />
  <SvgIcon size="lg" icon="bookmark" />
  <SvgIcon size="lg" icon="trash" />
  <SvgIcon size="lg" icon="trash-alt" />
  <SvgIcon size="lg" icon="ul-list" />
  <SvgIcon size="lg" icon="ol-list" />
  <SvgIcon size="lg" icon="pencil" />
  <SvgIcon size="lg" icon="edit" />
  <SvgIcon size="lg" icon="copy" />
  <SvgIcon size="lg" icon="eye" />
  <SvgIcon size="lg" icon="eye-close" />
  <SvgIcon size="lg" icon="facebook-circle" />
</>;
```

Linear Gradient:

```jsx padded
import { SvgIcon } from './svg-icon';

const props = {
  size: 'lg',
  linearGradient: ['to bottom', '#60a5fa', '#2563eb'],
};

<>
  <SvgIcon {...props} icon="delete" />
  <SvgIcon {...props} icon="minus" />
  <SvgIcon {...props} icon="search" />
  <SvgIcon {...props} icon="error" />
  <SvgIcon {...props} icon="warning" />
  <SvgIcon {...props} icon="info" />
  <SvgIcon {...props} icon="success" />
  <SvgIcon {...props} icon="like" />
  <SvgIcon {...props} icon="bookmark" />
  <SvgIcon {...props} icon="trash" />
  <SvgIcon {...props} icon="trash-alt" />
  <SvgIcon {...props} icon="ul-list" />
  <SvgIcon {...props} icon="ol-list" />
  <SvgIcon {...props} icon="pencil" />
  <SvgIcon {...props} icon="edit" />
  <SvgIcon {...props} icon="copy" />
  <SvgIcon {...props} icon="eye" />
  <SvgIcon {...props} icon="eye-close" />
  <SvgIcon {...props} icon="facebook-circle" />
</>;
```

Sizes:

```jsx padded
import { SvgIcon } from './svg-icon';

<>
  <SvgIcon size="xs" icon="info" />
  <SvgIcon size="sm" icon="info" />
  <SvgIcon size="base" icon="info" />
  <SvgIcon size="lg" icon="info" />
  <SvgIcon size="xl" icon="info" />
  <SvgIcon size="2x" icon="info" />
  <SvgIcon size="3x" icon="info" />
  <SvgIcon size="4x" icon="info" />
  <SvgIcon size="5x" icon="info" />
</>;
```
