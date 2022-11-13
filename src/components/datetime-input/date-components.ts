export type DateComponent = 'year' | 'month' | 'day' | 'hour' | 'minute';
export type DateComponentOptions = { min: number; max: number; digits: number };
export type DateComponentsValues = {
  [component in DateComponent]?: string | number | null;
};

export class DateComponents {
  year?: number;
  month?: number;
  day?: number;
  hour?: number;
  minute?: number;

  constructor(values?: DateComponentsValues) {
    if (values) {
      for (const [key, value] of Object.entries(values)) {
        this[key as DateComponent] = DateComponents.toDateComponentValue(value);
      }
    }
  }

  static options: Record<DateComponent, DateComponentOptions> = {
    year: { min: 1, max: 9999, digits: 4 },
    month: { min: 1, max: 12, digits: 2 },
    day: { min: 1, max: 31, digits: 2 },
    hour: { min: 0, max: 23, digits: 2 },
    minute: { min: 0, max: 59, digits: 2 },
  };

  static makeFormDatetimeISO(dateString?: string | null): DateComponents {
    const dateTimeRegex = /^\d{4}-\d{2}-\d{2}[ T]\d{2}:\d{2}$/;
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    const timeRegex = /^\d{2}:\d{2}$/;

    let year = '';
    let month = '';
    let day = '';
    let hour = '';
    let minute = '';
    if (dateString) {
      if (dateString.match(dateTimeRegex)) {
        const [dateISO, timeISO] = dateString.split(/[ T]/);
        [year, month, day] = dateISO.split('-');
        [hour, minute] = timeISO.split(':');
      } else if (dateString.match(dateRegex)) {
        [year, month, day] = dateString.split('-');
      } else if (dateString.match(timeRegex)) {
        [hour, minute] = dateString.split(':');
      }
    }

    return new DateComponents({ year, month, day, hour, minute });
  }

  static toDateComponentValue(
    value: string | number | null | undefined
  ): number | undefined {
    if (value == null || value === '') {
      return undefined;
    }
    const numericValue = Number(value);
    return Number.isNaN(numericValue) ? undefined : numericValue >> 0;
  }

  getDisplayedValue(component: DateComponent): string {
    const value = this[component];
    const options = DateComponents.options[component];
    return value != null ? String(value).padStart(options.digits, '0') : '';
  }

  updatingValue(
    value: string | number | null | undefined,
    component: DateComponent
  ): DateComponents {
    return new DateComponents({ ...this, [component]: value });
  }

  isValidDatetime(): boolean {
    return this.isValidDate() && this.isValidTime();
  }

  isValidDate(): boolean {
    if (this.year == null || this.month == null || this.day == null) {
      return false;
    }

    const isYearValid = (
      this.year >= DateComponents.options.year.min &&
      this.year <= DateComponents.options.year.max
    );
    const isMonthValid = (
      this.month >= DateComponents.options.month.min &&
      this.month <= DateComponents.options.month.max
    );
    const isDayValid = (
      this.day >= DateComponents.options.day.min &&
      this.day <= new Date(this.year, this.month, 0).getUTCDate()
    );

    return isYearValid && isMonthValid && isDayValid;
  }

  isValidTime(): boolean {
    if (this.hour == null || this.minute == null) {
      return false;
    }

    const isHourValid = (
      this.hour >= DateComponents.options.hour.min &&
      this.hour <= DateComponents.options.hour.max
    );
    const isMinuteValid = (
      this.minute >= DateComponents.options.minute.min &&
      this.minute <= DateComponents.options.minute.max
    );

    return isHourValid && isMinuteValid;
  }

  toDatetimeISO(): string {
    const dateISO = this.toDateISO();
    const timeISO = this.toTimeISO();
    return dateISO && timeISO ? dateISO + 'T' + timeISO : '';
  }

  toDateISO(): string {
    return this.isValidDate()
      ? this.getDisplayedValue('year') +
          '-' +
          this.getDisplayedValue('month') +
          '-' +
          this.getDisplayedValue('day')
      : '';
  }

  toTimeISO(): string {
    return this.isValidTime()
      ? this.getDisplayedValue('hour') + ':' + this.getDisplayedValue('minute')
      : '';
  }
}
