import { type Meta, type StoryFn } from '@storybook/react';
import { type ComponentProps, useState } from 'react';
import { SegmentedControl } from './segmented-control.js';

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

function ClockIcon(props: ComponentProps<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      width={24}
      height={24}
      strokeWidth={1.5}
      stroke="currentColor"
      {...props}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
  );
}

function StarIcon(props: ComponentProps<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      width={24}
      height={24}
      strokeWidth={1.5}
      stroke="currentColor"
      {...props}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
    </svg>
  );
}
