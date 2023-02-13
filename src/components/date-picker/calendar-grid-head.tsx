import {
  DAYS_IN_WEEK,
  type Weekday,
  addDays,
  getStartOfWeek,
} from './date-helpers';

export type CalendarGridHeadProps = {
  locale?: string;
  weekStartsOn?: Weekday;
};

export function CalendarGridHead({
  locale,
  weekStartsOn,
}: CalendarGridHeadProps) {
  const columns: JSX.Element[] = [];
  const monday = getStartOfWeek(new Date(), weekStartsOn);
  for (let weekday = 0; weekday < DAYS_IN_WEEK; weekday += 1) {
    const date = addDays(monday, weekday);
    columns.push(
      <th
        key={weekday}
        role="columnheader"
        abbr={date.toLocaleDateString(locale, { weekday: 'long' })}
      >
        {date.toLocaleDateString(locale, { weekday: 'short' })}
      </th>,
    );
  }

  return (
    <thead>
      <tr role="row">{columns}</tr>
    </thead>
  );
}
