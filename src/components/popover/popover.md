```jsx
import { Popover } from '../popover';
import { Button } from '../button';

function renderPopover(placement, alignment) {
  return (
    <Popover
      placement={placement}
      alignment={alignment}
      anchor={
        <Button>
          {placement} {alignment}
        </Button>
      }
    >
      <div style={{ margin: 16 }}>Popover Content</div>
    </Popover>
  );
}

<div
  style={{
    display: 'inline-grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    rowGap: 12,
    columnGap: 8,
    justifyItems: 'center',
  }}
>
  <div />
  <div>{renderPopover('top', 'start')}</div>
  <div>{renderPopover('top', 'center')}</div>
  <div>{renderPopover('top', 'end')}</div>
  <div />

  <div>{renderPopover('right', 'start')}</div>
  <div />
  <div />
  <div />
  <div>{renderPopover('left', 'start')}</div>

  <div>{renderPopover('right', 'center')}</div>
  <div />
  <div />
  <div />
  <div>{renderPopover('left', 'center')}</div>

  <div>{renderPopover('right', 'end')}</div>
  <div />
  <div />
  <div />
  <div>{renderPopover('left', 'end')}</div>

  <div />
  <div>{renderPopover('bottom', 'start')}</div>
  <div>{renderPopover('bottom', 'center')}</div>
  <div>{renderPopover('bottom', 'end')}</div>
  <div />
</div>;
```

Nested popovers

```jsx
import { Popover } from '../popover';
import { Button } from '../button';
import { Checkbox } from '../checkbox';
import { TextInput } from '../text-input';
import { Textarea } from '../textarea';

const Styles = {
  headline: {
    fontSize: 12,
    fontWeight: 500,
    margin: 0,
    color: '#71717a',
  },
  list: {
    minWidth: 192,
    margin: '8px 0 0',
    padding: 0,
    listStyle: 'none',
  },
  item: {
    marginTop: 4,
  },
  divider: {
    margin: '8px 0',
    border: 'none',
    borderTop: '1px solid #e4e4e7',
  },
  form: {
    minWidth: 240,
  },
  field: {
    marginTop: 12,
  },
};

<Popover anchor={<Button>Add to List +</Button>}>
  <h2 style={Styles.headline}>My Lists</h2>
  <ul style={Styles.list}>
    <li>
      <Checkbox label="Upcoming" />
    </li>
    <li style={Styles.item}>
      <Checkbox label="Work" />
    </li>
    <li style={Styles.item}>
      <Checkbox label="Family" />
    </li>
  </ul>
  <hr style={Styles.divider} />

  <Popover
    placement="right"
    alignment="start"
    anchor={
      <Button appearance="secondary" fullWidth={true}>
        Create List
      </Button>
    }
  >
    <div style={Styles.form}>
      <h2 style={Styles.headline}>Create a list to ogranize your reminders</h2>
      <TextInput
        style={Styles.field}
        placeholder="Name of List"
        fullWidth={true}
      />
      <Textarea
        style={{ ...Styles.field, minHeight: 92 }}
        placeholder="Write a description"
        fullWidth={true}
      />
      <Button
        style={Styles.field}
        size="lg"
        fullWidth={true}
        appearance="primary"
      >
        Create
      </Button>
    </div>
  </Popover>
</Popover>;
```

Controlled

```jsx
import { useState } from 'react';
import { Popover } from '../popover';
import { Button } from '../button';

const [isOpen, setIsOpen] = useState(false);

const anchor = (
  <Button onClick={() => setIsOpen((isOpen) => !isOpen)}>Open Popover</Button>
);

<Popover anchor={anchor} isOpen={isOpen} onClose={() => setIsOpen(false)}>
  <div style={{ margin: 16 }}>Controlled Popover Content</div>
</Popover>;
```

Popover with tooltip

```jsx
import { Popover } from '../popover';
import { Tooltip } from '../tooltip';
import { Button } from '../button';

const renderAnchor = ({ setRef, togglePopover }) => (
  <Tooltip label="Click on me!">
    <Button ref={setRef} onClick={togglePopover}>
      Hover on me
    </Button>
  </Tooltip>
);

<Popover anchor={renderAnchor}>
  <div style={{ margin: 16 }}>Popover Content</div>
</Popover>;
```
