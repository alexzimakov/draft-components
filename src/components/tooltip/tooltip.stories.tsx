import { type Meta, type StoryFn } from '@storybook/react';
import { Tooltip } from './tooltip.js';
import { IconButton } from '../button/index.js';
import { TextInput } from '../text-input/text-input.js';
import { BookmarkIcon } from '@heroicons/react/24/outline';
import { QuestionMarkCircleIcon } from '@heroicons/react/20/solid';

const meta: Meta<typeof Tooltip> = {
  title: 'Overlays/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    title: {
      control: { type: 'text' },
    },
    children: {
      control: { disable: true },
    },
  },
};
export default meta;

export const Basic: StoryFn<typeof Tooltip> = (args) => (
  <Tooltip {...args}>
    {(props) => (
      <IconButton {...props}>
        <BookmarkIcon width={18} height={18} />
      </IconButton>
    )}
  </Tooltip>
);

Basic.args = {
  title: 'Add bookmark',
};

export const Multiline: StoryFn<typeof Tooltip> = (args) => (
  <TextInput
    placeholder="Password"
    slotRight={() => (
      <Tooltip {...args}>
        {(props) => (
          <button
            {...props}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '0 6px',
              background: 'none',
              border: 'none',
            }}
          >
            <QuestionMarkCircleIcon width={20} height={20} />
          </button>
        )}
      </Tooltip>
    )}
  />
);

Multiline.args = {
  title: `Password Rules:
- Minimum of 8 characters
- Include at least one lowercase letter, one uppercase letter, one number and one special character
- Unique to this website`,
};
