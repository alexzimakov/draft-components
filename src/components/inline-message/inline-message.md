```jsx
import { InlineMessage } from './inline-message';

<div style={{ display: 'grid', rowGap: 8 }}>
  <InlineMessage appearance="default">
    You can use letters, numbers & periods
  </InlineMessage>
  <InlineMessage appearance="info">
    You can use letters, numbers & periods
  </InlineMessage>
  <InlineMessage appearance="success">
    You can use letters, numbers & periods
  </InlineMessage>
  <InlineMessage appearance="error">
    You can use letters, numbers & periods
  </InlineMessage>
  <InlineMessage appearance="warning">
    You can use letters, numbers & periods
  </InlineMessage>
</div>;
```

With an icon:

```jsx
import { InlineMessage } from './inline-message';

<div style={{ display: 'grid', rowGap: 8 }}>
  <InlineMessage shouldShowIcon={true} appearance="default">
    You can use letters, numbers & periods
  </InlineMessage>
  <InlineMessage shouldShowIcon={true} appearance="info">
    You can use letters, numbers & periods
  </InlineMessage>
  <InlineMessage shouldShowIcon={true} appearance="success">
    You can use letters, numbers & periods
  </InlineMessage>
  <InlineMessage shouldShowIcon={true} appearance="error">
    You can use letters, numbers & periods
  </InlineMessage>
  <InlineMessage shouldShowIcon={true} appearance="warning">
    You can use letters, numbers & periods
  </InlineMessage>
</div>;
```
