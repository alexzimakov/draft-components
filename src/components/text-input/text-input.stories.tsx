import { type ComponentMeta, type ComponentStory } from '@storybook/react';
import { TextInput, type TextInputWidth } from './text-input';

export default {
  title: 'Forms/TextInput',
  component: TextInput,
  args: {
    disabled: false,
    hasError: false,
    isBlock: false,
    type: 'text',
    size: 'md',
    prefix: '',
    suffix: '',
  },
  argTypes: {
    prefix: {
      control: { type: 'text' },
    },
    suffix: {
      control: { type: 'text' },
    },
    onChangeValue: {
      action: 'value changed',
    },
  },
} as ComponentMeta<typeof TextInput>;

export const Basic: ComponentStory<typeof TextInput> = (args) => (
  <TextInput {...args} />
);
Basic.args = {
  placeholder: 'Basic input',
};

export const Disabled = Basic.bind({});
Disabled.args = {
  placeholder: 'Disabled input',
  disabled: true,
};

export const HasError = Basic.bind({});
HasError.args = {
  placeholder: 'Your email',
  defaultValue: 'you@examplecom',
  type: 'email',
  hasError: true,
};

export const FullWidth = Basic.bind({});
FullWidth.args = {
  placeholder: 'Full width input',
  isBlock: true,
};

export const Prefix = Basic.bind({});
Prefix.args = {
  placeholder: '0.00',
  width: '4ch',
  prefix: '€',
};

export const Suffix = Basic.bind({});
Suffix.args = {
  placeholder: '0.00',
  width: '4ch',
  suffix: 'kg',
};

export const PrefixAndSuffix = Basic.bind({});
PrefixAndSuffix.args = {
  placeholder: '0.00',
  width: '4ch',
  prefix: '$',
  suffix: 'per item',
};

export const Widths: ComponentStory<typeof TextInput> = (args) => {
  const widths: TextInputWidth[] = [
    '40ch',
    '20ch',
    '10ch',
    '5ch',
    '4ch',
    '3ch',
    '2ch',
  ];
  const labels: Record<TextInputWidth, string> = {
    '40ch': '40 character width',
    '20ch': '20 character width',
    '10ch': '10 character width',
    '5ch': '5 character width',
    '4ch': '4 character width',
    '3ch': '3 character width',
    '2ch': '2 character width',
  };
  const labelStyle = {
    fontFamily: 'var(--dc-font-sans)',
    marginBottom: '0.25rem',
  };
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
    }}>
      {widths.map((width) => (
        <div key={width}>
          <label style={labelStyle} htmlFor={width}>{labels[width]}</label>
          <br />
          <TextInput {...args} id={width} width={width} />
        </div>
      ))}
    </div>
  );
};
Widths.parameters = {
  controls: {
    exclude: ['width'],
  },
};
Widths.args = {};

export const WithIcon: ComponentStory<typeof TextInput> = (args) => {
  const envelope = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="1.35em"
      height="1.35em"
      fill="none"
      strokeWidth={1.5}
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
      />
    </svg>
  );
  return (
    <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      gap: '1rem',
    }}>
      <TextInput {...args} prefix={envelope} />
      <TextInput {...args} suffix={envelope} />
    </div>
  );
};
WithIcon.parameters = {
  controls: {
    exclude: ['prefix', 'suffix'],
  },
};
WithIcon.args = {
  placeholder: 'Your email',
};
