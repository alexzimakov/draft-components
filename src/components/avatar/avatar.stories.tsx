import { type Meta, type StoryFn } from '@storybook/react';
import { Avatar } from './avatar.js';

const meta: Meta<typeof Avatar> = {
  title: 'Avatar',
  component: Avatar,
  argTypes: {
    monogram: {
      control: 'text',
    },
  },
  args: {
    size: 'lg',
    fill: 'gray',
  },
};
export default meta;

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

export const Basic: StoryFn<typeof Avatar> = (args, context) => {
  let src = args.src;
  let altText = args.altText;
  if (!src) {
    if (context.globals.theme === 'dark') {
      src = images.portraitOfMan.src;
      altText = images.portraitOfMan.alt;
    } else {
      src = images.portraitOfOscarWilde.src;
      altText = images.portraitOfOscarWilde.alt;
    }
  }
  return <Avatar {...args} src={src} altText={altText} />;
};
Basic.args = {};

export const Square = Basic.bind({});
Square.args = {
  square: true,
};

export const Sizes: StoryFn<typeof Avatar> = (args) => (
  <div style={{ display: 'flex', alignItems: 'flex-end', gap: 24 }}>
    <Avatar {...args} size="xs" />
    <Avatar {...args} size="sm" />
    <Avatar {...args} size="md" />
    <Avatar {...args} size="lg" />
    <Avatar {...args} size="xl" />
  </div>
);
Sizes.parameters = {
  controls: {
    exclude: ['size'],
  },
};
Sizes.args = {
  src: images.portraitOfOscarWilde.src,
  altText: images.portraitOfOscarWilde.alt,
};

export const Fills: StoryFn<typeof Avatar> = (args) => (
  <div
    style={{
      display: 'flex',
      flexWrap: 'wrap',
      gap: 20,
    }}
  >
    <Avatar {...args} fill="gray" />
    <Avatar {...args} fill="pink" />
    <Avatar {...args} fill="red" />
    <Avatar {...args} fill="orange" />
    <Avatar {...args} fill="yellow" />
    <Avatar {...args} fill="green" />
    <Avatar {...args} fill="teal" />
    <Avatar {...args} fill="blue" />
    <Avatar {...args} fill="indigo" />
    <Avatar {...args} fill="violet" />
  </div>
);
Fills.parameters = {
  controls: {
    exclude: ['fill'],
  },
};
Fills.args = {
  size: 'md',
  monogram: 'AR',
};
