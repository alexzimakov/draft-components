import { type CSSProperties } from 'react';
import { type Meta, type StoryFn } from '@storybook/react';
import { Button, type ButtonProps, type ButtonSize, type ButtonStyle, type ButtonTint } from './button.js';
import { IconButton } from './icon-button.js';
import { StorySection } from '../../storybook/story-section.js';
import { MoonIcon } from '@heroicons/react/24/solid';
import { BuildingOffice2Icon, ChatBubbleOvalLeftIcon, MagnifyingGlassIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';

const meta: Meta<typeof Button> = {
  title: 'Button',
  component: Button,
  args: {
    buttonStyle: 'filled',
    size: 'sm',
    tint: 'gray',
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
  children: 'Message',
  iconLeft: <ChatBubbleOvalLeftIcon height="1.25em" />,
};

export const IconRight = Basic.bind({});
IconRight.storyName = 'Icon right';
IconRight.args = {
  children: 'Focus',
  iconRight: <MoonIcon height="1.25em" />,
};

export const WithCaption = Basic.bind({});
WithCaption.storyName = 'With caption';
WithCaption.args = {
  children: 'Buy now',
  caption: 'Total $59.00',
  iconLeft: <ShoppingBagIcon height="1.25em" />,
};

export const Sizes = (args: ButtonProps) => {
  const sizes: ButtonSize[] = ['xs', 'sm', 'md', 'lg', 'xl'];
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        gap: '1rem',
      }}
    >
      {sizes.map((size) => <Button {...args} key={size} size={size} />)}
    </div>
  );
};
Sizes.parameters = {
  controls: {
    exclude: ['size', 'renderAs'],
  },
};
Sizes.args = {
  children: 'New organization',
  iconRight: <BuildingOffice2Icon height="1.25em" />,
};

export const ButtonStyles = (args: ButtonProps) => {
  const buttonStyles: ButtonStyle[] = [
    'filled',
    'tinted',
    'plain',
  ];
  const tints: ButtonTint[] = [
    'gray',
    'blue',
    'red',
    'green',
  ];
  const rowStyle: CSSProperties = {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    gap: '1rem',
  };
  return buttonStyles.map((buttonStyle, index) => (
    <StorySection
      key={buttonStyle}
      title={buttonStyle}
      style={{ paddingTop: index === 0 ? 0 : 16 }}
    >
      <div style={rowStyle}>
        {tints.map((tint) => (
          <Button
            {...args}
            key={`${buttonStyle}-${tint}`}
            buttonStyle={buttonStyle}
            tint={tint}
          />
        ))}
      </div>
    </StorySection>
  ));
};
ButtonStyles.storyName = 'Button styles';
ButtonStyles.parameters = {
  controls: {
    exclude: ['buttonStyle', 'tint', 'renderAs'],
  },
};
ButtonStyles.args = {
  children: 'Do not disturb',
  iconLeft: <MoonIcon height="1.25em" />,
};

export const IconOnlyButton: StoryFn<typeof IconButton> = (args) => (
  <IconButton {...args} />
);
IconOnlyButton.storyName = 'Icon only button';
IconOnlyButton.parameters = {
  controls: {
    exclude: ['iconLeft', 'iconRight'],
  },
};
IconOnlyButton.args = {
  children: <MagnifyingGlassIcon height="1.25em" />,
};
