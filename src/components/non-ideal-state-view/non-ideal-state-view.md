```jsx
import { NonIdealStateView } from './non-ideal-state-view';
import { SvgIcon } from '../svg-icon';
import { searchIcon } from '../svg-icon/icons';
import { SearchField } from '../search-field';

<NonIdealStateView
  icon={<SvgIcon icon={searchIcon} size="5x" />}
  title="No search results"
  description="Your search didn't match any files. Try searching for something else."
  actions={<SearchField placeholder="Search" />}
/>;
```
