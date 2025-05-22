import { type Meta, type StoryFn } from '@storybook/react';
import { type DateISO } from '../date-picker/date-helpers.js';
import { type ComponentProps, useState } from 'react';
import { DatePickerPopover } from './date-picker-popover.js';
import { Button } from '../button/index.js';

const meta: Meta<typeof DatePickerPopover> = {
  title: 'Overlays/DatePickerPopover',
  component: DatePickerPopover,
};
export default meta;

export const Basic: StoryFn<typeof DatePickerPopover> = (args) => {
  const [dateISO, setDateISO] = useState<DateISO | null>(args.value);
  const intl = new Intl.DateTimeFormat('en', { dateStyle: 'long' });

  return (
    <DatePickerPopover
      value={dateISO}
      onChangeValue={(value) => {
        setDateISO(value);
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
          {dateISO ? intl.format(new Date(dateISO)) : 'Choose date'}
        </Button>
      )}
    </DatePickerPopover>
  );
};
Basic.argTypes = {
  children: {
    control: { disable: true },
  },
  value: {
    control: { disable: true },
  },
};
Basic.args = {
  value: null,
};

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
