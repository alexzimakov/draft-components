import { type ComponentMeta, type ComponentStory } from '@storybook/react';
import { useState } from 'react';
import { SegmentedControl } from './segmented-control';
import { SegmentedControlButton } from './segmented-control-button';
import { ClockIcon, StarIcon } from '@heroicons/react/24/outline';

export default {
  title: 'Forms/SegmentedControl',
  component: SegmentedControl,
  subcomponents: {
    SegmentedControlButton,
  },
  argTypes: {
    value: {
      control: { disable: true },
    },
  },
} as ComponentMeta<typeof SegmentedControl>;

export const Basic: ComponentStory<typeof SegmentedControl> = (args) => {
  const [value, setValue] = useState(args.options[0].value);
  return (
    <SegmentedControl
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
  'aria-label': 'Category',
  disabled: false,
  size: 'md',
  options: [
    { value: 'newest', label: 'Newest' },
    { value: 'popular', label: 'Popular' },
    { value: 'topRated', label: 'Top rated' },
  ],
};

export const Disabled = Basic.bind({});
Disabled.args = {
  ...Basic.args,
  disabled: true,
};

export const WithIcon = Basic.bind({});
WithIcon.args = {
  ...Basic.args,
  options: [
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
  ],
};
