# Draft Components

[![version](https://badgen.net/github/tag/alexzimakov/draft-components?color=green)](https://npmjs.com/package/draft-components)
[![codecov](https://badgen.net/codecov/c/github/alexzimakov/draft-components?color=green)](https://codecov.io/gh/alexzimakov/draft-components)
[![dependencies](https://badgen.net/bundlephobia/dependency-count/draft-components?label=dependencies&color=green)](https://www.npmjs.com/package/draft-components?activeTab=dependencies)
[![types](https://badgen.net/npm/types/tslib?color=green)](https://github.com/alexzimakov/draft-components/blob/master/tsconfig.json)

The React based UI components library.

[![storybook](https://shields.io/badge/-Storybook-ff4785?logo=storybook&logoColor=white&style=for-the-badge)](https://draft-components.netlify.app)

## Peer dependencies

`draft-components` requires the following libraries to be installed:

- `react` >= 19
- `react-dom` >= 19

## Getting Started

```
npm install draft-components
```

```js
// import `draft-components` styles
import 'draft-components/css/draft-components.css';
// import necessary components
import {
  FormField,
  TextInput,
  PasswordInput,
  Button,
} from 'draft-components';

function App() {
  return (
    <form>
      <FormField label="Username" labelFor="username">
        <TextInput id="username" name="username" />
      </FormField>
      <FormField label="Password" labelFor="password">
        <PasswordInput id="password" name="password" />
      </FormField>
      <Button>Sign in</Button>
    </form>
  );
}
```
