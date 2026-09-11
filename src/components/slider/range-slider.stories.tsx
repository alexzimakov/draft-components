import { type Meta, type StoryFn } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { RangeSlider } from './range-slider.js';

const valueFormatter = new Intl.NumberFormat(undefined, {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

const meta: Meta<typeof RangeSlider> = {
  title: 'Forms/RangeSlider',
  component: RangeSlider,
  args: {
    disabled: false,
    fullWidth: false,
    showLabels: false,
    step: 1,
    min: 0,
    max: 100,
    value: { min: 30, max: 70 },
    format: valueFormatter.format,
  },
};
export default meta;

export const Basic: StoryFn<typeof RangeSlider> = (args) => {
  const [{ value }, updateArgs] = useArgs();

  return (
    <RangeSlider
      {...args}
      value={value}
      onChange={(value) => {
        updateArgs({ value });
        if (typeof args.onChange === 'function') {
          args.onChange(value);
        }
      }}
    />
  );
};
Basic.args = {
  name: 'priceRange',
};

export const Disabled = Basic.bind({});
Disabled.args = {
  disabled: true,
};

export const WithLabel = Basic.bind({});
WithLabel.args = {
  showLabels: true,
};

export const WithTickMarks = Basic.bind({});
WithTickMarks.args = {
  tickMarks: Array.from({ length: 11 }).map((_, index) => {
    const value = index * 10;
    return {
      value,
      label: valueFormatter.format(value),
    };
  }),
};
