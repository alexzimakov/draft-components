import { type ComponentMeta, type ComponentStory } from '@storybook/react';
import { AvatarGroup } from './avatar-group';
import { Avatar } from '../avatar';

export default {
  title: 'AvatarGroup',
  component: AvatarGroup,
  subcomponents: {
    Avatar,
  },
} as ComponentMeta<typeof AvatarGroup>;

const urls = [
  'https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?ixlib=rb-1.2.1&fit=facearea&facepad=2.5&w=160&h=160',
  'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-1.2.1&fit=facearea&facepad=2.5&w=160&h=160',
  'https://images.unsplash.com/photo-1649123245135-4db6ead931b5?ixlib=rb-1.2.1&fit=facearea&facepad=2.5&w=160&h=160',
  'https://images.unsplash.com/photo-1610431205421-739e027cc0ce?ixlib=rb-1.2.1&fit=facearea&facepad=2&w=160&h=160',
];

export const Basic: ComponentStory<typeof AvatarGroup> = (args) => (
  <AvatarGroup {...args}>
    {urls.map((url, index) => (
      <Avatar key={`avatar-${index}`} src={url} />
    ))}
  </AvatarGroup>
);

export const Square: ComponentStory<typeof AvatarGroup> = (args) => (
  <AvatarGroup {...args}>
    {urls.map((url, index) => (
      <Avatar key={`avatar-${index}`} src={url} isSquare={true} />
    ))}
  </AvatarGroup>
);