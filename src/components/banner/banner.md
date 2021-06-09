```jsx
import { Banner } from '../banner';

const props = {
  children: 'Your app is out of date. Please update to get the latest version.',
  actions: { label: 'Update', onClick: () => alert('Update action') },
};

<div style={{ display: 'grid', gridRowGap: '1rem' }}>
  <Banner {...props} />
  <Banner appearance="warning" {...props} />
  <Banner appearance="error" {...props} />
  <Banner appearance="info" {...props} />
  <Banner appearance="success" {...props} />
</div>;
```

Multiple actions

```jsx
import { Banner } from '../banner';

<Banner
  appearance="warning"
  actions={[
    { label: 'Update', onClick: () => alert('Update action') },
    { label: 'Close', onClick: () => alert('Close action') },
  ]}
>
  Your app is out of date. Please update to get the latest version.
</Banner>;
```

Full width

```jsx
import { Banner } from '../banner';

<Banner hasFullWidth={true}>
  Your app is out of date. Please update to get the latest version.
</Banner>;
```
