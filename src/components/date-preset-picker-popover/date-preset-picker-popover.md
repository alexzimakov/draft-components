```jsx
import { useState } from 'react';
import { PlainDate } from '../../lib/plain-date';
import { DatePresetPickerPopover } from '../date-preset-picker-popover';
import { Button } from '../Button';
import { SvgIcon } from '../svg-icon';
import { calendar2 } from '../../bootstrap-icons/calendar2';

const datePresets = [
  {
    label: 'Today',
    datePreset: 'today',
    get dateRange() {
      const today = PlainDate.now()
        .toISOString();
      return {
        start: today,
        end: today
      };
    },
  },
  {
    label: 'Yesterday',
    datePreset: 'yesterday',
    get dateRange() {
      const yesterday = PlainDate.now()
        .addDays(-1)
        .toISOString();
      return {
        start: yesterday,
        end: yesterday
      };
    },
  },
  {
    label: 'Last 7 days',
    datePreset: 'last_7_days',
    get dateRange() {
      const yesterday = PlainDate.now()
        .addDays(-1);
      return {
        start: yesterday.addDays(-6)
          .toISOString(),
        end: yesterday.toISOString(),
      };
    },
  },
  {
    label: 'Last 14 days',
    datePreset: 'last_14_days',
    get dateRange() {
      const yesterday = PlainDate.now()
        .addDays(-1);
      return {
        start: yesterday.addDays(-13)
          .toISOString(),
        end: yesterday.toISOString(),
      };
    },
  },
  {
    label: 'Last 30 days',
    datePreset: 'last_30_days',
    get dateRange() {
      const yesterday = PlainDate.now()
        .addDays(-1);
      return {
        start: yesterday.addDays(-29)
          .toISOString(),
        end: yesterday.toISOString(),
      };
    },
  },
  {
    label: 'This week',
    datePreset: 'this_week',
    get dateRange() {
      const today = PlainDate.now();
      return {
        start: today.startOfWeek.toISOString(),
        end: today.toISOString(),
      };
    },
  },
  {
    label: 'Last week',
    datePreset: 'last_week',
    get dateRange() {
      const date = PlainDate.now()
        .addWeeks(-1);
      return {
        start: date.startOfWeek.toISOString(),
        end: date.endOfWeek.toISOString(),
      };
    },
  },
  {
    label: 'This month',
    datePreset: 'this_month',
    get dateRange() {
      const today = PlainDate.now();
      return {
        start: today.startOfMonth.toISOString(),
        end: today.toISOString(),
      };
    },
  },
  {
    label: 'Last month',
    datePreset: 'last_month',
    get dateRange() {
      const date = PlainDate.now()
        .addMonths(-1);
      return {
        start: date.startOfMonth.toISOString(),
        end: date.endOfMonth.toISOString(),
      };
    },
  },
];
const formattedDatePresets = new Map(
  datePresets.map((item) => [item.datePreset, item.label])
);

const [value, setValue] = useState({
  dateRange: datePresets[0].dateRange,
  datePreset: datePresets[0].datePreset,
});

const locale = 'en';

const formatValue = ({
  dateRange,
  datePreset
}) => {
  if (dateRange && datePreset) {
    return (
      formattedDatePresets.get(datePreset) +
      ': ' +
      DatePresetPickerPopover.formatDateRange(dateRange, locale)
    );
  }

  if (dateRange) {
    return DatePresetPickerPopover.formatDateRange(dateRange, locale);
  }

  return 'Select date preset';
};

<DatePresetPickerPopover
  locale={locale}
  timeZone="America/New_York"
  options={datePresets}
  value={value}
  onChangeValue={setValue}
>
  <Button leadingIcon={<SvgIcon size="md" icon={calendar2} />}>
    {formatValue(value)}
  </Button>
</DatePresetPickerPopover>;
```
