```jsx padded
import { Avatar } from '../avatar';

const src = `https://images.unsplash.com/photo-1570987374002-0bc59bf40c8b?fit=crop&crop=focalpoint&w=120&h=120&fp-y=.45&fp-z=1.5`;

<>
  <Avatar src={src} size="xs" />
  <Avatar src={src} size="sm" />
  <Avatar src={src} size="md" />
  <Avatar src={src} size="lg" />
  <Avatar src={src} size="xl" />
</>;
```

With initials

```jsx padded
import { Avatar } from '../avatar';

const initials = Avatar.makeInitials('draft components');

<>
  <Avatar size="xs" initials={initials} />
  <Avatar size="sm" initials={initials} />
  <Avatar size="md" initials={initials} />
  <Avatar size="lg" initials={initials} />
  <Avatar size="xl" initials={initials} />
</>;
```

Square

```jsx padded
import { Avatar } from '../avatar';

const src = `https://images.unsplash.com/photo-1524303676975-5989d34c6854?fit=crop&crop=focalpoint&w=120&h=120&fp-y=.5&fp-z=1`;

<>
  <Avatar src={src} size="xs" square={true} />
  <Avatar src={src} size="sm" square={true} />
  <Avatar src={src} size="md" square={true} />
  <Avatar src={src} size="lg" square={true} />
  <Avatar src={src} size="xl" square={true} />
</>;
```

Fallback image

```jsx padded
import { Avatar } from '../avatar';

<>
  <Avatar size="xs" />
  <Avatar size="sm" />
  <Avatar size="md" />
  <Avatar size="lg" />
  <Avatar size="xl" />
</>;
```

Different colors

```jsx padded
import { Avatar } from '../avatar';

<>
  <Avatar tint="gray" initials={Avatar.makeInitials('gray')} />
  <Avatar tint="blue" initials={Avatar.makeInitials('blue')} />
  <Avatar tint="cyan" initials={Avatar.makeInitials('cyan')} />
  <Avatar tint="red" initials={Avatar.makeInitials('red')} />
  <Avatar tint="green" initials={Avatar.makeInitials('green')} />
  <Avatar tint="lime" initials={Avatar.makeInitials('lime')} />
  <Avatar tint="indigo" initials={Avatar.makeInitials('indigo')} />
  <Avatar tint="yellow" initials={Avatar.makeInitials('yellow')} />
  <Avatar tint="orange" initials={Avatar.makeInitials('orange')} />
  <Avatar tint="pink" initials={Avatar.makeInitials('pink')} />
</>;
```

With icon

```jsx padded
import { Avatar } from '../avatar';
import { SvgIcon } from '../svg-icon';
import { starFill } from '../../icons/star-fill';
import { dropletFill } from '../../icons/droplet-fill';

<>
  <Avatar
    src="https://images.unsplash.com/photo-1570987374002-0bc59bf40c8b?fit=crop&crop=focalpoint&w=120&h=120&fp-y=.45&fp-z=1.5"
    alt="John Doe profile image"
    icon={<SvgIcon icon={starFill} />}
    iconTint="green"
  />
  <Avatar
    square={true}
    src="https://images.unsplash.com/photo-1524303676975-5989d34c6854?fit=crop&crop=focalpoint&w=120&h=120&fp-y=.5&fp-z=1"
    icon={<SvgIcon icon={dropletFill} />}
    iconTint="orange"
  />
</>;
```

Avatar group

```jsx padded
import { Avatar } from '../avatar';

const items = [
  {
    src: `https://images.unsplash.com/photo-1570987374002-0bc59bf40c8b?fit=crop&crop=focalpoint&w=120&h=120&fp-y=.45&fp-z=1.5`,
    initials: Avatar.makeInitials('Clever Wilson'),
    tint: 'green',
  },
  {
    src: `https://images.unsplash.com/photo-1524303676975-5989d34c6854?fit=crop&crop=focalpoint&w=120&h=120&fp-y=.5&fp-z=1`,
    initials: Avatar.makeInitials('Pink flower'),
  },
  {
    src: '',
    initials: Avatar.makeInitials('Empty src'),
    tint: 'indigo',
  },
];

<>
  <Avatar.Group items={items} />
  <Avatar.Group items={items} square={true} />
</>;
```
