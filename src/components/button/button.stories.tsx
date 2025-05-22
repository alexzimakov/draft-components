import { type ComponentProps } from 'react';
import { type Meta, type StoryFn } from '@storybook/react';
import { Button, type ButtonProps } from './button.js';
import { IconButton } from './icon-button.js';

const meta: Meta<typeof Button> = {
  title: 'Button',
  component: Button,
  args: {
    buttonStyle: 'filled',
    size: 'sm',
  },
  argTypes: {
    size: {
      control: 'radio',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    caption: {
      control: { type: 'text' },
    },
    iconLeft: {
      control: { disable: true },
    },
    iconRight: {
      control: { disable: true },
    },
    renderAs: {
      control: { disable: true },
    },
  },
};
export default meta;

export const Basic: StoryFn<typeof Button> = (args) => (
  <Button {...args} />
);
Basic.args = {
  children: 'Create account',
};

export const Loading = Basic.bind({});
Loading.args = {
  children: 'Saving...',
  loading: true,
};

export const Disabled = Basic.bind({});
Disabled.args = {
  children: 'Delete',
  disabled: true,
};

export const LeftIcon = Basic.bind({});
LeftIcon.storyName = 'Icon left';
LeftIcon.args = {
  children: 'Archive',
  iconLeft: <ArchiveBoxIcon width="1.25em" height="1.25em" />,
};

export const IconRight = Basic.bind({});
IconRight.storyName = 'Icon right';
IconRight.args = {
  children: 'Archive',
  iconRight: <ArchiveBoxIcon width="1.25em" height="1.25em" />,
};

export const WithCaption = Basic.bind({});
WithCaption.storyName = 'With caption';
WithCaption.args = {
  children: 'Buy now',
  caption: 'Total $59.00',
  iconLeft: <ShoppingBagIcon width="1.25em" height="1.25em" />,
};

export const Sizes = (args: ButtonProps) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: 'auto 1fr',
      alignItems: 'center',
      justifyItems: 'start',
      gap: 16,
    }}
  >
    <code>xs</code> <Button {...args} size="xs" />
    <code>sm</code> <Button {...args} size="sm" />
    <code>md</code> <Button {...args} size="md" />
    <code>lg</code> <Button {...args} size="lg" />
    <code>xl</code> <Button {...args} size="xl" />
  </div>
);
Sizes.parameters = {
  controls: {
    exclude: ['size'],
  },
};
Sizes.args = {
  children: 'Archive',
  iconLeft: <ArchiveBoxIcon width="1.25em" height="1.25em" />,
};

export const Styles = (args: ButtonProps) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: 'auto 1fr',
      alignItems: 'center',
      justifyItems: 'start',
      gap: 16,
    }}
  >
    <code>filled</code> <Button {...args} buttonStyle="filled" />
    <code>tinted</code> <Button {...args} buttonStyle="tinted" />
    <code>plain</code> <Button {...args} buttonStyle="plain" />
  </div>
);
Styles.parameters = {
  controls: {
    exclude: ['buttonStyle'],
  },
};
Styles.args = {
  children: 'Archive',
  iconLeft: <ArchiveBoxIcon width="1.15em" height="1.15em" />,
};

export const Tints = (args: ButtonProps) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: 'auto 1fr',
      alignItems: 'center',
      justifyItems: 'start',
      gap: 16,
    }}
  >
    <code>light</code> <Button {...args} tint="light" />
    <code>dark</code> <Button {...args} tint="dark" />
    <code>sky</code> <Button {...args} tint="sky" />
    <code>blue</code> <Button {...args} tint="blue" />
    <code>indigo</code> <Button {...args} tint="indigo" />
    <code>rose</code> <Button {...args} tint="rose" />
    <code>red</code> <Button {...args} tint="red" />
    <code>orange</code> <Button {...args} tint="orange" />
    <code>yellow</code> <Button {...args} tint="yellow" />
    <code>lime</code> <Button {...args} tint="lime" />
    <code>green</code> <Button {...args} tint="green" />
  </div>
);
Tints.parameters = {
  controls: {
    exclude: ['tint'],
  },
};
Tints.args = {
  children: 'Submit',
};

export const IconOnly: StoryFn<typeof IconButton> = (args) => (
  <IconButton {...args} />
);
IconOnly.parameters = {
  controls: {
    exclude: ['iconLeft', 'iconRight'],
  },
};
IconOnly.args = {
  children: <ArchiveBoxIcon width="1.25em" height="1.25em" />,
};

function ArchiveBoxIcon(props: ComponentProps<'svg'>) {
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
      <path strokeLinecap="round" strokeLinejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
    </svg>
  );
}

function ShoppingBagIcon(props: ComponentProps<'svg'>) {
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
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
    </svg>
  );
}
