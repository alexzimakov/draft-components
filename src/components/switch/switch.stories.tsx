import { type ComponentMeta, type ComponentStory } from '@storybook/react';
import { Switch } from './switch';
import { Radio } from '../radio';

export default {
  title: 'Forms/Switch',
  component: Switch,
  args: {
    disabled: false,
    showCheckIcon: true,
  },
} as ComponentMeta<typeof Switch>;

export const Basic: ComponentStory<typeof Switch> = (args) => (
  <Switch {...args} />
);
Basic.args = {};

export const States: ComponentStory<typeof Radio> = (args) => (
  <div style={{
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: '1rem 4rem',
  }}>
    <StateView caption="Unchecked">
      <Switch {...args} checked={false} />
    </StateView>
    <StateView caption="Checked">
      <Switch {...args} checked={true} />
    </StateView>
    <StateView caption="Without icon">
      <Switch {...args} checked={true} showCheckIcon={false} />
    </StateView>
  </div>
);
States.parameters = {
  controls: {
    exclude: ['showCheckIcon', 'onToggle'],
  },
};
States.args = {};

export const Disabled = States.bind({});
Disabled.parameters = {
  controls: {
    exclude: ['showCheckIcon', 'onToggle'],
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
