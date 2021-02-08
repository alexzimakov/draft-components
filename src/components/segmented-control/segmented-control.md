```jsx
import { SegmentedControl } from './segmented-control';

const separator = <div style={{ padding: '8px 0' }} />;

<>
  <SegmentedControl size="sm">
    <SegmentedControl.Item isActive={true}>First</SegmentedControl.Item>
    <SegmentedControl.Item>Second</SegmentedControl.Item>
    <SegmentedControl.Item>Third</SegmentedControl.Item>
  </SegmentedControl>
  {separator}
  <SegmentedControl>
    <SegmentedControl.Item isActive={true}>First</SegmentedControl.Item>
    <SegmentedControl.Item>Second</SegmentedControl.Item>
    <SegmentedControl.Item>Third</SegmentedControl.Item>
  </SegmentedControl>
  {separator}
  <SegmentedControl size="lg">
    <SegmentedControl.Item isActive={true}>First</SegmentedControl.Item>
    <SegmentedControl.Item>Second</SegmentedControl.Item>
    <SegmentedControl.Item>Third</SegmentedControl.Item>
  </SegmentedControl>
</>;
```
