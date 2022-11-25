import { type ComponentMeta, type ComponentStory } from '@storybook/react';
import { Switch } from './switch';

export default {
  title: 'Forms/Switch',
  component: Switch,
  args: {
    disabled: false,
    showCheckIcon: false,
  },
} as ComponentMeta<typeof Switch>;

export const Basic: ComponentStory<typeof Switch> = (args) => (
  <Switch {...args} />
);
Basic.args = {};

export const Disabled = Basic.bind({});
Disabled.args = {
  disabled: true,
};
