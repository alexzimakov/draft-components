import { type ComponentMeta, type ComponentStory } from '@storybook/react';
import { Tooltip } from './tooltip';
import { IconButton } from '../button';
import { BookmarkIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

export default {
  title: 'Overlays/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    content: {
      control: { type: 'text' },
    },
    children: {
      control: { disable: true },
    },
  },
} as ComponentMeta<typeof Tooltip>;

export const Basic: ComponentStory<typeof Tooltip> = (args) => (
  <Tooltip {...args}>
    <IconButton icon={<BookmarkIcon width={18} height={18} />} />
  </Tooltip>
);
Basic.args = {
  content: 'Add bookmark',
};

export const Controlled: ComponentStory<typeof Tooltip> = (args) => {
  const [isShown, setIsShown] = useState(false);
  return (
    <Tooltip {...args} isShown={isShown}>
      <IconButton
        icon={<BookmarkIcon width={18} height={18} />}
        onMouseEnter={() => setIsShown(true)}
        onMouseLeave={() => setIsShown(false)}
      />
    </Tooltip>
  );
};
Controlled.argTypes = {
  isShown: {
    control: { disable: true },
  },
};
Controlled.args = {
  ...Basic.args,
};
