import { type Meta, type StoryFn } from '@storybook/react';
import { type DateRangePickerPopoverOption, type DateRangePickerPopoverSelection } from './types.js';
import { type ComponentProps, type ReactNode, useState } from 'react';
import { addDays, getStartOfMonth, getStartOfWeek, isSameDay, toDateISO } from '../date-picker/date-helpers.js';
import { DateRangePickerPopover } from './date-range-picker-popover.js';
import { Button } from '../button/index.js';

const meta: Meta<typeof DateRangePickerPopover> = {
  title: 'Overlays/DateRangePickerPopover',
  component: DateRangePickerPopover,
  argTypes: {
    cancelButtonLabel: {
      control: 'text',
    },
    confirmButtonLabel: {
      control: 'text',
    },
  },
};
export default meta;

const options: DateRangePickerPopoverOption[] = [
  {
    preset: 'today',
    label: 'Today',
    get range() {
      const date = new Date();
      return { start: toDateISO(date), end: toDateISO(date) };
    },
  },
  {
    preset: 'yesterday',
    label: 'Yesterday',
    get range() {
      const date = addDays(new Date(), -1);
      return { start: toDateISO(date), end: toDateISO(date) };
    },
  },
  {
    preset: 'last_7_days',
    label: 'Last 7 days',
    get range() {
      const end = new Date();
      const start = addDays(end, -6);
      return { start: toDateISO(start), end: toDateISO(end) };
    },
  },
  {
    preset: 'last_14_days',
    label: 'Last 14 days',
    get range() {
      const end = new Date();
      const start = addDays(end, -13);
      return { start: toDateISO(start), end: toDateISO(end) };
    },
  },
  {
    preset: 'last_30_days',
    label: 'Last 30 days',
    get range() {
      const end = new Date();
      const start = addDays(end, -29);
      return { start: toDateISO(start), end: toDateISO(end) };
    },
  },
  {
    preset: 'this_week',
    label: 'This week',
    get range() {
      const end = new Date();
      const start = getStartOfWeek(end, 1);
      return { start: toDateISO(start), end: toDateISO(end) };
    },
  },
  {
    preset: 'this_month',
    label: 'This month',
    get range() {
      const end = new Date();
      const start = getStartOfMonth(end);
      return { start: toDateISO(start), end: toDateISO(end) };
    },
  },
  {
    preset: 'this_year',
    label: 'This year',
    get range() {
      const end = new Date();
      const start = new Date(end.getFullYear(), 0, 1);
      return { start: toDateISO(start), end: toDateISO(end) };
    },
  },
];

export const Basic: StoryFn<typeof DateRangePickerPopover> = (args) => {
  const [value, setValue] = useState<DateRangePickerPopoverSelection | null>(
    args.value,
  );

  return (
    <DateRangePickerPopover
      {...args}
      footer={renderFooter}
      options={options}
      value={value}
      onChangeValue={(value) => {
        setValue(value);
        if (typeof args.onChangeValue === 'function') {
          args.onChangeValue(value);
        }
      }}
    >
      {({ ref, toggle }) => (
        <Button
          ref={ref}
          onClick={toggle}
          iconLeft={<CalendarIcon width={18} height={18} />}
        >
          {formatSelection(value)}
        </Button>
      )}
    </DateRangePickerPopover>
  );
};
Basic.argTypes = {
  footer: {
    control: { disable: true },
  },
  children: {
    control: { disable: true },
  },
  options: {
    control: { disable: true },
  },
  value: {
    control: { disable: true },
  },
};
Basic.args = {
  value: {
    preset: 'custom',
    get range() {
      return {
        start: toDateISO(addDays(new Date(), -6)),
        end: toDateISO(new Date()),
      };
    },
  },
};

function formatSelection(
  selection: DateRangePickerPopoverSelection | null,
): string {
  if (!selection) {
    return 'Choose date range';
  }

  const option = options.find((option) => option.preset === selection.preset);
  if (option) {
    return option.label;
  }

  const start = new Date(selection.range.start);
  const end = new Date(selection.range.end);

  if (isSameDay(start, end)) {
    const intl = new Intl.DateTimeFormat('en', { dateStyle: 'long' });
    return intl.format(start);
  }

  const intl = new Intl.DateTimeFormat('en', { dateStyle: 'medium' });
  return intl.format(start) + ' - ' + intl.format(end);
}

function renderFooter(params: {
  selection: DateRangePickerPopoverSelection | null;
}): ReactNode {
  const selection = params.selection;
  let range = '';
  if (selection) {
    const start = new Date(selection.range.start);
    const end = new Date(selection.range.end);
    const intl = new Intl.DateTimeFormat('en', { dateStyle: 'medium' });

    if (isSameDay(start, end)) {
      range = intl.format(start);
    } else {
      range = intl.format(start) + ' - ' + intl.format(end);
    }
  }

  const date = new Date();
  const timeZoneName = new Intl.DateTimeFormat('en', {
    second: '2-digit',
    timeZoneName: 'long',
  }).format(date).replace(/^\d{1,2} /, '');
  const timeZoneOffset = new Intl.DateTimeFormat('en', {
    second: '2-digit',
    timeZoneName: 'shortOffset',
  }).format(date).replace(/^\d{1,2} /, '');

  return (
    <>
      {range && (
        <div>
          <b>{range}</b>
        </div>
      )}
      {timeZoneName}
      {' '}
      (
      {timeZoneOffset}
      )
    </>
  );
}

function CalendarIcon(props: ComponentProps<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      width={24}
      height={24}
      strokeWidth={1.5}
      stroke="currentColor"
      {...props}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
    </svg>
  );
}
