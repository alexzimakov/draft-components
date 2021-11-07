```jsx
import { Toast } from '../toast';

const props = {
  children: 'Your app is out of date. Please update to get the latest version.',
  actions: [{ label: 'Update', onClick: () => alert('Update action') }],
};

const message = `Your app is out of date. Please update to get the latest version.`;
const buttons = (
  <>
    <Toast.Button>Update</Toast.Button>
  </>
);

<div style={{ display: 'grid', rowGap: 16, justifyItems: 'flex-start' }}>
  <Toast message={message}>
    {buttons}
  </Toast>
  <Toast appearance="warning" message={message}>
    {buttons}
  </Toast>
  <Toast appearance="error" message={message}>
    {buttons}
  </Toast>
  <Toast appearance="info" message={message}>
    {buttons}
  </Toast>
  <Toast appearance="success" message={message}>
    {buttons}
  </Toast>
</div>;
```

Multiple actions

```jsx
import { Toast } from '../toast';

<Toast
  message="Your app is out of date. Please update to get the latest version."
  appearance="warning"
>
  <Toast.Button>Update</Toast.Button>
  <Toast.Button>Close</Toast.Button>
</Toast>;
```

Heading and message

```jsx
import { Toast } from '../toast';

<Toast
  appearance="success"
  message="Campaign saved!"
  informativeText="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores assumenda atque consectetur culpa distinctio."
>
  <Toast.Button>Got it</Toast.Button>
</Toast>;
```

Full width

```jsx
import { Toast } from '../toast';
import { SvgIcon } from '../svg-icon';
import { bug } from '../../bootstrap-icons/bug';

<Toast
  fullWidth={true}
  appearance="error"
  message="Your app is out of date. Please update to get the latest version."
  informativeText="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid autem beatae, dolore dolorum facere illo in incidunt laborum."
  icon={<SvgIcon icon={bug} size="1.5em" />}
/>;
```
