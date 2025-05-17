import { type Meta, type StoryFn } from '@storybook/react';
import { useEffect, useState } from 'react';
import { Slider } from './slider.js';
import { SpeakerWaveIcon, SpeakerXMarkIcon } from '@heroicons/react/20/solid';

const meta: Meta<typeof Slider> = {
  title: 'Forms/Slider',
  component: Slider,
  args: {
    disabled: false,
    fullWidth: false,
    showLabel: false,
    step: 1,
    min: 0,
    max: 100,
    value: 30,
  },
};
export default meta;

export const Basic: StoryFn<typeof Slider> = (args) => {
  const [value, setValue] = useState(args.value);

  useEffect(() => {
    setValue(args.value);
  }, [args.value]);

  return (
    <Slider
      {...args}
      value={value}
      onChange={setValue}
    />
  );
};
Basic.args = {
  name: 'volume',
};

export const Disabled = Basic.bind({});
Disabled.args = {
  disabled: true,
};

export const WithLabel = Basic.bind({});
WithLabel.args = {
  showLabel: true,
};

export const WithIcons = Basic.bind({});
WithIcons.args = {
  iconLeft: <SpeakerXMarkIcon width={20} height={20} />,
  iconRight: <SpeakerWaveIcon width={20} height={20} />,
};

export const WithTickMarks = Basic.bind({});
WithTickMarks.args = {
  tickMarks: Array.from({ length: 11 }).map((_, index) => {
    const value = index * 10;
    const valueFormatter = new Intl.NumberFormat(undefined, { style: 'percent' });
    return {
      value,
      label: valueFormatter.format(value / 100),
    };
  }),
};
