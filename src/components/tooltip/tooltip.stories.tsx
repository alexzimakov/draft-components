import { type Meta, type StoryFn } from '@storybook/react';
import { type ComponentProps } from 'react';
import { Tooltip } from './tooltip.js';
import { IconButton } from '../button/index.js';
import { TextInput } from '../text-input/index.js';

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
  anchorPadding: 6,
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

function QuestionMarkCircleIcon(props: ComponentProps<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      width={20}
      height={20}
      fill="currentColor"
      {...props}
    >
      <path fillRule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0ZM8.94 6.94a.75.75 0 1 1-1.061-1.061 3 3 0 1 1 2.871 5.026v.345a.75.75 0 0 1-1.5 0v-.5c0-.72.57-1.172 1.081-1.287A1.5 1.5 0 1 0 8.94 6.94ZM10 15a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" clipRule="evenodd" />
    </svg>
  );
}

function BookmarkIcon(props: ComponentProps<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      width={24}
      height={24}
      strokeWidth={1.5}
      stroke="currentColor"
      {...props}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
    </svg>
  );
}
