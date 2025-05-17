import { type DateISO, parseDateISO } from './date-helpers.js';

export function parseMinMaxProps(props: {
  min?: DateISO;
  max?: DateISO;
}): {
    minDate: Date | null;
    maxDate: Date | null;
  } {
  const min = props.min;
  const max = props.max;
  const minDate = min
    ? parseDateISO(min, 'The \'min\' property must be a date in the ISO format.')
    : null;
  const maxDate = max
    ? parseDateISO(max, 'The \'max\' property must be a date in the ISO format.')
    : null;
  if (minDate != null && maxDate != null && minDate >= maxDate) {
    throw new RangeError('\'min\' property must be less than \'max\' property.');
  }

  return { minDate, maxDate };
}
