import { type ComponentMeta, type ComponentStory } from '@storybook/react';
import { PasswordInput } from './password-input';

export default {
  title: 'Forms/PasswordInput',
  component: PasswordInput,
} as ComponentMeta<typeof PasswordInput>;

export const Basic: ComponentStory<typeof PasswordInput> = (args) => (
  <PasswordInput {...args} />
);
Basic.args = {
  placeholder: 'Enter your password',
};
