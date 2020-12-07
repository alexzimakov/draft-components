```jsx padded
<TextField size="sm" placeholder="Small text field..." />
<TextField placeholder="Default text field..." />
<TextField size="lg" placeholder="Large text field..." />
```

With leading add-on:

```jsx padded
const iconMail = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    width="1.2em"
    height="1.2em"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    />
  </svg>
);

<>
  <TextField leadingAddOn="https://" placeholder="www.example.com" />
  <TextField leadingAddOn={iconMail} placeholder="you@example.com" />
</>;
```

With trailing add-on:

```jsx padded
const iconCalendar = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    width="1.2em"
    height="1.2em"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
    />
  </svg>
);

<>
  <TextField trailingAddOn=".com" placeholder="https://www.example" />
  <TextField trailingAddOn={iconCalendar} placeholder="https://www.example" />
</>;
```

Invalid state:

```jsx
<TextField isInvalid={true} placeholder="Invalid text field..." />
```

Disabled state:

```jsx padded
<TextField leadingAddOn="https://" defaultValue="www.example.com" disabled={true} />
<TextField disabled={true} placeholder="Disabled text field..." />
```

Full width:

```jsx
<TextField
  size="lg"
  hasFullWidth={true}
  placeholder="Search or enter address"
/>
```
