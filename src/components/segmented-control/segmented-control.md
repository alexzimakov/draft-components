```jsx
import { SegmentedControl } from '../segmented-control';

const segments = [
  { value: 1, label: 'Newest' },
  { value: 2, label: 'Popular' },
  { value: 3, label: 'Top rated' },
];
const [selectedValue, setSelectedValue] = React.useState(segments[0].value);

<SegmentedControl
  size="md"
  items={segments}
  selectedValue={selectedValue}
  onChangeSelectedValue={setSelectedValue}
/>;
```

With icon

```jsx
import { SegmentedControl } from '../segmented-control';
import { SvgIcon } from '../svg-icon';
import { star } from '../../bootstrap-icons/star';

const segments = [
  { value: 'top_rated', label: 'Top rated', icon: <SvgIcon icon={star} /> },
  { value: 'newest', label: 'Newest' },
  { value: 'popular', label: 'Popular' },
];
const [activeKey, setActiveKey] = React.useState(segments[0].value);

<SegmentedControl
  size="md"
  items={segments}
  selectedValue={activeKey}
  onChangeSelectedValue={setActiveKey}
/>;
```
