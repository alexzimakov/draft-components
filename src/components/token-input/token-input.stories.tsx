import { type Meta, type StoryFn } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { TokenInput } from './token-input.js';

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
  const [{ tokens }, updateArgs] = useArgs();

  return (
    <TokenInput
      {...args}
      tokens={tokens}
      onChange={(tokens) => {
        updateArgs({ tokens });
        if (typeof args.onChange === 'function') {
          args.onChange(tokens);
        }
      }}
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
