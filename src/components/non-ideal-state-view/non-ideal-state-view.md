```jsx
import { NonIdealStateView } from '../non-ideal-state-view';
import { SvgIcon } from '../svg-icon';
import { search } from '../../bootstrap-icons/search';
import { people } from '../../bootstrap-icons/people';
import { SearchInput } from '../search-input';

<NonIdealStateView
  icon={<SvgIcon icon={people} size="3x" />}
  heading="No users found"
  description="Your search didn't match any users. Try to change the search query."
  actions={<SearchInput placeholder="Search" />}
/>;
```
