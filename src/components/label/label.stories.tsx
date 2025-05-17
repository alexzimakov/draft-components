import { type Meta, type StoryFn } from '@storybook/react';
import { Label } from './label.js';

const meta: Meta<typeof Label> = {
  title: 'Label',
  component: Label,
  args: {
    required: false,
  },
};
export default meta;

export const Basic: StoryFn<typeof Label> = (args) => (
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
