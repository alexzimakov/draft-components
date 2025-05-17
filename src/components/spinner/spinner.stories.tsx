import { type Meta, type StoryFn } from '@storybook/react';
import { Spinner } from './spinner.js';

const meta: Meta<typeof Spinner> = {
  title: 'Spinner',
  component: Spinner,
  argTypes: {
    color: { control: 'color' },
    size: { control: 'number', defaultValue: 24 },
  },
};
export default meta;

export const Basic: StoryFn<typeof Spinner> = (args) => (
  <Spinner {...args} />
);
Basic.args = {};
