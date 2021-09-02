```jsx
import { VerticalNavigation } from '../vertical-navigation';
import { Tag } from '../tag';

const projectsBadge = (
  <Tag size="sm" isRounded={true}>
    7
  </Tag>
);

const reportsBadge = (
  <Tag size="sm" isRounded={true}>
    50+
  </Tag>
);

<VerticalNavigation style={{ maxWidth: 288 }}>
  <VerticalNavigation.Item href="#home" selected={true}>
    Home
  </VerticalNavigation.Item>
  <VerticalNavigation.Item href="#downloads">Downloads</VerticalNavigation.Item>
  <VerticalNavigation.Item href="#projects" badge={projectsBadge}>
    Projects
  </VerticalNavigation.Item>
  <VerticalNavigation.Item href="#reports" badge={reportsBadge}>
    Reports
  </VerticalNavigation.Item>
  <VerticalNavigation.Item href="#home">Help</VerticalNavigation.Item>
  <VerticalNavigation.Item href="#contact-us">
    Contact Us
  </VerticalNavigation.Item>
</VerticalNavigation>;
```

With icons

```jsx
import { VerticalNavigation } from '../vertical-navigation';
import { Tag } from '../tag';
import { SvgIcon } from '../svg-icon';
import { houseDoor } from '../../icons/house-door';
import { arrowDownCircle } from '../../icons/arrow-down-circle';
import { folder } from '../../icons/folder';
import { clipboardData } from '../../icons/clipboard-data';
import { questionCircle } from '../../icons/question-circle';
import { telephone } from '../../icons/telephone';

const projectsBadge = (
  <Tag size="sm" isRounded={true}>
    7
  </Tag>
);

const reportsBadge = (
  <Tag size="sm" isRounded={true}>
    50+
  </Tag>
);

<VerticalNavigation style={{ maxWidth: 288 }}>
  <VerticalNavigation.Item
    href="#home"
    selected={true}
    icon={<SvgIcon icon={houseDoor} />}
  >
    Home
  </VerticalNavigation.Item>
  <VerticalNavigation.Item
    href="#downloads"
    icon={<SvgIcon icon={arrowDownCircle} />}
  >
    Downloads
  </VerticalNavigation.Item>
  <VerticalNavigation.Item
    href="#projects"
    badge={projectsBadge}
    icon={<SvgIcon icon={folder} />}
  >
    Projects
  </VerticalNavigation.Item>
  <VerticalNavigation.Item
    href="#reports"
    badge={reportsBadge}
    icon={<SvgIcon icon={clipboardData} />}
  >
    Reports
  </VerticalNavigation.Item>
  <VerticalNavigation.Item
    href="#home"
    icon={<SvgIcon icon={questionCircle} />}
  >
    Help
  </VerticalNavigation.Item>
  <VerticalNavigation.Item
    href="#contact-us"
    icon={<SvgIcon icon={telephone} />}
  >
    Contact Us
  </VerticalNavigation.Item>
</VerticalNavigation>;
```
