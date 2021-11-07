```jsx
import { Tooltip } from '../tooltip';
import { Button } from '../button';
import { SvgIcon } from '../svg-icon';
import { bookmark } from '../../bootstrap-icons/bookmark';

<Tooltip content="Save to favorite">
  <Button
    noPadding={true}
    leadingIcon={<SvgIcon size="lg" icon={bookmark} />}
  />
</Tooltip>;
```

Wide content

```jsx
import { Tooltip } from '../tooltip';
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
