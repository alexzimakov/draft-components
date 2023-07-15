import { Meta, StoryFn } from '@storybook/react';
import { Slider } from './slider';

const meta: Meta<typeof Slider> = {
  title: 'Forms/Slider',
  component: Slider,
  args: {
    thumbStyle: 'round',
    step: 1,
    min: 0,
    max: 100,
  },
};
export default meta;

export const Basic: StoryFn<typeof Slider> = (args) => (
  <Slider {...args} />
);
Basic.args = {
  defaultValue: 30,
};

export const Disabled = Basic.bind({});
Disabled.args = {
  // defaultValue: 30,
  disabled: true,
};

export const WithTickMarks = Basic.bind({});
WithTickMarks.args = {
  defaultValue: 2,
  thumbStyle: 'rect',
  step: 1,
  min: 0,
  max: 16,
  tickMarksCount: 17,
  renderTickMarkLabel: (index) => {
    const max = 16;
    if (index === 0) {
      return '1 min';
    }
    if (index === 4) {
      return '15 min';
    }
    if (index === 9) {
      return '1 hr';
    }
    if (index === max - 4) {
      return '2 hrs';
    }
    if (index === max) {
      return 'Never';
    }
  },
};
