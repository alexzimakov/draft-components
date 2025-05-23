import { type Meta, type StoryFn } from '@storybook/react';
import { type ComponentProps } from 'react';
import { Caption } from './caption.js';

const meta: Meta<typeof Caption> = {
  title: 'Caption',
  component: Caption,
  args: {
    color: 'gray',
  },
  argTypes: {
    color: {
      control: 'radio',
      options: ['gray', 'blue', 'green', 'orange', 'red'],
    },
  },
};
export default meta;

export const Basic: StoryFn<typeof Caption> = (args) => (
  <Caption {...args} />
);
Basic.args = {
  children: 'Write a few sentences about yourself.',
};

export const WithIcon = Basic.bind({});
WithIcon.args = {
  color: 'red',
  icon: <ExclamationTriangleIcon width={20} height={20} />,
  children: 'Username must be between 3 and 64 characters.',
};

export const Colors: StoryFn<typeof Caption> = (args) => (
  <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  }}
  >
    <Caption {...args} color="gray">
      Write a few sentences about yourself.
    </Caption>

    <Caption {...args} color="blue">
      Update is available.
    </Caption>

    <Caption {...args} color="green">
      Removed 'index.js' from list.
    </Caption>

    <Caption {...args} color="orange">
      Token expires in 15 days.
    </Caption>

    <Caption {...args} color="red">
      Username must be between 3 and 64 characters.
    </Caption>
  </div>
);
Colors.parameters = {
  controls: {
    exclude: ['children', 'color'],
  },
};
Colors.args = {};

function ExclamationTriangleIcon(props: ComponentProps<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={24}
      height={24}
      fill="currentColor"
      {...props}
    >
      <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clipRule="evenodd" />
    </svg>
  );
}
