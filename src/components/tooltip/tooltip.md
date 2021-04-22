```jsx
import { Tooltip } from './tooltip';
import { IconButton } from '../icon-button';
import { SvgIcon, Icons } from '../svg-icon';

<Tooltip content="Save to favorite">
  <IconButton
    size="md"
    appearance="default"
    icon={<SvgIcon size="sm" icon={Icons.like} />}
  />
</Tooltip>;
```

Wide content:

```jsx
import { Tooltip } from './tooltip';
import { Button } from '../button';

const content =
  'Lorem ipsum dolor sit amet, consectetur adipisicing elit. ' +
  'Dolore eos impedit iusto molestiae possimus quaerat, sint sunt ullam unde. ' +
  'Corporis culpa cum incidunt odit praesentium quia sunt voluptatibus ' +
  'voluptatum. Velit.';

<Tooltip content="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore eos impedit iusto molestiae possimus quaerat, sint sunt ullam unde. Corporis culpa cum incidunt odit praesentium quia sunt voluptatibus voluptatum. Velit.">
  <Button>Hover over me</Button>
</Tooltip>;
```
