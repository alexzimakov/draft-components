import { Meta, StoryFn } from '@storybook/react';
import { Tag } from './tag';
import { LockClosedIcon } from '@heroicons/react/24/outline';

const meta: Meta<typeof Tag> = {
  title: 'Tag',
  component: Tag,
};
export default meta;

export const Basic: StoryFn<typeof Tag> = (args) => (
  <Tag {...args} />
);
Basic.args = {
  children: 'Protected',
  variant: 'tinted',
  fill: 'gray',
  size: 'md',
};

export const Sizes: StoryFn<typeof Tag> = (args) => (
  <div style={{ display: 'flex', alignItems: 'flex-end', gap: 16 }}>
    <Tag {...args} size="sm" />
    <Tag {...args} size="md" />
    <Tag {...args} size="lg" />
  </div>
);
Sizes.argTypes = {
  size: {
    control: { disable: true },
  },
};
Sizes.args = {
  ...Basic.args,
};

export const WithIcon = Basic.bind({});
WithIcon.args = {
  children: (
    <>
      <LockClosedIcon style={{ marginRight: 6 }} width="1em" height="1em" />
      Protected
    </>
  ),
};

export const FillColors: StoryFn<typeof Tag> = (args) => (
  <div style={{
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'flex-end',
    gap: 16,
  }}>
    <Tag {...args} fill="gray">Gray</Tag>
    <Tag {...args} fill="green">Green</Tag>
    <Tag {...args} fill="cyan">Cyan</Tag>
    <Tag {...args} fill="blue">Blue</Tag>
    <Tag {...args} fill="purple">Purple</Tag>
    <Tag {...args} fill="pink">Pink</Tag>
    <Tag {...args} fill="red">Red</Tag>
    <Tag {...args} fill="orange">Orange</Tag>
    <Tag {...args} fill="yellow">Yellow</Tag>
  </div>
);
FillColors.argTypes = {
  size: {
    fill: { disable: true },
    children: { disable: true },
  },
};
FillColors.args = {
  ...Basic.args,
};
