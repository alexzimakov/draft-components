import { type Meta, type StoryFn } from '@storybook/react';
import { Radio } from './radio';

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
  <div style={{
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: '1rem 4rem',
  }}>
    <StateView caption="Unchecked">
      <Radio {...args} checked={false} />
    </StateView>
    <StateView caption="Checked">
      <Radio {...args} checked={true} />
    </StateView>
    <StateView caption="Check icon">
      <Radio {...args} checked={true} icon="check" />
    </StateView>
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

function StateView(props: { children: JSX.Element, caption: string }) {
  return (
    <div style={{ fontSize: '0.875rem' }}>
      <div style={{ marginBottom: '0.5rem' }}>{props.caption}</div>
      {props.children}
    </div>
  );
}
