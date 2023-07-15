import { Meta, StoryFn } from '@storybook/react';
import { StorySection } from '../../storybook/story-section';
import { TextInput, TextInputWidth } from './text-input';

const meta: Meta<typeof TextInput> = {
  title: 'Forms/TextInput',
  component: TextInput,
  args: {
    disabled: false,
    hasError: false,
    isBlock: false,
    type: 'text',
    size: 'md',
    leftAddOn: '',
    rightAddOn: '',
  },
  argTypes: {
    leftAddOn: {
      control: { type: 'text' },
    },
    rightAddOn: {
      control: { type: 'text' },
    },
    onChangeValue: {
      action: 'value changed',
    },
  },
};
export default meta;

export const Basic: StoryFn<typeof TextInput> = (args) => (
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

export const LeftAddOn = Basic.bind({});
LeftAddOn.storyName = 'Left Add-on';
LeftAddOn.args = {
  placeholder: '0.00',
  width: '4ch',
  leftAddOn: '€',
};

export const RightAddOn = Basic.bind({});
RightAddOn.storyName = 'Right Add-on';
RightAddOn.args = {
  placeholder: '0.00',
  width: '4ch',
  rightAddOn: 'kg',
};

export const LeftAndRightAddOn = Basic.bind({});
LeftAndRightAddOn.storyName = 'Left and Right Add-on';
LeftAndRightAddOn.args = {
  placeholder: '0.00',
  width: '4ch',
  leftAddOn: '$',
  rightAddOn: 'per item',
};

export const CustomAddOn = Basic.bind({});
CustomAddOn.storyName = 'Custom Add-on';
CustomAddOn.args = {
  placeholder: '0.00',
  width: '4ch',
  rightAddOn: ({ className }) => (
    <div
      className={className}
      style={{
        paddingLeft: 8,
        borderLeft: '1px solid var(--dc-input-border-color)',
        background: 'var(--dc-bg-transparent-1)',
      }}
    >
      kg
    </div>
  ),
};

export const Widths: StoryFn<typeof TextInput> = (args) => {
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
  return (
    <>
      {widths.map((width) => {
        const label = labels[width];
        return (
          <StorySection key={width} heading={label}>
            <TextInput {...args} width={width} aria-label={label} />
          </StorySection>
        );
      })}
    </>
  );
};
Widths.parameters = {
  controls: {
    exclude: ['width'],
  },
};
Widths.args = {};

export const WithIcon: StoryFn<typeof TextInput> = (args) => {
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
      <TextInput {...args} leftAddOn={envelope} />
      <TextInput {...args} rightAddOn={envelope} />
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
