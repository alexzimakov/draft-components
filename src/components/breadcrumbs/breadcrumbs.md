```jsx
import { Breadcrumbs } from './breadcrumbs';
import { SvgIcon } from '../svg-icon';
import { houseFill } from '../../icons/house-fill';

<Breadcrumbs
  items={[
    { href: '/', label: 'Home', icon: <SvgIcon icon={houseFill} /> },
    { href: '#breadcrumbs', label: 'Project' },
    { href: '#breadcrumbs', label: 'Awesome Project' },
  ]}
/>;
```
