import { forwardRef, type ComponentPropsWithRef } from 'react';
import { classNames } from '../../lib/react-helpers';

type CheckboxHTMLProps = ComponentPropsWithRef<'input'>;
type CheckboxBaseProps = Omit<CheckboxHTMLProps, 'type'>;
export type CheckboxToggleHandler = (checked: boolean) => void;
export type CheckboxProps = CheckboxBaseProps & {
  hasMixedState?: boolean;
  onToggle?: CheckboxToggleHandler;
};

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  function Checkbox({
    hasMixedState = false,
    style = {},
    className = '',
    onChange,
    onToggle,
    ...props
  }, ref) {
    return (
      <label style={style} className={classNames('dc-checkbox', className)}>
        <input
          {...props}
          ref={ref}
          type="checkbox"
          className="dc-checkbox__input"
          onChange={(event) => {
            onChange?.(event);
            onToggle?.(event.target.checked);
          }}
        />
        <span
          className="dc-checkbox__check"
          data-testid="checkbox-check"
          aria-hidden={true}
        >
          {hasMixedState ? dashIcon : checkIcon}
        </span>
      </label>
    );
  }
);

const checkIcon = (
  <svg
    data-testid="checkbox-check-icon"
    className="dc-checkbox__icon"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="1em"
    height="1em"
    fill="none"
    stroke="currentColor"
    strokeWidth={3}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"
    />
  </svg>
);

const dashIcon = (
  <svg
    data-testid="checkbox-dash-icon"
    className="dc-checkbox__icon"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="1em"
    height="1em"
    fill="none"
    stroke="currentColor"
    strokeWidth={3}
  >
    <line
      x1={4}
      y1={12}
      x2={20}
      y2={12}
      stroke="currentColor"
      strokeLinecap="round"
    />
  </svg>
);
