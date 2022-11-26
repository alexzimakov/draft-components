import { forwardRef, type ComponentPropsWithRef } from 'react';
import { classNames } from '../../lib/react-helpers';

type RadioHTMLProps = ComponentPropsWithRef<'input'>;
type RadioBaseProps = Omit<RadioHTMLProps, 'type'>;
export type RadioIcon = 'dot' | 'check';
export type RadioToggleHandler = (checked: boolean) => void;
export type RadioProps = RadioBaseProps & {
  icon?: RadioIcon;
  onToggle?: RadioToggleHandler;
};

export const Radio = forwardRef<HTMLInputElement, RadioProps>(function Radio({
  icon = 'dot',
  style = {},
  className = '',
  onChange,
  onToggle,
  ...props
}, ref) {
  let renderedIcon: JSX.Element;
  switch (icon) {
    case 'check':
      renderedIcon = checkIcon;
      break;
    default:
      renderedIcon = dotIcon;
  }

  return (
    <label style={style} className={classNames('dc-radio', className)}>
      <input
        {...props}
        ref={ref}
        type="radio"
        className="dc-radio__input"
        onChange={(event) => {
          onChange?.(event);
          onToggle?.(event.target.checked);
        }}
      />
      <span
        className="dc-radio__check"
        data-testid="radio-check"
        aria-hidden={true}
      >
        {renderedIcon}
      </span>
    </label>
  );
});

const checkIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="24"
    height="24"
    className="dc-radio__icon"
    data-testid="radio-check-icon"
  >
    <path
      d="M7 12.7222L11 16.5L17 8"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const dotIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="24"
    height="24"
    className="dc-radio__icon"
    data-testid="radio-dot-icon"
  >
    <circle cx="12" cy="12" r="5" fill="currentColor" />
  </svg>
);
