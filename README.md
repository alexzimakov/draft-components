# Draft Components

<a href="https://npmjs.com/package/draft-components">
  <img alt="version" src="https://badgen.net/github/tag/alexzimakov/draft-components?label=npm&labelColor=3f3f46&color=5ec169" />
</a>
<a href="https://www.npmjs.com/package/draft-components?activeTab=dependencies">
  <img alt="dependencies count" src="https://badgen.net/bundlephobia/dependency-count/draft-components?label=dependencies&labelColor=3f3f46&color=5ec169" />
</a>
<a href="https://github.com/alexzimakov/draft-components/blob/master/tsconfig.json">
  <img alt="types" src="https://badgen.net/npm/types/tslib?labelColor=3f3f46&color=5ec169" />
</a>

`draft-components` is set of React-based components for building or rapid prototyping web interfaces.

[Demo Website](https://alexzimakov.github.io/draft-components)

## Getting Started

1. Install the `draft-components` package and its peer dependencies using `npm` or `yarn`:

```shell
npm install draft-components react@^17 react-dom@^17
```

2. Include `draft-components.css` stylesheets to your `index.js`/`index.ts` (or in your main App file):

```jsx
import 'draft-components/css/draft-components.css';
```

In case you are using **sass**, you can import source sass files to your main sass file:

```scss
// using node-style package resolution
@import '~draft-components/scss/draft-components';

// you can customize the styles bundle and include only needed parts
@import '~draft-components/scss/abstracts';
@import '~draft-components/scss/themes/default-theme';
@import '~draft-components/scss/base';
// include styles only for specific components
@import '~draft-components/scss/components/button';
@import '~draft-components/scss/components/text-field';
...
```

3. After previous steps you'll be able to import React components:

```jsx
import { FormattedContent, Button } from 'draft-components';
// with tree-shaking:
import { FormattedContent } from 'draft-components/components/formatted-content';
import { Button } from 'draft-components/components/button';

function App() {
  return (
    <div>
      <FormattedContent.Title1>
        draft-components example
      </FormattedContent.Title1>
      <Button>Button Text</Button>
    </div>
  );
}
```
