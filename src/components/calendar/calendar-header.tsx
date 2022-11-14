import { classNames } from '../../lib/react-helpers';
import { Button, ButtonProps } from '../Button';
import { PlainDate } from '../../lib/plain-date';

export interface CalendarHeaderProps {
  id: string;
  className?: string;
  locale?: string;
  nextYearButtonLabel?: string;
  nextMonthButtonLabel?: string;
  prevYearButtonLabel?: string;
  prevMonthButtonLabel?: string;
  focusDate: PlainDate;
  onChangeFocusDate(focusDate: PlainDate): void;
}

export function CalendarHeader({
  id,
  className,
  locale,
  nextYearButtonLabel = 'Next year',
  nextMonthButtonLabel = 'Next month',
  prevYearButtonLabel = 'Previous year',
  prevMonthButtonLabel = 'Previous month',
  focusDate,
  onChangeFocusDate,
}: CalendarHeaderProps) {
  return (
    <div className={classNames(className, 'dc-calendar-header')}>
      <ArrowButton
        ariaLabel={prevYearButtonLabel}
        iconPath="M11 19l-7-7 7-7m8 14l-7-7 7-7"
        onClick={() => onChangeFocusDate(focusDate.addYears(-1))}
      />
      <ArrowButton
        ariaLabel={prevMonthButtonLabel}
        iconPath="M15 19l-7-7 7-7"
        onClick={() => onChangeFocusDate(focusDate.addMonths(-1))}
      />

      <span id={id} className="dc-calendar-header__title">
        {focusDate.format({ year: 'numeric', month: 'long' }, locale)}
      </span>

      <ArrowButton
        ariaLabel={nextMonthButtonLabel}
        iconPath="M9 5l7 7-7 7"
        onClick={() => onChangeFocusDate(focusDate.addMonths(1))}
      />
      <ArrowButton
        ariaLabel={nextYearButtonLabel}
        iconPath="M13 5l7 7-7 7M5 5l7 7-7 7"
        onClick={() => onChangeFocusDate(focusDate.addYears(1))}
      />
    </div>
  );
}

function ArrowButton(props: {
  ariaLabel?: string;
  iconPath: string;
  onClick: ButtonProps['onClick'];
}) {
  return (
    <Button
      className="dc-calendar-header__btn"
      size="xs"
      noPadding={true}
      appearance="minimal"
      aria-label={props.ariaLabel}
      onClick={props.onClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        stroke="currentColor"
        viewBox="0 0 24 24"
        fill="none"
        width={16}
        height={16}
        role="img"
        aria-hidden={true}
        focusable={false}
      >
        <path
          d={props.iconPath}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Button>
  );
}
