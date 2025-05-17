import { type Meta, type StoryFn } from '@storybook/react';
import { FormField } from './form-field.js';
import { TextInput } from '../text-input/index.js';

const meta: Meta<typeof FormField> = {
  title: 'Forms/FormField',
  component: FormField,
  argTypes: {
    label: {
      control: { type: 'text' },
    },
    hint: {
      control: { type: 'text' },
    },
  },
};
export default meta;

export const Basic: StoryFn<typeof FormField> = (args) => (
  <FormField {...args}>
    <TextInput id={args.labelFor} sizeInChars={40} />
  </FormField>
);
Basic.args = {
  label: 'Your name',
  labelFor: 'name',
  hint: 'People will be able to find you by this name.',
};

export const Invalid: StoryFn<typeof FormField> = (args) => (
  <FormField {...args}>
    <TextInput
      id={args.labelFor}
      invalid={true}
      sizeInChars={40}
    />
  </FormField>
);
Invalid.args = {
  required: true,
  label: 'Username',
  labelFor: 'username',
  error: 'Username must have at least 5 characters.',
  hint: 'People will be able to find you this username.',
};
