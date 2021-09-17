```jsx
import { SegmentedControl } from '../segmented-control';

const segments = [
  { id: 1, label: 'Newest' },
  { id: 2, label: 'Popular' },
  { id: 3, label: 'Top rated' },
];
const [activeKey, setActiveKey] = React.useState(segments[0].id);

<SegmentedControl
  size="md"
  items={segments}
  selectedValue={activeKey}
  onChangeSelectedValue={setActiveKey}
/>;
```

With icon

```jsx
import { SegmentedControl } from '../segmented-control';
import { SvgIcon } from '../svg-icon';
import { star } from '../../icons/star';

const segments = [
  { id: 'top_rated', label: 'Top rated', icon: <SvgIcon icon={star} /> },
  { id: 'newest', label: 'Newest' },
  { id: 'popular', label: 'Popular' },
];
const [activeKey, setActiveKey] = React.useState(segments[0].id);

<SegmentedControl
  size="md"
  items={segments}
  selectedValue={activeKey}
  onChangeSelectedValue={setActiveKey}
/>;
```
