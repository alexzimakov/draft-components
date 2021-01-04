```jsx padded
import { Badge } from './badge';

<>
  <Badge size="sm">Badge</Badge>
  <Badge>Badge</Badge>
  <Badge size="lg">Badge</Badge>
</>;
```

Rounded:

```jsx padded
import { Badge } from './badge';

<>
  <Badge size="sm" isRounded={true}>
    Badge
  </Badge>
  <Badge isRounded={true}>Badge</Badge>
  <Badge size="lg" isRounded={true}>
    Badge
  </Badge>
</>;
```

Removable:

```jsx padded
import { Badge } from './badge';

const onRemove = () => alert('Removing badge...');

<>
  <Badge size="sm" isRemovable={true} isRounded={true} onRemove={onRemove}>
    Badge
  </Badge>
  <Badge size="sm" isRemovable={true} onRemove={onRemove}>
    Badge
  </Badge>

  <Badge isRemovable={true} isRounded={true} onRemove={onRemove}>
    Badge
  </Badge>
  <Badge isRemovable={true} onRemove={onRemove}>
    Badge
  </Badge>

  <Badge size="lg" isRemovable={true} isRounded={true} onRemove={onRemove}>
    Badge
  </Badge>
  <Badge size="lg" isRemovable={true} onRemove={onRemove}>
    Badge
  </Badge>
</>;
```

Colored:

```jsx padded
import { Badge } from './badge';

<>
  <Badge>Gray</Badge>
  <Badge color="blue">Blue</Badge>
  <Badge color="cyan">Cyan</Badge>
  <Badge color="red">Red</Badge>
  <Badge color="green">Green</Badge>
  <Badge color="lime">Lime</Badge>
  <Badge color="indigo">Indigo</Badge>
  <Badge color="yellow">Yellow</Badge>
  <Badge color="orange">Orange</Badge>
</>;
```
