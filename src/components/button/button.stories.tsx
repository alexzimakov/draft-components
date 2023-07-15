import { Meta, StoryFn } from '@storybook/react';
import { StorySection } from '../../storybook/story-section';
import { MoonIcon } from '@heroicons/react/24/solid';
import {
  BookOpenIcon,
  BuildingOffice2Icon,
  ChatBubbleLeftIcon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
} from '@heroicons/react/24/outline';
import { IconButton } from './icon-button';
import { Button, ButtonAppearance, ButtonProps, ButtonSize, ButtonVariant } from './button';

const Icons = {
  BookOpen: (
    <BookOpenIcon aria-hidden={true} width="1.25em" height="1.25em" />
  ),
  ChatBubbleOvalLeft: (
    <ChatBubbleLeftIcon aria-hidden={true} width="1.25em" height="1.25em" />
  ),
  Moon: (
    <MoonIcon aria-hidden={true} width="1.25em" height="1.25em" />
  ),
  MagnifyingGlass: (
    <MagnifyingGlassIcon aria-hidden={true} width="1.25em" height="1.25em" />
  ),
  ShoppingBag: (
    <ShoppingBagIcon aria-hidden={true} width="1.25em" height="1.25em" />
  ),
  BuildingOffice2: (
    <BuildingOffice2Icon aria-hidden={true} width="1.25em" height="1.25em" />
  ),
};

const meta: Meta<typeof Button> = {
  title: 'Button',
  component: Button,
  args: {
    appearance: 'default',
    variant: 'filled',
    size: 'sm',
    loading: false,
    disabled: false,
  },
  argTypes: {
    leftIcon: {
      control: { disable: true },
    },
    rightIcon: {
      control: { disable: true },
    },
    caption: {
      control: 'text',
      defaultValue: '',
    },
  },
};
export default meta;

export const Basic: StoryFn<typeof Button> = (args) => (
  <Button {...args} />
);
Basic.argTypes = {
  renderAs: {
    control: false,
  },
};
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

export const WithLeftIcon = Basic.bind({});
WithLeftIcon.args = {
  leftIcon: Icons.ChatBubbleOvalLeft,
  children: 'Message',
};

export const WithRightIcon = Basic.bind({});
WithRightIcon.args = {
  rightIcon: Icons.Moon,
  children: 'Focus',
};

export const WithCaption = Basic.bind({});
WithCaption.args = {
  leftIcon: Icons.ShoppingBag,
  caption: 'Total $59.00',
  children: 'Buy now',
};

export const Sizes = (args: ButtonProps) => {
  const sizes: ButtonSize[] = ['xs', 'sm', 'md', 'lg', 'xl'];
  return (
    <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'flex-start',
      gap: '1rem',
    }}>
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
  rightIcon: Icons.BuildingOffice2,
};

export const Styles = (args: ButtonProps) => {
  const variants: ButtonVariant[] = [
    'filled',
    'tinted',
    'plain',
  ];
  const appearances: ButtonAppearance[] = [
    'default',
    'primary',
    'danger',
    'success',
  ];
  return variants.map((variant, index) => (
    <StorySection
      key={variant}
      heading={variant}
      style={{ paddingTop: index === 0 ? 0 : 16 }}
    >
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        gap: '1rem',
      }}>
        {appearances.map((appearance) => (
          <Button
            {...args}
            key={`${variant}-${appearance}`}
            appearance={appearance}
            variant={variant}
          />
        ))}
      </div>
    </StorySection>
  ));
};
Styles.parameters = {
  controls: {
    exclude: ['variant', 'appearance', 'renderAs'],
  },
};
Styles.args = {
  children: 'Do not disturb',
  leftIcon: Icons.Moon,
};

export const IconOnlyButton: StoryFn<typeof IconButton> = (args) => (
  <IconButton {...args} />
);
IconOnlyButton.args = {
  icon: Icons.MagnifyingGlass,
};
