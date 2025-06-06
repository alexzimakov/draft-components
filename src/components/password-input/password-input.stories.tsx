import { type Meta, type StoryFn } from '@storybook/react';
import { PasswordInput } from './password-input.js';

const meta: Meta<typeof PasswordInput> = {
  title: 'Forms/PasswordInput',
  component: PasswordInput,
  args: {
    size: 'md',
    slotStyle: 'plain',
  },
};
export default meta;

export const Basic: StoryFn<typeof PasswordInput> = (args) => (
  <PasswordInput {...args} />
);
Basic.args = {
  placeholder: 'Enter your password',
};
