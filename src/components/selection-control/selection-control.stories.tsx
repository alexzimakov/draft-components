import { Meta, StoryFn } from '@storybook/react';
import { ReactNode } from 'react';
import { SelectionControl } from './selection-control';
import { Switch as SwitchComponent } from '../switch';
import { Checkbox as CheckboxComponent } from '../checkbox';
import { Radio as RadioComponent } from '../radio';

const meta: Meta<typeof SelectionControl> = {
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
};
export default meta;

export const Switch: StoryFn<typeof SelectionControl> = (args) => (
  <Layout>
    <SelectionControl label={args.label}>
      <SwitchComponent />
    </SelectionControl>
    <SelectionControl label={args.label} caption={args.caption}>
      <SwitchComponent />
    </SelectionControl>
  </Layout>
);
Switch.args = {
  label: 'Enable location services',
  caption: 'Allow selected apps to determine your location',
};

export const Checkbox: StoryFn<typeof SelectionControl> = (args) => (
  <Layout>
    <SelectionControl label={args.label}>
      <CheckboxComponent />
    </SelectionControl>
    <SelectionControl label={args.label} caption={args.caption}>
      <CheckboxComponent />
    </SelectionControl>
  </Layout>
);
Checkbox.args = {
  label: 'Replies',
  caption: 'Get notified when someone replies on your question',
};

export const Radio: StoryFn<typeof SelectionControl> = (args) => (
  <Layout>
    <SelectionControl label={args.label}>
      <RadioComponent />
    </SelectionControl>
    <SelectionControl label={args.label} caption={args.caption}>
      <RadioComponent />
    </SelectionControl>
  </Layout>
);
Radio.args = {
  label: 'Public access',
  caption: 'The repository would be available to anyone',
};

function Layout({ children }: { children: ReactNode }) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 24,
    }}>
      {children}
    </div>
  );
}
