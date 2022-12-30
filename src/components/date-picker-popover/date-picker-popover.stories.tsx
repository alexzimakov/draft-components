import { type ComponentMeta, type ComponentStory } from '@storybook/react';
import { type DateISO } from '../date-picker/date-helpers';
import { useState } from 'react';
import { DatePickerPopover } from './date-picker-popover';
import { Button } from '../button';
import { CalendarIcon } from '@heroicons/react/24/outline';

export default {
  title: 'Forms/DatePickerPopover',
  component: DatePickerPopover,
} as ComponentMeta<typeof DatePickerPopover>;

export const Basic: ComponentStory<typeof DatePickerPopover> = () => {
  const [dateISO, setDateISO] = useState<DateISO | null>(null);
  const intl = new Intl.DateTimeFormat('en', { dateStyle: 'long' });

  return (
    <DatePickerPopover value={dateISO} onChangeValue={setDateISO}>
      <Button icon={<CalendarIcon width={18} height={18} />}>
        {dateISO
          ? intl.format(new Date(dateISO))
          : 'Choose date'}
      </Button>
    </DatePickerPopover>
  );
};
