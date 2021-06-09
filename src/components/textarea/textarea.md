```jsx stacked
import { Textarea } from '../textarea';

const props = {
  placeholder: 'Write a few sentences about yourself',
  spellCheck: false,
};
const Separator = () => <hr style={{ margin: '16px 0', border: 'none' }} />;

<>
  <Textarea {...props} size="sm" />
  <Separator />
  <Textarea {...props} size="md" />
  <Separator />
  <Textarea {...props} size="lg" />
</>;
```

Invalid state

```jsx
import { Textarea } from '../textarea';

<Textarea invalid={true} placeholder="Write a few sentences about yourself" />;
```

Disabled state

```jsx
import { Textarea } from '../textarea';

<Textarea disabled={true} placeholder="Write a few sentences about yourself" />;
```

Full width

```jsx
<Textarea fullWidth={true} placeholder="Write a few sentences about yourself" />
```
