```jsx
import { Breadcrumb, BreadcrumbLink } from './';
import { SvgIcon } from '../svg-icon';
import { houseFill } from '../../bootstrap-icons/house-fill';

<Breadcrumb>
  <BreadcrumbLink href="#/Navigation" icon={<SvgIcon icon={houseFill} />}>
    Home
  </BreadcrumbLink>
  <BreadcrumbLink href="#/Navigation?id=breadcrumbs">Navigation</BreadcrumbLink>
  <BreadcrumbLink selected={true}>Breadcrumbs</BreadcrumbLink>
</Breadcrumb>;
```

Custom delimiter

```jsx
import { Breadcrumb, BreadcrumbLink } from './';
import { SvgIcon } from '../svg-icon';
import { houseFill } from '../../bootstrap-icons/house-fill';
import { chevronRight } from '../../bootstrap-icons/chevron-right';

<Breadcrumb delimiter={<SvgIcon icon={chevronRight} />}>
  <BreadcrumbLink href="#/Navigation" icon={<SvgIcon icon={houseFill} />}>
    Home
  </BreadcrumbLink>
  <BreadcrumbLink href="#/Navigation?id=breadcrumbs">Navigation</BreadcrumbLink>
  <BreadcrumbLink selected={true}>Breadcrumbs</BreadcrumbLink>
</Breadcrumb>;
```
