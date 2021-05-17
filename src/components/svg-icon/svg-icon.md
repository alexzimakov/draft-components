```jsx padded
import { SvgIcon } from './svg-icon';
import * as icons from '../../icons';

const styles = {
  list: {
    display: 'grid',
    rowGap: 32,
    gridTemplateColumns: 'repeat(5, 1fr)',
    padding: 0,
    listStyle: 'none',
  },
  item: {
    textAlign: 'center',
  },
  name: {
    display: 'inline-block',
    paddingTop: 12,
    color: 'var(--dc-secondary-text-color)',
    fontSize: 12,
    fontFamily: 'var(--dc-font-code)',
  },
};

<ol style={styles.list}>
  {Object.entries(icons).map(([key, icon]) => (
    <li key={key} style={styles.item}>
      <SvgIcon size="xl" icon={icon} />
      <br />
      <code style={styles.name}>{key}</code>
    </li>
  ))}
</ol>;
```

Sizes

```jsx padded
import { SvgIcon } from './svg-icon';
import { heartFill } from '../../icons/heart-fill';

const icon = heartFill;

<>
  <SvgIcon size="xs" icon={icon} />
  <SvgIcon size="sm" icon={icon} />
  <SvgIcon size="md" icon={icon} />
  <SvgIcon size="lg" icon={icon} />
  <SvgIcon size="xl" icon={icon} />
  <SvgIcon size="2x" icon={icon} />
  <SvgIcon size="3x" icon={icon} />
  <SvgIcon size="4x" icon={icon} />
  <SvgIcon size="5x" icon={icon} />
</>;
```

Linear Gradient

```jsx padded
import { SvgIcon } from './svg-icon';
import { treeFill } from '../../icons/tree-fill';

const props = {
  icon: treeFill,
  linearGradient: ['to bottom', '#c0eb75', '#4ca054'],
};

<>
  <SvgIcon size="xs" {...props} />
  <SvgIcon size="sm" {...props} />
  <SvgIcon size="md" {...props} />
  <SvgIcon size="lg" {...props} />
  <SvgIcon size="xl" {...props} />
  <SvgIcon size="2x" {...props} />
  <SvgIcon size="3x" {...props} />
  <SvgIcon size="4x" {...props} />
  <SvgIcon size="5x" {...props} />
</>;
```
