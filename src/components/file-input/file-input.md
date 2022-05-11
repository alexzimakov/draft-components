```jsx
import { FileInput, FileInputButton } from '../file-input';

<FileInput
  multiple={true}
  onSelectFiles={(files) => alert(`Selected files: ${files.length}`)}
>
  <FileInputButton>Choose file</FileInputButton> or drag and drop
</FileInput>;
```

With help text

```jsx
import { FileInput, FileInputButton } from '../file-input';
import { SvgIcon } from '../svg-icon';
import { image } from '../../bootstrap-icons/image';

<FileInput
  icon={<SvgIcon size="3x" icon={image} />}
  helpText="png, jpg or webp up to 2MB"
  accept="images/*"
  multiple={true}
  onSelectFiles={(files) => alert(`Selected files: ${files.length}`)}
>
  <FileInputButton>Choose image</FileInputButton> or drag and drop
</FileInput>;
```

Loading state

```jsx
import { FileInput, FileInputButton } from '../file-input';
import { SvgIcon } from '../svg-icon';
import { image } from '../../bootstrap-icons/image';

<FileInput
  icon={<SvgIcon size="3x" icon={image} />}
  helpText="png, jpg or webp up to 2MB"
  accept="images/*"
  isLoading={true}
  multiple={true}
  onSelectFiles={(files) => alert(`Selected files: ${files.length}`)}
>
  <FileInputButton>Choose image</FileInputButton> or drag and drop
</FileInput>;
```

Disabled state

```jsx
import { FileInput, FileInputButton } from '../file-input';
import { SvgIcon } from '../svg-icon';
import { image } from '../../bootstrap-icons/image';

<FileInput
  icon={<SvgIcon size="3x" icon={image} />}
  helpText="png, jpg or webp up to 2MB"
  accept="images/*"
  multiple={true}
  disabled={true}
  onSelectFiles={(files) => alert(`Selected files: ${files.length}`)}
>
  <FileInputButton>Choose image</FileInputButton> or drag and drop
</FileInput>;
```
