import { Meta, StoryFn } from '@storybook/react';
import { Textarea } from './textarea.js';

const meta: Meta<typeof Textarea> = {
  title: 'Forms/Textarea',
  component: Textarea,
  args: {
    size: 'md',
    rows: 3,
    placeholder: 'Add your comment...',
  },
};
export default meta;

export const Basic: StoryFn<typeof Textarea> = (args) => (
  <Textarea {...args} />
);

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
