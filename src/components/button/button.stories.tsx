import { type ComponentPropsWithoutRef, type CSSProperties } from 'react';
import { type ComponentMeta, type ComponentStory } from '@storybook/react';
import {
  Button,
  type ButtonAppearance,
  type ButtonProps,
  type ButtonSize,
  type ButtonVariant,
} from './button';
import { IconButton } from './icon-button';

const icons = {
  BookOpen: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="1.25em"
      height="1.25em"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
      />
    </svg>
  ),
  ChatBubbleOvalLeft: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="1.25em"
      height="1.25em"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z"
      />
    </svg>
  ),
  Moon: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="1.25em"
      height="1.25em"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z"
      />
    </svg>
  ),
  MagnifyingGlass: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="1.25em"
      height="1.25em"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
      />
    </svg>
  ),
  ShoppingBag: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="1.25em"
      height="1.25em"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
      />
    </svg>
  ),
};

export default {
  title: 'Button',
  component: Button,
  argTypes: {
    icon: {
      options: ['No icon', ...Object.keys(icons)],
      mapping: { 'No icon': null, ...icons },
      defaultValue: 'No icon',
      control: {
        type: 'select',
        labels: {
          BookOpen: 'Book open',
          ChatBubbleOvalLeft: 'Chat bubble',
          MagnifyingGlass: 'Magnifying glass',
          ShoppingBag: 'Shopping bag',
        },
      },
    },
    caption: {
      control: 'text',
      defaultValue: '',
    },
  },
} as ComponentMeta<typeof Button>;

export const Basic: ComponentStory<typeof Button> = (args) => (
  <Button {...args} />
);
Basic.argTypes = {
  renderAs: {
    control: false,
  },
};
Basic.args = {
  children: 'Create account',
  size: 'sm',
  appearance: 'default',
  variant: 'filled',
  loading: false,
  disabled: false,
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

export const WithIcon = Basic.bind({});
WithIcon.args = {
  icon: 'ChatBubbleOvalLeft',
  children: 'Message',
};

export const WithCaption = Basic.bind({});
WithCaption.args = {
  icon: 'ShoppingBag',
  caption: 'Total $59.00',
  children: 'Buy now',
};

export const Sizes = (args: ButtonProps) => {
  const sizes: ButtonSize[] = ['xs', 'sm', 'md', 'lg', 'xl'];
  return (
    <Layout>
      {sizes.map((size) => <Button {...args} key={size} size={size} />)}
    </Layout>
  );
};
Sizes.parameters = {
  controls: {
    exclude: ['size', 'renderAs'],
  },
};
Sizes.args = {
  children: 'Read the docs',
  icon: 'BookOpen',
  variant: 'filled',
  appearance: 'default',
  loading: false,
  disabled: false,
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
    <Layout
      key={variant}
      caption={variant}
      style={{ marginTop: index !== 0 ? '2rem' : 0 }}
    >
      {appearances.map((appearance) => (
        <Button
          {...args}
          key={`${variant}-${appearance}`}
          appearance={appearance}
          variant={variant}
        />
      ))}
    </Layout>
  ));
};
Styles.parameters = {
  controls: {
    exclude: ['variant', 'appearance', 'renderAs'],
  },
};
Styles.args = {
  children: 'Do not disturb',
  icon: 'Moon',
  loading: false,
  disabled: false,
};

export const IconOnlyButton: ComponentStory<typeof IconButton> = (args) => (
  <IconButton {...args} />
);
IconOnlyButton.args = {
  icon: 'MagnifyingGlass',
};

type LayoutProps = ComponentPropsWithoutRef<'div'> & {
  caption?: string;
};

function Layout({ caption, children, ...props }: LayoutProps) {
  const captionStyle: CSSProperties = {
    fontFamily: 'var(--dc-font-sans)',
    fontSize: '0.875rem',
    fontWeight: 600,
    margin: '0 0 0.75rem',
  };
  const style: CSSProperties = {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    gap: '1rem',
  };
  return (
    <section {...props}>
      {caption && <h2 style={captionStyle}>{caption}</h2>}
      <div style={style}>
        {children}
      </div>
    </section>
  );
}
