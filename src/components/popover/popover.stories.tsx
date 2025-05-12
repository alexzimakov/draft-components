import { Meta, StoryFn } from '@storybook/react';
import { Popover, PopoverPlacement } from './popover.js';
import { useRef, useState } from 'react';
import { Button, IconButton } from '../button/index.js';
import { Checkbox } from '../checkbox/index.js';
import { SelectionControl } from '../selection-control/index.js';

const meta: Meta<typeof Popover> = {
  title: 'Overlays/Popover',
  component: Popover,
  parameters: {
    layout: 'centered',
  },
};
export default meta;

export const Basic: StoryFn<typeof Popover> = (args) => {
  const [isOpen, setIsOpen] = useState(args.isOpen);
  const genres = [
    { value: 'CLASSICAL', label: 'Classical' },
    { value: 'HIP_HOP', label: 'HipHop' },
    { value: 'JAZZ', label: 'Jazz' },
    { value: 'LATIN', label: 'Latin' },
    { value: 'POP', label: 'Pop' },
    { value: 'ROCK', label: 'Rock' },
  ];

  const togglePopover = () => {
    setIsOpen((isOpen) => !isOpen);
  };

  const handlePopover = () => {
    setIsOpen(false);
  };

  return (
    <Popover
      {...args}
      isOpen={isOpen}
      onClose={handlePopover}
      renderAnchor={(props) => <Button {...props} onClick={togglePopover}>Favorites Genres</Button>}
    >
      <div style={{ fontWeight: 'bold', paddingBottom: 12 }}>
        Choose your favorites genres <Hint />
      </div>
      <div style={{ display: 'grid', gap: 8 }}>
        {genres.map(({ value, label }) => (
          <SelectionControl key={value} label={label}>
            <Checkbox name="favoriteGenres" value={value} />
          </SelectionControl>
        ))}
      </div>
    </Popover>
  );
};

Basic.argTypes = {
  anchorRef: {
    control: { disable: true },
  },
  renderAnchor: {
    control: { disable: true },
  },
  onClose: {
    control: { disable: true },
  },
  onUnmount: {
    control: { disable: true },
  },
};
Basic.args = {
  placement: 'bottom-start',
  anchorPadding: 4,
  viewportPadding: 4,
};

export const Placements = () => {
  const gridTemplateAreas = `
".           bottom-start bottom bottom-end .         "
"right-start .            .      .          left-start"
"right       .            .      .          left      "
"right-end   .            .      .          left-end  "
".           top-start    top    top-end    .         "
`;
  return (
    <div
      style={{
        display: 'inline-grid',
        gridTemplateAreas,
        gap: '12px 8px',
        justifyItems: 'center',
        whiteSpace: 'nowrap',
      }}
    >
      <PopoverExample placement="bottom-start" />
      <PopoverExample placement="bottom" />
      <PopoverExample placement="bottom-end" />

      <PopoverExample placement="right-start" />
      <PopoverExample placement="right" />
      <PopoverExample placement="right-end" />

      <PopoverExample placement="left-start" />
      <PopoverExample placement="left" />
      <PopoverExample placement="left-end" />

      <PopoverExample placement="top-start" />
      <PopoverExample placement="top" />
      <PopoverExample placement="top-end" />
    </div>
  );
};

function Hint() {
  const anchorRef = useRef<HTMLButtonElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const openPopover = () => {
    setIsOpen(true);
  };

  const closePopover = () => {
    setIsOpen(false);
  };

  return (
    <>
      <IconButton
        style={{ borderRadius: '50%' }}
        size="xs"
        buttonStyle="tinted"
        ref={anchorRef}
        onMouseEnter={openPopover}
        onMouseLeave={closePopover}
      >
        <code style={{ fontWeight: 'bold' }}>?</code>
      </IconButton>
      <Popover
        anchorRef={anchorRef}
        placement="right"
        isOpen={isOpen}
        onClose={closePopover}
      >
        You can change it later in the settings
      </Popover>
    </>
  );
}

function PopoverExample({
  placement,
}: {
  placement: PopoverPlacement;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopover = () => {
    setIsOpen((isOpen) => !isOpen);
  };

  const closePopover = () => {
    setIsOpen(false);
  };

  return (
    <div style={{ gridArea: placement }}>
      <Popover
        placement={placement}
        isOpen={isOpen}
        onClose={closePopover}
        renderAnchor={(props) => <Button {...props} onClick={togglePopover}>{placement}</Button>}
      >
        Popover content
      </Popover>
    </div>
  );
}
