import { type Meta, type StoryFn } from '@storybook/react';
import { Badge } from './badge';

const meta: Meta<typeof Badge> = {
  title: 'Badge',
  component: Badge,
};
export default meta;

export const Basic: StoryFn<typeof Badge> = (args) => (
  <Badge {...args}>{args.children}</Badge>
);
Basic.args = {
  children: '1',
};

export const Text = Basic.bind({});
Text.args = {
  children: 'New',
};
