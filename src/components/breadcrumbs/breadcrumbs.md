```jsx
import { Breadcrumbs } from './breadcrumbs';
import { SvgIcon } from '../svg-icon';
import * as icons from '../svg-icon/icons';

<Breadcrumbs
  items={[
    { href: '/', label: 'Home', icon: <SvgIcon icon={icons.home} /> },
    { href: '#breadcrumbs', label: 'Project' },
    { href: '#breadcrumbs', label: 'Awesome Project' },
  ]}
/>;
```
