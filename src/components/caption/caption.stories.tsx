import { Meta, StoryFn } from '@storybook/react';
import { Caption } from './caption';
import ExclamationTriangleIcon from '@heroicons/react/24/solid/ExclamationTriangleIcon';

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
WithIcon.storyName = 'With icon';
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
  }}>
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
