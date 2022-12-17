import { type ComponentMeta, type ComponentStory } from '@storybook/react';
import { ColorPicker } from './color-picker';
import { useState } from 'react';

export default {
  title: 'Forms/ColorPicker',
  component: ColorPicker,
} as ComponentMeta<typeof ColorPicker>;

const backgrounds = [
  { value: 'red', color: '#ef4444' },
  { value: 'orange', color: '#f97316' },
  { value: 'yellow', color: '#facc15' },
  { value: 'lime', color: '#84cc16' },
  { value: 'green', color: '#22c55e' },
  { value: 'sky', color: '#0ea5e9' },
  { value: 'blue', color: '#3b82f6' },
  { value: 'indigo', color: '#6366f1' },
  { value: 'violet', color: '#8b5cf6' },
  { value: 'pink', color: '#ec4899' },
];

export const Basic: ComponentStory<typeof ColorPicker> = (args) => {
  const [value, setValue] = useState(args.options[0].value);
  return (
    <ColorPicker
      {...args}
      name="accent"
      value={value}
      onChangeValue={(value) => {
        setValue(value);
        args.onChangeValue(value);
      }}
    />
  );
};
Basic.args = {
  options: [
    {
      value: 'multicolor',
      color: `conic-gradient(${backgrounds.map(((bg) => bg.color)).join(',')})`,
    },
    ...backgrounds,
  ],
};

export const Disabled = Basic.bind({});
Disabled.args = {
  ...Basic.args,
  disabled: true,
};
