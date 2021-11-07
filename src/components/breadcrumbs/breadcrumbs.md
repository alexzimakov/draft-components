```jsx
import { Breadcrumbs } from '../breadcrumbs';
import { SvgIcon } from '../svg-icon';
import { houseFill } from '../../bootstrap-icons/house-fill';

<Breadcrumbs>
  <Breadcrumbs.Item href="#/Navigation" icon={<SvgIcon icon={houseFill} />}>
    Home
  </Breadcrumbs.Item>
  <Breadcrumbs.Item href="#/Navigation?id=breadcrumbs">
    Navigation
  </Breadcrumbs.Item>
  <Breadcrumbs.Item selected={true}>Breadcrumbs</Breadcrumbs.Item>
</Breadcrumbs>;
```

Custom delimiter

```jsx
import { Breadcrumbs } from '../breadcrumbs';
import { SvgIcon } from '../svg-icon';
import { houseFill } from '../../bootstrap-icons/house-fill';
import { chevronRight } from '../../bootstrap-icons/chevron-right';

<Breadcrumbs delimiter={<SvgIcon icon={chevronRight} />}>
  <Breadcrumbs.Item href="#/Navigation" icon={<SvgIcon icon={houseFill} />}>
    Home
  </Breadcrumbs.Item>
  <Breadcrumbs.Item href="#/Navigation?id=breadcrumbs">
    Navigation
  </Breadcrumbs.Item>
  <Breadcrumbs.Item selected={true}>Breadcrumbs</Breadcrumbs.Item>
</Breadcrumbs>;
```
