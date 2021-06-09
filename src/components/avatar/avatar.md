```jsx padded
import { Avatar } from '../avatar';

const src = `https://images.unsplash.com/photo-1528359645462-5ff224bf906e?ixlib=rb-1.2.1&fit=crop&crop=focalpoint&fp-x=.550&fp-y=.35&fp-z=2.4&w=120&h=120`;

<>
  <Avatar src={src} size="xs" />
  <Avatar src={src} size="sm" />
  <Avatar src={src} />
  <Avatar src={src} size="lg" />
  <Avatar src={src} size="xl" />
</>;
```

With initials

```jsx padded
import { Avatar } from '../avatar';

const initials = 'DC';

<>
  <Avatar size="xs" initials={initials} />
  <Avatar size="sm" initials={initials} />
  <Avatar initials={initials} />
  <Avatar size="lg" initials={initials} />
  <Avatar size="xl" initials={initials} />
</>;
```

Rounded

```jsx padded
import { Avatar } from '../avatar';

const src = `https://images.unsplash.com/photo-1494256997604-768d1f608cac?ixlib=rb-1.2.1&fit=crop&crop=focalpoint&fp-x=.535&fp-y=.50&fp-z=2&w=120&h=120`;

<>
  <Avatar src={src} size="xs" isRounded={true} />
  <Avatar src={src} size="sm" isRounded={true} />
  <Avatar src={src} isRounded={true} />
  <Avatar src={src} size="lg" isRounded={true} />
  <Avatar src={src} size="xl" isRounded={true} />
</>;
```

With the placeholder

```jsx padded
import { Avatar } from '../avatar';

<>
  <Avatar size="xs" isRounded={true} />
  <Avatar size="sm" isRounded={true} />
  <Avatar isRounded={true} />
  <Avatar size="lg" isRounded={true} />
  <Avatar size="xl" isRounded={true} />
</>;
```

Different colors

```jsx padded
import { Avatar } from '../avatar';

const initials = 'DC';

<>
  <Avatar initials={initials} isRounded={true} />
  <Avatar fillColor="blue" initials={initials} isRounded={true} />
  <Avatar fillColor="cyan" initials={initials} isRounded={true} />
  <Avatar fillColor="red" initials={initials} isRounded={true} />
  <Avatar fillColor="green" initials={initials} isRounded={true} />
  <Avatar fillColor="lime" initials={initials} isRounded={true} />
  <Avatar fillColor="indigo" initials={initials} isRounded={true} />
  <Avatar fillColor="yellow" initials={initials} isRounded={true} />
  <Avatar fillColor="orange" initials={initials} isRounded={true} />
</>;
```
