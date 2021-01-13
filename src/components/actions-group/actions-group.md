```jsx
import { ActionsGroup } from './actions-group';
import { SvgIcon } from '../svg-icon';
import { likeIcon, bookmarkIcon, trashIcon } from '../svg-icon/icons';

<ActionsGroup>
  <ActionsGroup.Button title="Like" icon={<SvgIcon icon={likeIcon} />} />
  <ActionsGroup.Button title="Save" icon={<SvgIcon icon={bookmarkIcon} />} />
  <ActionsGroup.Button title="Delete" icon={<SvgIcon icon={trashIcon} />} />
</ActionsGroup>;
```
