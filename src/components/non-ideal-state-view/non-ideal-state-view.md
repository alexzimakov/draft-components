```jsx
import { NonIdealStateView } from '../non-ideal-state-view';
import { SvgIcon } from '../svg-icon';
import { search } from '../../icons/search';
import { SearchField } from '../search-field';

<NonIdealStateView
  icon={<SvgIcon icon={search} size="5x" />}
  heading="No search results"
  description="Your search didn't match any files. Try searching for something else."
  actions={<SearchField placeholder="Search" />}
/>;
```
