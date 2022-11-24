```jsx
import {Toaster} from '../toaster';
import {Toast} from '../toast';
import {Button} from '../button';

const showToast = () => {
  Toaster.show((props) => (
    <Toast
      className={props.className}
      appearance="success"
      message="Successfully saved"
      informativeText="Lorem ipsum dolor sit amet, consectetur adipisicing elit."
    >
      <Toast.Button onClick={props.dismiss}>Got it</Toast.Button>
    </Toast>
  ));
};

<div>
  <Button onClick={showToast}>Show toast</Button>
  <Toaster position="top-center" />
</div>;
```
