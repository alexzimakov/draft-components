import { type ComponentProps } from 'react';
import { classNames } from '../../lib/react-helpers.js';

export type SwitchToggleHandler = (checked: boolean) => void;

type SwitchHTMLProps = ComponentProps<'input'>;

type SwitchBaseProps = {
  showCheckIcon?: boolean;
  onToggle?: SwitchToggleHandler;
};

export type SwitchProps =
  & SwitchBaseProps
  & Omit<SwitchHTMLProps, keyof SwitchBaseProps>;

export function Switch({
  showCheckIcon = true,
  style,
  className,
  onChange,
  onToggle,
  ...props
}: SwitchProps) {
  return (
    <label style={style} className={classNames('dc-switch', className)}>
      <input
        {...props}
        className="dc-switch__input"
        type="checkbox"
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
        data-testid="switch-track"
        className="dc-switch__track"
        aria-hidden={true}
      >
        <span className="dc-switch__thumb">
          {showCheckIcon && (
            <CheckIcon
              className="dc-switch__icon"
              data-testid="switch-check-icon"
            />
          )}
        </span>
      </span>
    </label>
  );
};

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
        d="M6 10.353L9 13L13.5 7"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
