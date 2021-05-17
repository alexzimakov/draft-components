```jsx padded
import { Tag } from './tag';

<>
  <Tag size="sm">Tag</Tag>
  <Tag size="md">Tag</Tag>
  <Tag size="lg">Tag</Tag>
</>;
```

Rounded

```jsx padded
import { Tag } from './tag';

<>
  <Tag size="sm" isRounded={true}>
    Tag
  </Tag>
  <Tag size="md" isRounded={true}>
    Tag
  </Tag>
  <Tag size="lg" isRounded={true}>
    Tag
  </Tag>
</>;
```

With leading add-on

```jsx padded
import { Tag } from './tag';
import { SvgIcon } from '../svg-icon';
import { tagFill } from '../../icons/tag-fill';

const icon = <SvgIcon icon={tagFill} />;

<>
  <Tag size="sm" leadingIcon={icon}>
    Like
  </Tag>
  <Tag size="md" leadingIcon={icon}>
    Like
  </Tag>
  <Tag size="lg" leadingIcon={icon}>
    Like
  </Tag>
</>;
```

Removable

```jsx padded
import { Tag } from './tag';

const getProps = (size, isRounded) => ({
  size,
  isRounded,
  isRemovable: true,
  removeButtonAriaLabel: 'Remove tag',
  onRemove: () => alert('Tag removed!'),
  children: 'Tag',
});

<>
  <Tag {...getProps('sm', false)} />
  <Tag {...getProps('sm', true)} />

  <Tag {...getProps('md', false)} />
  <Tag {...getProps('md', true)} />

  <Tag {...getProps('lg', false)} />
  <Tag {...getProps('lg', true)} />
</>;
```

Different colors

```jsx padded
import { Tag } from './tag';

<>
  <Tag fillColor="gray">Gray</Tag>
  <Tag fillColor="blue">Blue</Tag>
  <Tag fillColor="cyan">Cyan</Tag>
  <Tag fillColor="red">Red</Tag>
  <Tag fillColor="green">Green</Tag>
  <Tag fillColor="lime">Lime</Tag>
  <Tag fillColor="indigo">Indigo</Tag>
  <Tag fillColor="yellow">Yellow</Tag>
  <Tag fillColor="orange">Orange</Tag>
</>;
```
