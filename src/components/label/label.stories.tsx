import { type ComponentMeta, type ComponentStory } from '@storybook/react';
import { Label } from './label';

export default {
  title: 'Label',
  component: Label,
  args: {
    required: false,
  },
} as ComponentMeta<typeof Label>;

export const Basic: ComponentStory<typeof Label> = (args) => (
  <Label {...args} />
);
Basic.args = {
  children: 'First name',
};

export const Required = Basic.bind({});
Required.args = {
  children: 'Username',
  required: true,
};
