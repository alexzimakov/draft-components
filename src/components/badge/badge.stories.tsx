import { type ComponentMeta, type ComponentStory } from '@storybook/react';
import { Badge } from './badge';

export default {
  title: 'Badge',
  component: Badge,
} as ComponentMeta<typeof Badge>;

export const Basic: ComponentStory<typeof Badge> = (args) => (
  <Badge {...args}>{args.children}</Badge>
);
Basic.args = {
  children: '1',
};

export const Text = Basic.bind({});
Text.args = {
  children: 'New',
};
