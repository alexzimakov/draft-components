import { type Meta, type StoryFn } from '@storybook/react';
import { Radio } from './radio.js';

const meta: Meta<typeof Radio> = {
  title: 'Forms/Radio',
  component: Radio,
  args: {
    disabled: false,
    checked: false,
    icon: 'dot',
  },
};
export default meta;

export const Basic: StoryFn<typeof Radio> = (args) => (
  <Radio {...args} />
);
Basic.args = {};

export const States: StoryFn<typeof Radio> = (args) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: 'auto 1fr',
      alignItems: 'center',
      justifyItems: 'start',
      gap: 16,
    }}
  >
    <code>Unchecked</code> <Radio {...args} checked={false} />
    <code>Checked</code> <Radio {...args} checked={true} />
    <code>Checked with check icon</code> <Radio {...args} checked={true} icon="check" />
  </div>
);
States.parameters = {
  controls: {
    exclude: ['icon', 'onToggle'],
  },
};
States.args = {};

export const Disabled = States.bind({});
Disabled.parameters = {
  controls: {
    exclude: ['icon', 'onToggle'],
  },
};
Disabled.args = {
  disabled: true,
};
