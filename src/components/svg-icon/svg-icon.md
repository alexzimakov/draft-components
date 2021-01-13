```jsx padded
import { SvgIcon } from './svg-icon';
import * as icons from '../svg-icon/icons';

const props = { size: 'lg' };

<>
  <SvgIcon {...props} icon={icons.deleteIcon} />
  <SvgIcon {...props} icon={icons.minusIcon} />
  <SvgIcon {...props} icon={icons.searchIcon} />
  <SvgIcon {...props} icon={icons.errorIcon} />
  <SvgIcon {...props} icon={icons.warningIcon} />
  <SvgIcon {...props} icon={icons.infoIcon} />
  <SvgIcon {...props} icon={icons.successIcon} />
  <SvgIcon {...props} icon={icons.likeIcon} />
  <SvgIcon {...props} icon={icons.bookmarkIcon} />
  <SvgIcon {...props} icon={icons.trashIcon} />
  <SvgIcon {...props} icon={icons.ulListIcon} />
  <SvgIcon {...props} icon={icons.olListIcon} />
  <SvgIcon {...props} icon={icons.pencilIcon} />
  <SvgIcon {...props} icon={icons.copyIcon} />
  <SvgIcon {...props} icon={icons.eyeIcon} />
  <SvgIcon {...props} icon={icons.eyeCloseIcon} />
  <SvgIcon {...props} icon={icons.facebookCircleIcon} />
  <SvgIcon {...props} icon={icons.folderIcon} />
  <SvgIcon {...props} icon={icons.documentIcon} />
  <SvgIcon {...props} icon={icons.stackIcon} />
  <SvgIcon {...props} icon={icons.stackOpenIcon} />
  <SvgIcon {...props} icon={icons.cloudDownloadIcon} />
  <SvgIcon {...props} icon={icons.commentsIcon} />
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
  <SvgIcon {...props} icon={icons.deleteIcon} />
  <SvgIcon {...props} icon={icons.minusIcon} />
  <SvgIcon {...props} icon={icons.searchIcon} />
  <SvgIcon {...props} icon={icons.errorIcon} />
  <SvgIcon {...props} icon={icons.warningIcon} />
  <SvgIcon {...props} icon={icons.infoIcon} />
  <SvgIcon {...props} icon={icons.successIcon} />
  <SvgIcon {...props} icon={icons.likeIcon} />
  <SvgIcon {...props} icon={icons.bookmarkIcon} />
  <SvgIcon {...props} icon={icons.trashIcon} />
  <SvgIcon {...props} icon={icons.ulListIcon} />
  <SvgIcon {...props} icon={icons.olListIcon} />
  <SvgIcon {...props} icon={icons.pencilIcon} />
  <SvgIcon {...props} icon={icons.copyIcon} />
  <SvgIcon {...props} icon={icons.eyeIcon} />
  <SvgIcon {...props} icon={icons.eyeCloseIcon} />
  <SvgIcon {...props} icon={icons.facebookCircleIcon} />
  <SvgIcon {...props} icon={icons.folderIcon} />
  <SvgIcon {...props} icon={icons.documentIcon} />
  <SvgIcon {...props} icon={icons.stackIcon} />
  <SvgIcon {...props} icon={icons.stackOpenIcon} />
  <SvgIcon {...props} icon={icons.cloudDownloadIcon} />
  <SvgIcon {...props} icon={icons.commentsIcon} />
</>;
```

Sizes:

```jsx padded
import { SvgIcon } from './svg-icon';
import { likeIcon } from './icons';

<>
  <SvgIcon size="xs" icon={likeIcon} />
  <SvgIcon size="sm" icon={likeIcon} />
  <SvgIcon size="base" icon={likeIcon} />
  <SvgIcon size="lg" icon={likeIcon} />
  <SvgIcon size="xl" icon={likeIcon} />
  <SvgIcon size="2x" icon={likeIcon} />
  <SvgIcon size="3x" icon={likeIcon} />
  <SvgIcon size="4x" icon={likeIcon} />
  <SvgIcon size="5x" icon={likeIcon} />
</>;
```
