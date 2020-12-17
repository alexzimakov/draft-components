```jsx padded
<IconButton size="xs" icon="close" />
<IconButton size="sm" icon="close" />
<IconButton icon="close" />
<IconButton size="lg" icon="close" />
```

Rounded:

```jsx padded
<>
  <IconButton size="xs" isRounded={true} icon="minus" appearance="danger" />
  <IconButton size="sm" isRounded={true} icon="minus" appearance="danger" />
  <IconButton isRounded={true} icon="minus" appearance="danger" />
  <IconButton size="lg" isRounded={true} icon="minus" appearance="danger" />
</>
```

With the custom icon:

```jsx padded
const shareIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    focusable={false}
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width={2}
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <polyline points="20 12 20 22 4 22 4 12" />
    <rect x="2" y="7" width="20" height="5" />
    <line x1="12" y1="22" x2="12" y2="7" />
    <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
    <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
  </svg>
);

<>
  <IconButton size="xs" icon={shareIcon} appearance="minimal" />
  <IconButton size="sm" icon={shareIcon} appearance="minimal" />
  <IconButton icon={shareIcon} appearance="minimal" />
  <IconButton size="lg" icon={shareIcon} appearance="minimal" />
</>;
```
