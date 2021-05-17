```jsx
import { ActionsGroup } from './actions-group';
import { SvgIcon } from '../svg-icon';
import { heart } from '../../icons/heart';
import { bookmark } from '../../icons/bookmark';
import { trash } from '../../icons/trash';

<ActionsGroup>
  <ActionsGroup.Button title="Like" icon={<SvgIcon size="lg" icon={heart} />} />
  <ActionsGroup.Button
    title="Save"
    icon={<SvgIcon size="lg" icon={bookmark} />}
  />
  <ActionsGroup.Button
    title="Delete"
    icon={<SvgIcon size="lg" icon={trash} />}
  />
</ActionsGroup>;
```
