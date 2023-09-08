import { Meta, StoryFn } from '@storybook/react';
import { useState } from 'react';
import { DatePicker } from './date-picker.js';
import { DateRangePicker } from './date-range-picker.js';

const meta: Meta<typeof DatePicker> = {
  title: 'Forms/DatePicker',
  component: DatePicker,
  args: {
    weekStartsOn: 1,
    locale: 'en',
    nextMonthButtonLabel: 'next month',
    prevMonthButtonLabel: 'previous month',
    monthSelectLabel: 'month',
    yearInputLabel: 'year',
  },
  argTypes: {
    value: {
      control: { disable: true },
    },
    weekStartsOn: {
      control: {
        type: 'select',
        options: [0, 1, 2, 3, 4, 5, 6],
        labels: {
          0: 'Sunday',
          1: 'Monday',
          2: 'Tuesday',
          3: 'Wednesday',
          4: 'Thursday',
          5: 'Friday',
          6: 'Saturday',
        },
      },
    },
  },
};
export default meta;

export const Basic: StoryFn<typeof DatePicker> = (args) => {
  const [value, setValue] = useState(args.value);
  return (
    <DatePicker
      {...args}
      value={value}
      onChangeValue={(value) => {
        setValue(value);
        args.onChangeValue?.(value);
      }}
    />
  );
};
Basic.args = {
  value: '2022-12-01',
};

export const Range: StoryFn<typeof DateRangePicker> = (args) => {
  const [value, setValue] = useState(args.value);
  return (
    <DateRangePicker
      {...args}
      value={value}
      onChangeValue={(value) => {
        setValue(value);
        args.onChangeValue?.(value);
      }}
    />
  );
};
Range.args = {
  value: { start: '2022-12-03', end: '2022-12-25' },
};

export const MinMaxValues = Basic.bind({});
MinMaxValues.storyName = 'Min & Max';
MinMaxValues.args = {
  value: '2022-12-21',
  min: '2022-12-07',
  max: '2022-12-25',
};
