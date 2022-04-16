```jsx
import { Tooltip } from '../tooltip';
import { Button } from '../button';
import { SvgIcon } from '../svg-icon';
import { bookmark } from '../../bootstrap-icons/bookmark';

<Tooltip label="Save to favorite">
  <Button
    noPadding={true}
    leadingIcon={<SvgIcon size="lg" icon={bookmark} />}
  />
</Tooltip>;
```

Wide content

```jsx
import { Tooltip } from '../tooltip';
import { SvgIcon } from '../svg-icon';
import { bodyText } from '../../bootstrap-icons/body-text';

const content =
  'Lorem ipsum dolor sit amet, consectetur adipisicing elit. ' +
  'Dolore eos impedit iusto molestiae possimus quaerat, sint sunt ullam unde.';

<Tooltip label={content}>
  <SvgIcon size="lg" icon={bodyText} />
</Tooltip>;
```

Controlled

```jsx
import { Tooltip } from '../tooltip';
import { Button } from '../button';

<Tooltip label="Controlled Tooltip content">
  {({ setRef, showTooltip, hideTooltip }) => (
    <Button ref={setRef} onMouseEnter={showTooltip} onMouseLeave={hideTooltip}>
      Show Tooltip
    </Button>
  )}
</Tooltip>;
```
