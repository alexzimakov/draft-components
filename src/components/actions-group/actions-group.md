```jsx
import { ActionsGroup } from './actions-group';
import { SvgIcon } from '../svg-icon';

<ActionsGroup>
  <ActionsGroup.Button title="Like" icon={<SvgIcon icon="like" />} />
  <ActionsGroup.Button title="Save" icon={<SvgIcon icon="bookmark" />} />
  <ActionsGroup.Button title="Delete" icon={<SvgIcon icon="trash-alt" />} />
</ActionsGroup>;
```
