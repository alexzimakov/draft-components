import { type Meta, type StoryFn } from '@storybook/react';
import { SegmentedControl } from './segmented-control.js';
import { useState } from 'react';
import { ClockIcon, StarIcon } from '@heroicons/react/24/outline';

const options = [
  { value: 'newest', label: 'Newest' },
  { value: 'popular', label: 'Popular' },
  { value: 'topRated', label: 'Top rated' },
];
const optionsWithIcon = [
  {
    value: 'popular',
    label: 'Popular',
    icon: <StarIcon width="1.25em" height="1.25em" />,
  },
  {
    value: 'recent',
    label: 'Recent',
    icon: <ClockIcon width="1.25em" height="1.25em" />,
  },
];

const meta: Meta<typeof SegmentedControl> = {
  title: 'Forms/SegmentedControl',
  component: SegmentedControl,
  args: {
    options,
    'size': 'md',
    'aria-label': 'Category',
    'value': options[0].value,
  },
  argTypes: {
    value: {
      control: { disable: true },
    },
  },
};
export default meta;

export const Basic: StoryFn<typeof SegmentedControl> = (args) => {
  const [value, setValue] = useState(args.value);
  return (
    <SegmentedControl
      {...args}
      value={value}
      onChangeValue={(value) => {
        setValue(value);
        if (typeof args.onChangeValue === 'function') {
          args.onChangeValue(value);
        }
      }}
    />
  );
};

export const Disabled = Basic.bind({});
Disabled.args = {
  disabled: true,
};

export const WithIcon = Basic.bind({});
WithIcon.storyName = 'With icon';
WithIcon.args = {
  options: optionsWithIcon,
  value: optionsWithIcon[0].value,
};
