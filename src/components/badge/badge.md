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
import {Badge} from './badge';

<>
  <Badge>Gray</Badge>
  <Badge fillColor="blue">Blue</Badge>
  <Badge fillColor="cyan">Cyan</Badge>
  <Badge fillColor="red">Red</Badge>
  <Badge fillColor="green">Green</Badge>
  <Badge fillColor="lime">Lime</Badge>
  <Badge fillColor="indigo">Indigo</Badge>
  <Badge fillColor="yellow">Yellow</Badge>
  <Badge fillColor="orange">Orange</Badge>
</>;
```
