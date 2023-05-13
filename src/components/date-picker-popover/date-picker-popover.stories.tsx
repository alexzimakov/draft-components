import { type ComponentMeta, type ComponentStory } from '@storybook/react';
import { type DateISO } from '../date-picker/date-helpers';
import { useState } from 'react';
import { DatePickerPopover } from './date-picker-popover';
import { Button } from '../button';
import { CalendarIcon } from '@heroicons/react/24/outline';

export default {
  title: 'Overlays/DatePickerPopover',
  component: DatePickerPopover,
} as ComponentMeta<typeof DatePickerPopover>;

export const Basic: ComponentStory<typeof DatePickerPopover> = (args) => {
  const [dateISO, setDateISO] = useState<DateISO | null>(args.value);
  const intl = new Intl.DateTimeFormat('en', { dateStyle: 'long' });

  return (
    <DatePickerPopover
      value={dateISO}
      onChangeValue={(value) => {
        setDateISO(value);
        args.onChangeValue?.(value);
      }}
    >
      <Button leftIcon={<CalendarIcon width={18} height={18} />}>
        {dateISO
          ? intl.format(new Date(dateISO))
          : 'Choose date'}
      </Button>
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
