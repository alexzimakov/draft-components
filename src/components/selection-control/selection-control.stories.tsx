import { type ComponentMeta, ComponentStory } from '@storybook/react';
import { SelectionControl } from './selection-control';
import { Switch as SwitchComponent } from '../switch';
import { Checkbox as CheckboxComponent } from '../checkbox';
import { Radio as RadioComponent } from '../radio';

export default {
  title: 'Forms/SelectionControl',
  component: SelectionControl,
  argTypes: {
    label: {
      control: { type: 'text' },
    },
    caption: {
      control: { type: 'text' },
    },
  },
} as ComponentMeta<typeof SelectionControl>;

export const Switch: ComponentStory<typeof SelectionControl> = (args) => (
  <SelectionControl label={args.label} caption={args.caption}>
    <SwitchComponent />
  </SelectionControl>
);
Switch.args = {
  label: 'Enable location services',
  caption: 'Allow selected apps to determine your location',
};

export const Checkbox: ComponentStory<typeof SelectionControl> = (args) => (
  <SelectionControl label={args.label} caption={args.caption}>
    <CheckboxComponent />
  </SelectionControl>
);
Checkbox.args = {
  label: 'Normalize volume',
  caption: 'Set the same volume level for all songs',
};

export const Radio: ComponentStory<typeof SelectionControl> = (args) => (
  <SelectionControl label={args.label} caption={args.caption}>
    <RadioComponent />
  </SelectionControl>
);
Radio.args = {
  label: 'Public access',
  caption: 'The repository would be available to anyone',
};
