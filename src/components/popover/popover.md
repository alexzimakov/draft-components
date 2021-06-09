```jsx
import { Popover } from '../popover';
import { Button } from '../button';

const [state, setState] = React.useState({});

function renderPopover(arrangement, alignment) {
  const key = `${arrangement}_${alignment}`;
  return (
    <Popover
      isOpen={!!state[key]}
      arrangement={arrangement}
      alignment={alignment}
      content={
        <div>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet aut
          blanditiis consequuntur deserunt, dignissimos eaque id in magnam,
          magni quae rem sit, tempore totam! Debitis dicta in iusto libero
          voluptatum.
        </div>
      }
      onClose={() => setState({ ...state, [key]: false })}
    >
      <Button onClick={() => setState({ ...state, [key]: !state[key] })}>
        {arrangement} {alignment}
      </Button>
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

Tooltip in popover

```jsx
import { Popover } from '../popover';
import { Tooltip } from '../tooltip';
import { Button } from '../button';

const [isOpen, setIsOpen] = React.useState(false);

<Popover
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  content="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus deserunt doloribus enim ipsum iusto modi nihil porro!"
>
  {({ ref }) => (
    <Tooltip content="Tooltip text">
      <Button ref={ref} onClick={() => setIsOpen(!isOpen)}>
        Press or hover over me
      </Button>
    </Tooltip>
  )}
</Popover>;
```
