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
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="24"
    height="24"
    className="dc-checkbox__icon"
    data-testid="checkbox-check-icon"
  >
    <path
      d="M6 12.5556L10.8 17L18 7"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const dashIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="24"
    height="24"
    className="dc-checkbox__icon"
    data-testid="checkbox-dash-icon"
  >
    <path
      d="M6 12H18"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
  </svg>
);
