```jsx
import { ActionsGroup } from './actions-group';
import { SvgIcon } from '../svg-icon';
import * as icons from '../svg-icon/icons';

<ActionsGroup>
  <ActionsGroup.Button title="Like" icon={<SvgIcon icon={icons.like} />} />
  <ActionsGroup.Button title="Save" icon={<SvgIcon icon={icons.bookmark} />} />
  <ActionsGroup.Button title="Delete" icon={<SvgIcon icon={icons.trash} />} />
</ActionsGroup>;
```
