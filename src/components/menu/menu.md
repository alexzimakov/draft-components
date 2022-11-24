```jsx
import {Menu, MenuButton, MenuDivider} from '../menu';
import {Button} from '../button';

const handleClick = (event) => {
  alert(event.currentTarget.innerText);
};

<Menu label="Actions">
  <MenuButton onClick={handleClick}>Save</MenuButton>
  <MenuButton onClick={handleClick}>Rename</MenuButton>
  <MenuButton onClick={handleClick}>Duplicate</MenuButton>
  <MenuDivider />
  <MenuButton onClick={handleClick}>Delete</MenuButton>
</Menu>;
```

With icons

```jsx
import { Menu, MenuButton, MenuDivider } from '../menu';
import { SvgIcon } from '../svg-icon';
import { download } from '../../bootstrap-icons/download';
import { pencil } from '../../bootstrap-icons/pencil';
import { files } from '../../bootstrap-icons/files';
import { trash } from '../../bootstrap-icons/trash';

const handleClick = (event) => {
  alert(event.currentTarget.innerText);
};

<Menu label="Actions" defaultIsOpen={false}>
  <MenuButton icon={<SvgIcon icon={download} />} onClick={handleClick}>
    Save
  </MenuButton>
  <MenuButton icon={<SvgIcon icon={pencil} />} onClick={handleClick}>
    Rename
  </MenuButton>
  <MenuButton icon={<SvgIcon icon={files} />} onClick={handleClick}>
    Duplicate
  </MenuButton>
  <MenuDivider />
  <MenuButton icon={<SvgIcon icon={trash} />} onClick={handleClick}>
    Delete
  </MenuButton>
</Menu>;
```

Custom label

```jsx
import {Menu, MenuButton, MenuDivider} from '../menu';
import {Button} from '../button';
import {SvgIcon} from '../svg-icon';
import {toggles} from '../../bootstrap-icons/toggles';

const handleClick = (event) => {
  alert(event.currentTarget.innerText);
};

<Menu
  label={({...props}) => {
    delete props.isOpen;
    return (
      <Button {...props} appearance="secondary" noPadding={true}>
        <SvgIcon size="lg" icon={toggles} />
      </Button>
    );
  }}
>
  <MenuButton onClick={handleClick}>General</MenuButton>
  <MenuButton onClick={handleClick}>Users & Groups</MenuButton>
  <MenuButton onClick={handleClick}>Notifications</MenuButton>
</Menu>;
```
