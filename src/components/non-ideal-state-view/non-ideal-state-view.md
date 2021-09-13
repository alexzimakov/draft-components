```jsx
import { NonIdealStateView } from '../non-ideal-state-view';
import { SvgIcon } from '../svg-icon';
import { search } from '../../icons/search';
import { people } from '../../icons/people';
import { SearchField } from '../search-field';

<NonIdealStateView
  icon={<SvgIcon icon={people} size="3x" />}
  heading="No users found"
  description="Your search didn't match any users. Try to change the search query."
  actions={<SearchField placeholder="Search" />}
/>;
```
