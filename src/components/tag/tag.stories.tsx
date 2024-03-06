import { Meta, StoryFn } from '@storybook/react';
import { Tag } from './tag.js';
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
  tagStyle: 'default',
  tint: 'gray',
  size: 'md',
};

export const Sizes: StoryFn<typeof Tag> = (args) => (
  <div style={{ display: 'flex', alignItems: 'flex-end', gap: 16 }}>
    <Tag {...args} size="sm" />
    <Tag {...args} size="md" />
    <Tag {...args} size="lg" />
  </div>
);
Sizes.parameters = {
  controls: {
    exclude: ['size'],
  },
};
Sizes.args = {
  ...Basic.args,
};

export const WithIcon = Basic.bind({});
WithIcon.storyName = 'With icon';
WithIcon.args = {
  children: (
    <>
      <LockClosedIcon
        style={{ marginRight: 6 }}
        width="1em"
        height="1em"
      />
      {' '}
      Protected
    </>
  ),
};

export const Tints: StoryFn<typeof Tag> = (args) => (
  <div style={{
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'flex-end',
    gap: 16,
  }}
  >
    <Tag {...args} tint="gray">Gray</Tag>
    <Tag {...args} tint="green">Green</Tag>
    <Tag {...args} tint="cyan">Cyan</Tag>
    <Tag {...args} tint="blue">Blue</Tag>
    <Tag {...args} tint="purple">Purple</Tag>
    <Tag {...args} tint="pink">Pink</Tag>
    <Tag {...args} tint="red">Red</Tag>
    <Tag {...args} tint="orange">Orange</Tag>
    <Tag {...args} tint="yellow">Yellow</Tag>
  </div>
);
Tints.parameters = {
  controls: {
    exclude: ['tint', 'children'],
  },
};
Tints.args = {
  ...Basic.args,
};
