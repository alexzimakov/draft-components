```jsx
import { Alert } from './alert';

<Alert heading="MIT License">
  A short and simple permissive license with conditions only requiring
  preservation of copyright and license notices. Licensed works, modifications,
  and larger works may be distributed under different terms and without source
  code.
</Alert>;
```

Warning:

```jsx
import { Alert } from './alert';

<Alert appearance="warning" shouldShowIcon={true} heading="Low Power Mode">
  Mail fetch, background app refresh, automatic downloads, and some visual
  effects are reduced or disabled in Low Power Mode.
</Alert>;
```

Error:

```jsx
import { Alert } from './alert';

<Alert appearance="error" shouldShowIcon={true} heading="Registation failed">
  <ul>
    <li>Enter first and last names</li>
    <li>Use 8 characters or more for your password</li>
  </ul>
</Alert>;
```

Info:

```jsx
import { Alert } from './alert';

<Alert appearance="info" shouldShowIcon={true} heading="Update is available">
  The next version of app is available with new features and security
  improvements.
</Alert>;
```

Success:

```jsx
import { Alert } from './alert';

<Alert appearance="success" shouldShowIcon={true} heading="Update completed">
  Your phone was updated successfully. There are just a few more steps to
  follow, and then you're done!
</Alert>;
```
