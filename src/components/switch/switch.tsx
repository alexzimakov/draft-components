import { forwardRef, type ComponentPropsWithRef } from 'react';
import { classNames } from '../../lib/react-helpers';

type SwitchHTMLProps = ComponentPropsWithRef<'input'>;
type SwitchBaseProps = Omit<SwitchHTMLProps, 'type'>;
export type SwitchToggleHandler = (checked: boolean) => void;
export type SwitchProps = SwitchBaseProps & {
  showCheckIcon?: boolean,
  onToggle?: SwitchToggleHandler;
};

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  function Switch({
    style = {},
    className = '',
    showCheckIcon = false,
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
            {showCheckIcon && (
              <svg
                data-testid="switch-icon"
                className="dc-switch__icon"
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
            )}
          </span>
        </span>
      </label>
    );
  }
);
