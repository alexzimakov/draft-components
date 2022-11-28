```jsx
import { TextInput } from '../text-input';
import { FormField } from '../form-field';

const [value, setValue] = React.useState('');
const [error, setError] = React.useState('');

<FormField
  label="Username"
  labelFor="fieldGroupExample"
  caption="You can use letters, numbers & periods"
  required={true}
  error={error}
>
  <TextInput
    id="fieldGroupExample"
    invalid={!!error}
    value={value}
    onChange={(event) => setValue(event.target.value)}
    onBlur={() => {
      setError(
        /^[a-z0-9.]*$/.test(value)
          ? ''
          : `Only letters (a-z), numbers (0-9), and periods (.) are allowed`
      );
    }}
  />
</FormField>;
```

Children as function

```jsx
import { TextInput } from '../text-input';
import { FormField } from '../form-field';

const [value, setValue] = React.useState('');
const [error, setError] = React.useState('');

<FormField
  label="Username"
  caption="You can use letters, numbers & periods"
  required={true}
  error={error}
>
  {({
    id,
    invalid,
    required
  }) => (
    <TextInput
      id={id}
      required={required}
      invalid={invalid}
      value={value}
      onChange={(event) => setValue(event.target.value)}
      onBlur={() => {
        setError(
          /^[a-z0-9.]*$/.test(value)
            ? ''
            : `Only letters (a-z), numbers (0-9), and periods (.) are allowed`
        );
      }}
    />
  )}
</FormField>;
```
