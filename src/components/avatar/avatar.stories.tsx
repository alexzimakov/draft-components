import { type ComponentMeta, type ComponentStory } from '@storybook/react';
import { Avatar } from './avatar';

export default {
  title: 'Avatar',
  component: Avatar,
  argTypes: {
    placeholder: {
      control: 'text',
    },
  },
  args: {
    size: 'lg',
    fill: 'gray',
    isSquare: false,
    hasInnerShadow: false,
    src: '',
    alt: '',
    placeholder: '',
  },
} as ComponentMeta<typeof Avatar>;

const images = {
  portraitOfMan: {
    // https://unsplash.com/photos/L9au-ZOs8WU
    src: 'https://images.unsplash.com/photo-1583934555852-537536e49071?ixlib=rb-1.2.1&fit=facearea&facepad=2.5&w=160&h=160',
    alt: 'Portrait of a Man. Date: 1648',
  },
  portraitOfOscarWilde: {
    // https://unsplash.com/photos/QbcupDQ9_L4
    src: 'https://images.unsplash.com/photo-1656336474827-b06115ca3994?ixlib=rb-1.2.1&fit=facearea&facepad=2&w=160&h=160',
    alt: 'Portrait of Oscar Wilde',
  },
};

export const Basic: ComponentStory<typeof Avatar> = (args, context) => {
  let src = args.src;
  let alt = args.alt;
  if (!src) {
    if (context.globals.theme === 'dark') {
      src = images.portraitOfMan.src;
      alt = images.portraitOfMan.alt;
    } else {
      src = images.portraitOfOscarWilde.src;
      alt = images.portraitOfOscarWilde.alt;
    }
  }
  return <Avatar {...args} src={src} alt={alt} />;
};
Basic.args = {};

export const Square = Basic.bind({});
Square.args = {
  isSquare: true,
};

export const Sizes: ComponentStory<typeof Avatar> = (args) => (
  <div style={{ display: 'flex', alignItems: 'flex-end', gap: 24 }}>
    <Avatar {...args} size="xs" />
    <Avatar {...args} size="sm" />
    <Avatar {...args} size="md" />
    <Avatar {...args} size="lg" />
    <Avatar {...args} size="xl" />
  </div>
);
Sizes.argTypes = {
  size: {
    control: { disable: true },
  },
};
Sizes.args = {
  src: images.portraitOfOscarWilde.src,
  alt: images.portraitOfOscarWilde.alt,
};

export const WithPlaceholder: ComponentStory<typeof Avatar> = (args) => (
  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20 }}>
    <Avatar {...args} fill="gray" />
    <Avatar {...args} fill="pink" />
    <Avatar {...args} fill="red" />
    <Avatar {...args} fill="orange" />
    <Avatar {...args} fill="yellow" />
    <Avatar {...args} fill="green" />
    <Avatar {...args} fill="blue" />
    <Avatar {...args} fill="violet" />
  </div>
);
WithPlaceholder.argTypes = {
  fill: {
    control: { disable: true },
  },
};
WithPlaceholder.args = {
  size: 'lg',
  placeholder: 'AR',
};
