Default

```jsx padded
<Button size="xs">Button text</Button>
<Button size="sm">Button text</Button>
<Button>Button text</Button>
<Button size="lg">Button text</Button>
```

Primary button

```jsx padded
<Button size="xs" appearance="primary">Button text</Button>
<Button size="sm" appearance="primary">Button text</Button>
<Button appearance="primary">Button text</Button>
<Button size="lg" appearance="primary">Button text</Button>
```

Danger button

```jsx padded
<Button size="xs" appearance="danger">Button text</Button>
<Button size="sm" appearance="danger">Button text</Button>
<Button appearance="danger">Button text</Button>
<Button size="lg" appearance="danger">Button text</Button>
```

Success button

```jsx padded
<Button size="xs" appearance="success">Button text</Button>
<Button size="sm" appearance="success">Button text</Button>
<Button appearance="success">Button text</Button>
<Button size="lg" appearance="success">Button text</Button>
```

Minimal button

```jsx padded
<Button size="xs" appearance="minimal">Button text</Button>
<Button size="sm" appearance="minimal">Button text</Button>
<Button appearance="minimal">Button text</Button>
<Button size="lg" appearance="minimal">Button text</Button>
```

With leading icon

```jsx padded
const icon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 0 24 24"
    stroke="currentColor"
    width="1em"
    height="1em"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
    />
  </svg>
);

<>
  <Button size="xs" leadingIcon={icon}>
    Button text
  </Button>
  <Button size="sm" leadingIcon={icon}>
    Button text
  </Button>
  <Button leadingIcon={icon}>Button text</Button>
  <Button size="lg" leadingIcon={icon}>
    Button text
  </Button>
</>;
```

With trailing icon

```jsx padded
const icon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    width="1em"
    height="1em"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
    />
  </svg>
);

<>
  <Button size="xs" trailingIcon={icon}>
    Button text
  </Button>
  <Button size="sm" trailingIcon={icon}>
    Button text
  </Button>
  <Button trailingIcon={icon}>Button text</Button>
  <Button size="lg" trailingIcon={icon}>
    Button text
  </Button>
</>;
```

Full width

```jsx
<Button hasFullWidth={true} size="lg" appearance="primary">
  Button text
</Button>
```

Loading state

```jsx padded
<Button size="xs" isLoading={true}>Button text</Button>
<Button size="sm" isLoading={true}>Button text</Button>
<Button isLoading={true}>Button text</Button>
<Button size="lg" isLoading={true}>Button text</Button>
```

Disabled state

```jsx padded
<Button disabled={true}>Button text</Button>
<Button disabled={true} appearance="primary">Button text</Button>
<Button disabled={true} appearance="danger">Button text</Button>
<Button disabled={true} appearance="success">Button text</Button>
<Button disabled={true} appearance="minimal">Button text</Button>
```
