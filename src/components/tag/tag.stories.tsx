import { type Meta, type StoryFn } from '@storybook/react';
import { type ComponentProps } from 'react';
import { Tag } from './tag.js';

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
    <Tag {...args} tint="gray">gray</Tag>
    <Tag {...args} tint="green">green</Tag>
    <Tag {...args} tint="lime">lime</Tag>
    <Tag {...args} tint="sky">sky</Tag>
    <Tag {...args} tint="blue">blue</Tag>
    <Tag {...args} tint="indigo">indigo</Tag>
    <Tag {...args} tint="pink">pink</Tag>
    <Tag {...args} tint="red">red</Tag>
    <Tag {...args} tint="orange">orange</Tag>
    <Tag {...args} tint="yellow">yellow</Tag>
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

function LockClosedIcon(props: ComponentProps<'svg'>) {
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
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
    </svg>
  );
}
