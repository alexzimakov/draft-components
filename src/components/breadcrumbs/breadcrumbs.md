```jsx
import { Breadcrumbs } from './breadcrumbs';
import { SvgIcon } from '../svg-icon';
import { homeIcon } from '../svg-icon/icons';

<Breadcrumbs
  items={[
    { href: '/', label: 'Home', icon: <SvgIcon icon={homeIcon} /> },
    { href: '#breadcrumbs', label: 'Project' },
    { href: '#breadcrumbs', label: 'Awesome Project' },
  ]}
/>;
```
