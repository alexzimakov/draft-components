# Draft Components

[![version](https://badgen.net/github/tag/alexzimakov/draft-components?color=green)](https://npmjs.com/package/draft-components)
[![codecov](https://badgen.net/codecov/c/github/alexzimakov/draft-components?color=green)](https://codecov.io/gh/alexzimakov/draft-components)
[![dependencies](https://badgen.net/bundlephobia/dependency-count/draft-components?label=dependencies&color=green)](https://www.npmjs.com/package/draft-components?activeTab=dependencies)
[![types](https://badgen.net/npm/types/tslib?color=green)](https://github.com/alexzimakov/draft-components/blob/master/tsconfig.json)

The React based UI components library.

<a href="https://draft-components.netlify.app">
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
    <path d="M1.58051 1.53345L2.07511 14.7122C2.09077 15.1296 2.42396 15.4653 2.84126 15.484L13.5561 15.9652C13.5681 15.9658 13.5801 15.966 13.5921 15.966C14.0355 15.966 14.3948 15.6067 14.3948 15.1633V0.802758C14.3948 0.786055 14.3943 0.769356 14.3933 0.752685C14.3656 0.310212 13.9845 -0.026064 13.542 0.0015905L12.6607 0.056674L12.7251 1.89911C12.7274 1.9652 12.6757 2.02065 12.6096 2.02296C12.5813 2.02395 12.5535 2.01487 12.5313 1.99735L11.9376 1.5297L11.2348 2.06286C11.1821 2.10283 11.107 2.09251 11.067 2.03982C11.0502 2.01765 11.0416 1.9903 11.0428 1.96248L11.118 0.153093L2.33261 0.70218C1.89791 0.729349 1.56418 1.09821 1.58051 1.53345ZM11.4601 5.96107C11.1777 6.18045 9.07404 6.33013 9.07404 6.01782C9.1185 4.82611 8.58497 4.77387 8.28856 4.77387C8.00697 4.77387 7.53272 4.85899 7.53272 5.49741C7.53272 6.14798 8.22578 6.51526 9.03926 6.94635C10.1949 7.55874 11.5935 8.29992 11.5935 10.1649C11.5935 11.9525 10.1411 12.94 8.28856 12.94C6.37674 12.94 4.70602 12.1665 4.89471 9.48481C4.96881 9.1699 7.39935 9.24475 7.39935 9.48481C7.3697 10.5914 7.62164 10.9169 8.25892 10.9169C8.74799 10.9169 8.9703 10.6473 8.9703 10.1933C8.9703 9.50626 8.24818 9.10084 7.41747 8.63444C6.29269 8.00294 4.96881 7.25965 4.96881 5.55415C4.96881 3.85171 6.13962 2.71675 8.22928 2.71675C10.3189 2.71675 11.4601 3.83432 11.4601 5.96107Z" />
  </svg>
  <span>Storybook</span>
</a>

## Peer dependencies

`draft-components` requires the following libraries to be installed:

- `react` >= 18
- `react-dom` >= 18

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
