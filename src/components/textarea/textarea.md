```jsx stacked
const props = {
  placeholder: 'Write a few sentences about yourself',
  defaultValue:
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur distinctio fugit iure quibusdam repellendus. Aliquam blanditiis commodi consectetur, dicta, eveniet fuga hic illum impedit nostrum omnis quidem quo rem sapiente.',
  spellCheck: false,
};
const hrStyle = {
  margin: '16px 0',
  border: 'none',
};
const Separator = () => <hr style={{ margin: '16px 0', border: 'none' }} />;

<>
  <Textarea {...props} size="sm" />
  <Separator />
  <Textarea {...props} />
  <Separator />
  <Textarea {...props} size="lg" />
</>;
```

Invalid state:

```jsx
<Textarea placeholder="Write a few sentences about yourself" isInvalid={true} />
```

Disabled state:

```jsx
<Textarea placeholder="Write a few sentences about yourself" disabled={true} />
```

Full width:

```jsx
<Textarea
  placeholder="Write a few sentences about yourself"
  hasFullWidth={true}
/>
```
