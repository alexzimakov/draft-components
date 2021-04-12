```jsx padded
import { SvgIcon } from './svg-icon';
import * as icons from '../svg-icon/icons';

const props = { size: 'lg' };

<>
  {Object.entries(icons).map(([key, icon]) => (
    <SvgIcon {...props} key={key} icon={icon} />
  ))}
</>;
```

Linear Gradient:

```jsx padded
import { SvgIcon } from './svg-icon';
import * as icons from '../svg-icon/icons';

const props = {
  size: 'lg',
  linearGradient: ['to bottom', '#60a5fa', '#2563eb'],
};

<>
  {Object.entries(icons).map(([key, icon]) => (
    <SvgIcon {...props} key={key} icon={icon} />
  ))}
</>;
```

Sizes:

```jsx padded
import { SvgIcon } from './svg-icon';
import * as icons from './icons';

<>
  <SvgIcon size="xs" icon={icons.like} />
  <SvgIcon size="sm" icon={icons.like} />
  <SvgIcon size="base" icon={icons.like} />
  <SvgIcon size="lg" icon={icons.like} />
  <SvgIcon size="xl" icon={icons.like} />
  <SvgIcon size="2x" icon={icons.like} />
  <SvgIcon size="3x" icon={icons.like} />
  <SvgIcon size="4x" icon={icons.like} />
  <SvgIcon size="5x" icon={icons.like} />
</>;
```
