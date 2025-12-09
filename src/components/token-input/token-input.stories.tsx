import { type Meta, type StoryFn } from '@storybook/react';
import { TokenInput } from './token-input.js';
import { useState } from 'react';

const meta: Meta<typeof TokenInput> = {
  title: 'Forms/TokenInput',
  component: TokenInput,
  args: {
    size: 'md',
    tokens: [],
  },
};
export default meta;

export const Basic: StoryFn<typeof TokenInput> = (args) => {
  const [value, setValue] = useState(args.tokens);

  return (
    <TokenInput
      {...args}
      tokens={value}
      onChange={setValue}
    />
  );
};
Basic.args = {
  placeholder: 'Enter tags...',
};

export const Disabled = Basic.bind({});
Disabled.args = {
  placeholder: 'Enter tags...',
  disabled: true,
  tokens: ['new', 'demo', 'api'],
};

export const Invalid = Basic.bind({});
Invalid.args = {
  placeholder: 'Enter tags...',
  invalid: true,
};
