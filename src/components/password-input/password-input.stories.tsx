import { Meta, StoryFn } from '@storybook/react';
import { PasswordInput } from './password-input';

const meta: Meta<typeof PasswordInput> = {
  title: 'Forms/PasswordInput',
  component: PasswordInput,
};
export default meta;

export const Basic: StoryFn<typeof PasswordInput> = (args) => (
  <PasswordInput {...args} />
);
Basic.args = {
  placeholder: 'Enter your password',
};
