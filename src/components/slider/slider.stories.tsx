import { type Meta, type StoryFn } from '@storybook/react';
import { type ComponentProps, useEffect, useState } from 'react';
import { Slider } from './slider.js';

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

function SpeakerWaveIcon(props: ComponentProps<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      width={20}
      height={20}
      fill="currentColor"
      {...props}
    >
      <path d="M10.5 3.75a.75.75 0 0 0-1.264-.546L5.203 7H2.667a.75.75 0 0 0-.7.48A6.985 6.985 0 0 0 1.5 10c0 .887.165 1.737.468 2.52.111.29.39.48.7.48h2.535l4.033 3.796a.75.75 0 0 0 1.264-.546V3.75ZM16.45 5.05a.75.75 0 0 0-1.06 1.061 5.5 5.5 0 0 1 0 7.778.75.75 0 0 0 1.06 1.06 7 7 0 0 0 0-9.899Z" />
      <path d="M14.329 7.172a.75.75 0 0 0-1.061 1.06 2.5 2.5 0 0 1 0 3.536.75.75 0 0 0 1.06 1.06 4 4 0 0 0 0-5.656Z" />
    </svg>
  );
}

function SpeakerXMarkIcon(props: ComponentProps<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      width={20}
      height={20}
      fill="currentColor"
      {...props}
    >
      <path d="M10.047 3.062a.75.75 0 0 1 .453.688v12.5a.75.75 0 0 1-1.264.546L5.203 13H2.667a.75.75 0 0 1-.7-.48A6.985 6.985 0 0 1 1.5 10c0-.887.165-1.737.468-2.52a.75.75 0 0 1 .7-.48h2.535l4.033-3.796a.75.75 0 0 1 .811-.142ZM13.78 7.22a.75.75 0 1 0-1.06 1.06L14.44 10l-1.72 1.72a.75.75 0 0 0 1.06 1.06l1.72-1.72 1.72 1.72a.75.75 0 1 0 1.06-1.06L16.56 10l1.72-1.72a.75.75 0 0 0-1.06-1.06L15.5 8.94l-1.72-1.72Z" />
    </svg>
  );
}
