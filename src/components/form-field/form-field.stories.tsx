import { type ComponentMeta, type ComponentStory } from '@storybook/react';
import { FormField } from './form-field';
import { TextInput } from '../text-input';

export default {
  title: 'Forms/FormField',
  component: FormField,
  argTypes: {
    label: {
      control: { type: 'text' },
    },
    caption: {
      control: { type: 'text' },
    },
  },
} as ComponentMeta<typeof FormField>;

export const Basic: ComponentStory<typeof FormField> = (args) => (
  <FormField {...args}>
    <TextInput id={args.labelFor} width="40ch" />
  </FormField>
);
Basic.args = {
  label: 'Your name',
  caption: 'People will be able to find you by this name.',
  labelFor: 'name',
};

export const WithError: ComponentStory<typeof FormField> = (args) => (
  <FormField {...args}>
    <TextInput
      id={args.labelFor}
      width="40ch"
      hasError={true}
    />
  </FormField>
);
WithError.args = {
  required: true,
  labelFor: 'username',
  label: 'Username',
  caption: 'People will be able to find you this username.',
  error: 'Username must have at least 5 characters.',
};
