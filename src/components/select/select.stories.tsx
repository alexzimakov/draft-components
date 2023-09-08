import { Meta, StoryFn } from '@storybook/react';
import { Select } from './select.js';

const meta: Meta<typeof Select> = {
  title: 'Forms/Select',
  component: Select,
  args: {
    size: 'md',
  },
};
export default meta;

export const Basic: StoryFn<typeof Select> = (args) => (
  <Select {...args}>
    <option>Choose a browser</option>
    <option>Chrome</option>
    <option>Firefox</option>
    <option>Safari</option>
    <option>Opera</option>
    <option>Microsoft Edge</option>
  </Select>
);
Basic.args = {};

export const Loading = Basic.bind({});
Loading.args = {
  loading: true,
};

export const Disabled = Basic.bind({});
Disabled.args = {
  disabled: true,
};

export const Invalid = Basic.bind({});
Invalid.args = {
  invalid: true,
};

export const FullWidth = Basic.bind({});
FullWidth.storyName = 'Full width';
FullWidth.args = {
  fullWidth: true,
};

export const Multiple: StoryFn<typeof Select> = (args) => (
  <Select {...args}>
    <option>Chrome</option>
    <option>Firefox</option>
    <option>Safari</option>
    <option>Opera</option>
    <option>Microsoft Edge</option>
  </Select>
);
Multiple.args = {
  multiple: true,
};
