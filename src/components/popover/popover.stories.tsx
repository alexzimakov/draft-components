import { Meta, StoryFn } from '@storybook/react';
import { Popover, PopoverAlignment, PopoverPlacement } from './popover';
import { useState } from 'react';
import { Button } from '../button';
import { Tooltip } from '../tooltip';
import { TextInput } from '../text-input';
import { Textarea } from '../textarea';
import { Checkbox } from '../checkbox';
import { SelectionControl } from '../selection-control';

const meta: Meta<typeof Popover> = {
  title: 'Overlays/Popover',
  component: Popover,
};
export default meta;

export const Basic: StoryFn<typeof Popover> = (args) => (
  <Popover {...args} anchor={<Button>Open popover</Button>}>
    <div style={{ padding: 16 }}>Popover content</div>
  </Popover>
);
Basic.argTypes = {
  anchor: {
    control: { disable: true },
  },
};
Basic.args = {
  anchorGap: 4,
  viewportGap: 8,
  placement: 'bottom',
  alignment: 'start',
};

export const Controlled = () => {
  const [isOpen, setIsOpen] = useState(false);
  const anchor = (
    <Button onClick={() => setIsOpen(!isOpen)}>
      {isOpen ? 'Close' : 'Open'}
    </Button>
  );
  return (
    <Popover anchor={anchor} isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <div style={{ padding: 16 }}>Controlled popover content</div>
    </Popover>
  );
};

export const WithTooltip = () => (
  <Popover anchor={({ ref }, { togglePopover }) => (
    <Tooltip content="Click on me!">
      <Button ref={ref} onClick={togglePopover}>Hover on me</Button>
    </Tooltip>
  )}>
    <div style={{ padding: 16 }}>Popover Content</div>
  </Popover>
);
WithTooltip.storyName = 'With tooltip';

export const Nested = () => {
  const styles = {
    headline: {
      fontSize: 12,
      fontWeight: 700,
      margin: 0,
    },
    list: {
      display: 'grid',
      gap: 4,
      minWidth: 192,
      marginTop: 8,
    },
    form: {
      display: 'grid',
      gap: 8,
      minWidth: 288,
      marginTop: 8,
    },
    button: {
      width: '100%',
      marginTop: 12,
    },
  };

  return (
    <Popover anchor={<Button>Add to List +</Button>}>
      <h2 style={styles.headline}>My Lists</h2>
      <div style={styles.list}>
        <SelectionControl label="Upcoming">
          {({ id }) => <Checkbox id={id} />}
        </SelectionControl>
        <SelectionControl label="Work">
          {({ id }) => <Checkbox id={id} />}
        </SelectionControl>
        <SelectionControl label="Family">
          {({ id }) => <Checkbox id={id} />}
        </SelectionControl>
      </div>

      <Popover
        placement="right"
        alignment="start"
        anchor={<Button style={styles.button}>Create List</Button>}
      >
        <h2 style={styles.headline}>
          Create a list to organize your reminders
        </h2>
        <div style={styles.form}>
          <TextInput fullWidth={true} placeholder="Name of List" />
          <Textarea fullWidth={true} placeholder="Write a description" />
        </div>
        <Button style={styles.button} size="md" tint="blue">
          Create
        </Button>
      </Popover>
    </Popover>
  );
};

export const Positioning = () => (
  <div
    style={{
      display: 'inline-grid',
      gridTemplateAreas:
        '" .            top-start    top-center    top-end              . "' +
        '" right-start  .            .             .          left-start  "' +
        '" right-center .            .             .          left-center "' +
        '" right-end    .            .             .          left-end    "' +
        '" .            bottom-start bottom-center bottom-end           . "',
      gap: '12px 8px',
      justifyItems: 'center',
      whiteSpace: 'nowrap',
    }}
  >
    <PopoverExample placement="top" alignment="start" />
    <PopoverExample placement="top" alignment="center" />
    <PopoverExample placement="top" alignment="end" />

    <PopoverExample placement="right" alignment="start" />
    <PopoverExample placement="right" alignment="center" />
    <PopoverExample placement="right" alignment="end" />

    <PopoverExample placement="left" alignment="start" />
    <PopoverExample placement="left" alignment="center" />
    <PopoverExample placement="left" alignment="end" />

    <PopoverExample placement="bottom" alignment="start" />
    <PopoverExample placement="bottom" alignment="center" />
    <PopoverExample placement="bottom" alignment="end" />
  </div>
);

function PopoverExample(props: {
  placement: PopoverPlacement;
  alignment: PopoverAlignment;
}) {
  const { placement, alignment } = props;
  return (
    <div style={{ gridArea: `${placement}-${alignment}` }}>
      <Popover
        anchor={<Button>{placement} {alignment}</Button>}
        placement={placement}
        alignment={alignment}
      >
        <div style={{ padding: 16 }}>Popover content</div>
      </Popover>
    </div>
  );
}
