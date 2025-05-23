import { type Meta, type StoryFn } from '@storybook/react';
import { type CSSProperties } from 'react';
import { TextInput } from './text-input.js';
import { Button } from '../button/index.js';

const meta: Meta<typeof TextInput> = {
  title: 'Forms/TextInput',
  component: TextInput,
  args: {
    size: 'md',
    type: 'text',
    slotStyle: 'plain',
    textAlign: 'left',
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

export const Invalid = Basic.bind({});
Invalid.args = {
  placeholder: 'Your email',
  defaultValue: 'not an email',
  type: 'email',
  invalid: true,
};

export const FullWidth = Basic.bind({});
FullWidth.args = {
  placeholder: 'Full width input',
  fullWidth: true,
};

export const SlotLeft = Basic.bind({});
SlotLeft.args = {
  placeholder: '0.00',
  sizeInChars: 4,
  slotLeft: '€',
};

export const SlotRight = Basic.bind({});
SlotRight.args = {
  placeholder: '0.00',
  sizeInChars: 4,
  slotRight: 'kg',
};

export const BothSlots = Basic.bind({});
BothSlots.args = {
  placeholder: '0.00',
  sizeInChars: 4,
  slotLeft: '$',
  slotRight: 'per item',
};

export const IconLeft = Basic.bind({});
IconLeft.args = {
  placeholder: 'Search (⌘K)',
  slotLeft: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={16}
      height={16}
      stroke="currentColor"
      strokeWidth={1.5}
      fill="none"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
      />
    </svg>
  ),
};

export const IconRight = Basic.bind({});
IconRight.args = {
  placeholder: 'Pick a date',
  slotRight: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={16}
      height={16}
      stroke="currentColor"
      strokeWidth={1.5}
      fill="none"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
      />
    </svg>
  ),
};

export const SlotCustomRenderer = Basic.bind({});
SlotCustomRenderer.args = {
  type: 'password',
  defaultValue: 'Qwerty123',
  slotRight: () => {
    const wrapperStyle: CSSProperties = {
      display: 'inline-flex',
      boxSizing: 'border-box',
      alignItems: 'center',
      justifyContent: 'center',
      paddingLeft: 5,
      paddingRight: 5,
    } as CSSProperties;
    const buttonStyle: CSSProperties = {
      height: 24,
      borderRadius: 4,
    };
    return (
      <div style={wrapperStyle}>
        <Button size="xs" style={buttonStyle}>
          Show
        </Button>
      </div>
    );
  },
};

export const SizeInChars: StoryFn<typeof TextInput> = (args) => {
  const sizes = [40, 20, 10, 5, 4, 3, 2];
  const labels: Record<number, string> = {
    40: '40 characters',
    20: '20 characters',
    10: '10 characters',
    5: '5 characters',
    4: '4 characters',
    3: '3 characters',
    2: '2 characters',
  };
  return (
    <div
      style={{
        display: 'grid',
        gap: 16,
      }}
    >
      {sizes.map((size) => {
        const label = labels[size];
        return (
          <div key={size}>
            <code style={{ display: 'block', marginBottom: 4 }}>{label}</code>
            <TextInput {...args} sizeInChars={size} aria-label={label} />
          </div>
        );
      })}
    </div>
  );
};
SizeInChars.parameters = {
  controls: {
    exclude: ['width'],
  },
};
SizeInChars.args = {};
