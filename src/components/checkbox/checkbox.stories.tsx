import { Meta, StoryFn } from '@storybook/react';
import { Checkbox } from './checkbox.js';

const meta: Meta<typeof Checkbox> = {
  title: 'Forms/Checkbox',
  component: Checkbox,
  args: {
    disabled: false,
    hasMixedState: false,
  },
};
export default meta;

export const Basic: StoryFn<typeof Checkbox> = (args) => (
  <Checkbox {...args} />
);
Basic.args = {};

export const States: StoryFn<typeof Checkbox> = (args) => (
  <div style={{
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: '1rem 4rem',
  }}>
    <StateView caption="Unchecked">
      <Checkbox {...args} checked={false} />
    </StateView>
    <StateView caption="Checked">
      <Checkbox {...args} checked={true} />
    </StateView>
    <StateView caption="Mixed state">
      <Checkbox {...args} checked={true} hasMixedState={true} />
    </StateView>
  </div>
);
States.parameters = {
  controls: {
    exclude: ['hasMixedState', 'onToggle'],
  },
};
States.args = {};

export const Disabled = States.bind({});
Disabled.parameters = {
  controls: {
    exclude: ['hasMixedState', 'onToggle'],
  },
};
Disabled.args = {
  disabled: true,
};

function StateView(props: { children: JSX.Element, caption: string }) {
  return (
    <div style={{ fontSize: '0.875rem' }}>
      <div style={{ marginBottom: '0.5rem' }}>{props.caption}</div>
      {props.children}
    </div>
  );
}
