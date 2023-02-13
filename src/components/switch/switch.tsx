import { type ComponentPropsWithRef, forwardRef } from 'react';
import { classNames } from '../../lib/react-helpers';

type SwitchHTMLProps = ComponentPropsWithRef<'input'>;
type SwitchBaseProps = Omit<SwitchHTMLProps, 'type'>;
export type SwitchToggleHandler = (checked: boolean) => void;
export type SwitchProps = SwitchBaseProps & {
  showCheckIcon?: boolean,
  onToggle?: SwitchToggleHandler;
};

const checkIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    width="20"
    height="20"
    className="dc-switch__icon"
    data-testid="switch-check-icon"
  >
    <path
      d="M6 10.353L9 13L13.5 7"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  function Switch({
    style = {},
    className = '',
    showCheckIcon = true,
    onChange,
    onToggle,
    ...props
  }, ref) {
    return (
      <label style={style} className={classNames('dc-switch', className)}>
        <input
          {...props}
          ref={ref}
          className="dc-switch__input"
          type="checkbox"
          onChange={(event) => {
            onChange?.(event);
            onToggle?.(event.target.checked);
          }}
        />
        <span
          data-testid="switch-track"
          className="dc-switch__track"
          aria-hidden={true}
        >
          <span className="dc-switch__thumb">
            {showCheckIcon && checkIcon}
          </span>
        </span>
      </label>
    );
  },
);
