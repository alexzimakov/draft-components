import { type ComponentMeta, type ComponentStory } from '@storybook/react';
import { Select } from './select';

export default {
  title: 'Forms/Select',
  component: Select,
  args: {
    size: 'md',
    disabled: false,
    hasError: false,
    isBlock: false,
  },
  argTypes: {
    children: { control: false },
  },
} as ComponentMeta<typeof Select>;

export const Basic: ComponentStory<typeof Select> = (args) => (
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

export const Multiple: ComponentStory<typeof Select> = (args) => (
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
