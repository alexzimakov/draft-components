import { type ComponentMeta, type ComponentStory } from '@storybook/react';
import { Checkbox } from './checkbox';

export default {
  title: 'Forms/Checkbox',
  component: Checkbox,
  args: {
    disabled: false,
    hasMixedState: false,
  },
} as ComponentMeta<typeof Checkbox>;

export const Basic: ComponentStory<typeof Checkbox> = (args) => (
  <Checkbox {...args} />
);
Basic.args = {};

export const States: ComponentStory<typeof Checkbox> = (args) => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    gap: '1rem 4rem',
  }}>
    <View caption="Unchecked">
      <Checkbox {...args} checked={false} />
    </View>
    <View caption="Checked">
      <Checkbox {...args} checked={true} />
    </View>
    <View caption="Mixed">
      <Checkbox {...args} checked={true} hasMixedState={true} />
    </View>
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

function View(props: { children: JSX.Element, caption: string }) {
  return (
    <div style={{
      fontSize: 14,
      fontFamily: 'var(--dc-font-primary)',
    }}>
      <div style={{ marginBottom: '0.5rem' }}>{props.caption}</div>
      {props.children}
    </div>
  );
}
