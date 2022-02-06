```jsx
import { useState } from 'react';
import { DatePickerPopover } from './date-picker-popover';
import { Button } from '../button';
import { SvgIcon } from '../svg-icon';
import { calendar2 } from '../../bootstrap-icons/calendar2';

const [value, setValue] = useState(new Date().toISOString().split('T')[0]);
const intl = new Intl.DateTimeFormat('en', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});

<DatePickerPopover value={value} onChangeValue={setValue}>
  {(props) => (
    <Button
      leadingIcon={<SvgIcon size="md" icon={calendar2} />}
      onClick={props.togglePopover}
    >
      {intl.format(new Date(value))}
    </Button>
  )}
</DatePickerPopover>;
```
