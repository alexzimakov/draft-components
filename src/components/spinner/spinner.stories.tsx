import { type ComponentMeta, type ComponentStory } from '@storybook/react';
import { Spinner } from './spinner';

export default {
  title: 'Spinner',
  component: Spinner,
  argTypes: {
    color: { control: 'color' },
    size: { control: 'number', defaultValue: 24 },
  },
} as ComponentMeta<typeof Spinner>;

export const Basic: ComponentStory<typeof Spinner> = (args) => (
  <Spinner {...args} />
);
Basic.args = {};
