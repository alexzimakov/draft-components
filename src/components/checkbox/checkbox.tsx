import { type ComponentProps, forwardRef } from 'react';
import { classNames } from '../../lib/react-helpers.js';

export type CheckboxToggleHandler = (checked: boolean) => void;

type CheckboxHTMLProps = ComponentProps<'input'>;

type CheckboxBaseProps = {
  hasMixedState?: boolean;
  onToggle?: CheckboxToggleHandler;
};

export type CheckboxProps =
  & CheckboxBaseProps
  & Omit<CheckboxHTMLProps, keyof CheckboxBaseProps>;

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  function Checkbox({
    hasMixedState = false,
    style,
    className,
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
            if (typeof onChange === 'function') {
              onChange(event);
            }
            if (typeof onToggle === 'function') {
              onToggle(event.target.checked);
            }
          }}
        />
        <span
          className="dc-checkbox__check"
          data-testid="checkbox-check"
          aria-hidden={true}
        >
          {hasMixedState
            ? (
                <DashIcon
                  className="dc-checkbox__icon"
                  data-testid="checkbox-dash-icon"
                />
              )
            : (
                <CheckIcon
                  className="dc-checkbox__icon"
                  data-testid="checkbox-check-icon"
                />
              )}
        </span>
      </label>
    );
  },
);

function CheckIcon(props: ComponentProps<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      width={20}
      height={20}
      {...props}
    >
      <path
        d="M5 10.4444L9 14L15 6"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DashIcon(props: ComponentProps<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      width={20}
      height={20}
      {...props}
    >
      <path
        d="M5 10H15"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.5}
        strokeLinecap="round"
      />
    </svg>
  );
}
