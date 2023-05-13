import { type Meta, type StoryFn } from '@storybook/react';
import { Select } from './select';

const meta: Meta<typeof Select> = {
  title: 'Forms/Select',
  component: Select,
  args: {
    size: 'md',
    loading: false,
    disabled: false,
    hasError: false,
    isBlock: false,
  },
  argTypes: {
    children: { control: false },
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

export const HasError = Basic.bind({});
HasError.args = {
  hasError: true,
};

export const FullWidth = Basic.bind({});
FullWidth.args = {
  isBlock: true,
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
