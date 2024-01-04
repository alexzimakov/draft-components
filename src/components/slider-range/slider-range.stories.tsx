import { Meta, StoryFn } from '@storybook/react';
import { SliderRange, SliderRangeValue } from './slider-range.js';
import { useState } from 'react';

const moneyFormatter = new Intl.NumberFormat('en', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

const meta: Meta<typeof SliderRange> = {
  title: 'Forms/SliderRange',
  component: SliderRange,
  args: {
    disabled: false,
    min: 0,
    max: 2500,
    step: 1,
    name: 'priceRange',
    value: { min: 123, max: 1789 },
    renderValue: moneyFormatter.format,
  },
};
export default meta;

export const Basic: StoryFn<typeof SliderRange> = (args) => {
  const [value, setValue] = useState(args.value);

  const handleChange = (value: SliderRangeValue) => {
    setValue(value);
    if (typeof args.onChange === 'function') {
      args.onChange(value);
    }
  };

  return (
    <SliderRange
      {...args}
      value={value}
      onChange={handleChange}
    />
  );
};
Basic.args = {};

export const Disabled = Basic.bind({});
Disabled.args = {
  disabled: true,
};

export const TickMarks = Basic.bind({});
TickMarks.args = {
  min: 0,
  max: 100,
  step: 5,
  value: { min: 25, max: 75 },
  tickMarks: Array.from({ length: (100 / 5) + 1 }).map((_, index) => {
    const value = index * 5;
    return {
      value,
      label: value % 25 === 0 ? moneyFormatter.format(value) : null,
    };
  }),
};
