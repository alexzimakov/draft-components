import { type ComponentMeta, type ComponentStory } from '@storybook/react';
import { Button } from './Button';

export default {
  title: 'Button',
  component: Button,
  argTypes: {
    onClick: { action: 'onClick' },
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  children: 'Primary',
  appearance: 'primary',
};
