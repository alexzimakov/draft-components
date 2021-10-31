```jsx
import { useState } from 'react';
import { DateRangePickerPopover } from '../date-range-picker-popover';
import { addDays, formatISO, getStartOfMonth, getStartOfWeek } from '../../lib/date-helpers';
import { Button } from '../button';
import { SvgIcon } from '../svg-icon';
import { caretDownFill } from '../../icons/caret-down-fill';

const today = new Date();
const [datePreset, setDatePreset] = useState({
  startDate: formatISO(addDays(today, -15)),
  endDate: formatISO(today),
});

<DateRangePickerPopover
  dateRange={datePreset}
  onChangeDateRange={setDatePreset}
>
  {(props) => (
    <Button
      trailingIcon={<SvgIcon size="xs" icon={caretDownFill} />}
      onClick={props.togglePopoverVisibility}
    >
      {props.formattedDateRange || 'Select date range'}
    </Button>
  )}
</DateRangePickerPopover>;
```

With options

```jsx
import { useState } from 'react';
import { DateRangePickerPopover } from '../date-range-picker-popover';
import { addDays, formatISO, getStartOfMonth, getStartOfWeek } from '../../lib/date-helpers';
import { Button } from '../button';
import { SvgIcon } from '../svg-icon';
import { caretDownFill } from '../../icons/caret-down-fill';

const today = formatISO(new Date());
const yesterday = formatISO(addDays(new Date(), -1));
const weekStart = formatISO(getStartOfWeek(new Date()));
const monthStart = formatISO(getStartOfMonth(new Date()));
const yearStart = formatISO(new Date(new Date().getFullYear(), 0, 1));
const options = [
  {
    label: 'Today',
    dateRange: {
      startDate: today,
      endDate: today,
      datePreset: 'today',
    },
  },
  {
    label: 'Yesterday',
    dateRange: {
      startDate: yesterday,
      endDate: yesterday,
      datePreset: 'yesterday',
    },
  },
  {
    label: 'This week',
    dateRange: {
      startDate: weekStart,
      endDate: today,
      datePreset: 'this_week',
    },
  },
  {
    label: 'This month',
    dateRange: {
      startDate: monthStart,
      endDate: today,
      datePreset: 'this_month',
    },
  },
  {
    label: 'This year',
    dateRange: {
      startDate: yearStart,
      endDate: today,
      datePreset: 'this_year',
    },
  },
];

const [dateRange, setDateRange] = useState(options[0].dateRange);

<DateRangePickerPopover
  options={options}
  dateRange={dateRange}
  onChangeDateRange={setDateRange}
>
  {(props) => (
    <Button
      trailingIcon={<SvgIcon size="xs" icon={caretDownFill} />}
      onClick={props.togglePopoverVisibility}
    >
      {props.formattedDateRange || 'Select date range'}
    </Button>
  )}
</DateRangePickerPopover>
```
