```jsx
import { TextField } from '../text-field';
import { FieldGroup } from '../field-group';

const [value, setValue] = React.useState('');
const [error, setError] = React.useState('');

<FieldGroup
  label="Username"
  labelFor="fieldGroupExample"
  hint="You can use letters, numbers & periods"
  required={true}
  validationError={error}
>
  <TextField
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
</FieldGroup>;
```

Children as function

```jsx
import { TextField } from '../text-field';
import { FieldGroup } from '../field-group';

const [value, setValue] = React.useState('');
const [error, setError] = React.useState('');

<FieldGroup
  label="Username"
  hint="You can use letters, numbers & periods"
  required={true}
  validationError={error}
>
  {({ id, invalid, required }) => (
    <TextField
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
</FieldGroup>;
```
