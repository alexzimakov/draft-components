```jsx padded
import { SvgIcon } from './svg-icon';
import * as icons from '../svg-icon/icons';

const props = { size: 'lg' };

<>
  <SvgIcon {...props} icon={icons.remove} />
  <SvgIcon {...props} icon={icons.minus} />
  <SvgIcon {...props} icon={icons.search} />
  <SvgIcon {...props} icon={icons.error} />
  <SvgIcon {...props} icon={icons.warning} />
  <SvgIcon {...props} icon={icons.info} />
  <SvgIcon {...props} icon={icons.success} />
  <SvgIcon {...props} icon={icons.like} />
  <SvgIcon {...props} icon={icons.bookmark} />
  <SvgIcon {...props} icon={icons.trash} />
  <SvgIcon {...props} icon={icons.ulList} />
  <SvgIcon {...props} icon={icons.olList} />
  <SvgIcon {...props} icon={icons.pencil} />
  <SvgIcon {...props} icon={icons.copy} />
  <SvgIcon {...props} icon={icons.eye} />
  <SvgIcon {...props} icon={icons.eyeClose} />
  <SvgIcon {...props} icon={icons.facebookCircle} />
  <SvgIcon {...props} icon={icons.folder} />
  <SvgIcon {...props} icon={icons.document} />
  <SvgIcon {...props} icon={icons.stack} />
  <SvgIcon {...props} icon={icons.stackOpen} />
  <SvgIcon {...props} icon={icons.cloudDownload} />
  <SvgIcon {...props} icon={icons.comments} />
  <SvgIcon {...props} icon={icons.home} />
  <SvgIcon {...props} icon={icons.chevronRight} />
  <SvgIcon {...props} icon={icons.chevronLeft} />
  <SvgIcon {...props} icon={icons.filter} />
</>;
```

Linear Gradient:

```jsx padded
import { SvgIcon } from './svg-icon';
import * as icons from '../svg-icon/icons';

const props = {
  size: 'lg',
  linearGradient: ['to bottom', '#60a5fa', '#2563eb'],
};

<>
  <SvgIcon {...props} icon={icons.remove} />
  <SvgIcon {...props} icon={icons.minus} />
  <SvgIcon {...props} icon={icons.search} />
  <SvgIcon {...props} icon={icons.error} />
  <SvgIcon {...props} icon={icons.warning} />
  <SvgIcon {...props} icon={icons.info} />
  <SvgIcon {...props} icon={icons.success} />
  <SvgIcon {...props} icon={icons.like} />
  <SvgIcon {...props} icon={icons.bookmark} />
  <SvgIcon {...props} icon={icons.trash} />
  <SvgIcon {...props} icon={icons.ulList} />
  <SvgIcon {...props} icon={icons.olList} />
  <SvgIcon {...props} icon={icons.pencil} />
  <SvgIcon {...props} icon={icons.copy} />
  <SvgIcon {...props} icon={icons.eye} />
  <SvgIcon {...props} icon={icons.eyeClose} />
  <SvgIcon {...props} icon={icons.facebookCircle} />
  <SvgIcon {...props} icon={icons.folder} />
  <SvgIcon {...props} icon={icons.document} />
  <SvgIcon {...props} icon={icons.stack} />
  <SvgIcon {...props} icon={icons.stackOpen} />
  <SvgIcon {...props} icon={icons.cloudDownload} />
  <SvgIcon {...props} icon={icons.comments} />
  <SvgIcon {...props} icon={icons.home} />
  <SvgIcon {...props} icon={icons.chevronRight} />
  <SvgIcon {...props} icon={icons.chevronLeft} />
  <SvgIcon {...props} icon={icons.filter} />
</>;
```

Sizes:

```jsx padded
import { SvgIcon } from './svg-icon';
import * as icons from './icons';

<>
  <SvgIcon size="xs" icon={icons.like} />
  <SvgIcon size="sm" icon={icons.like} />
  <SvgIcon size="base" icon={icons.like} />
  <SvgIcon size="lg" icon={icons.like} />
  <SvgIcon size="xl" icon={icons.like} />
  <SvgIcon size="2x" icon={icons.like} />
  <SvgIcon size="3x" icon={icons.like} />
  <SvgIcon size="4x" icon={icons.like} />
  <SvgIcon size="5x" icon={icons.like} />
</>;
```
