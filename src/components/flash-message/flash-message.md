```jsx
import { FlashMessage } from './flash-message';

const props = {
  children: 'Your app is out of date. Please update to get the latest version.',
  actionButtonLabel: 'Update',
  onActionButtonClick: () => alert('On action button click'),
};

<div style={{ display: 'grid', gridRowGap: '1rem' }}>
  <FlashMessage {...props} />
  <FlashMessage appearance="warning" {...props} />
  <FlashMessage appearance="error" {...props} />
  <FlashMessage appearance="info" {...props} />
  <FlashMessage appearance="success" {...props} />
</div>;
```

Full width:

```jsx
import { FlashMessage } from './flash-message';

<FlashMessage hasFullWidth={true}>
  Your app is out of date. Please update to get the latest version.
</FlashMessage>;
```
