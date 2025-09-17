import { type ComponentProps, type MouseEventHandler, type ReactNode, useState } from 'react';
import { classNames } from '../../lib/react-helpers.js';
import { TextInput, type TextInputProps } from '../text-input/index.js';
import { Tooltip } from '../tooltip/index.js';
import { Spinner } from '../spinner/index.js';
import { Button } from '../button/index.js';

type PasswordInputBaseProps = Omit<TextInputProps, 'type' | 'slotRight'>;

export type PasswordInputProps = PasswordInputBaseProps & {
  loading?: boolean;
  defaultVisible?: boolean;
  getTooltipText?: (visible: boolean) => ReactNode;
  renderToggleButtonIcon?: (visible: boolean) => ReactNode;
  onClickToggleButton?: MouseEventHandler<HTMLButtonElement>;
};

const getDefaultTooltipText = (visible: boolean) => (visible
  ? 'Hide password'
  : 'Show password');

const renderToggleButtonDefaultIcon = (visible: boolean) => (visible
  ? <EyeSlashIcon width="1.25em" height="1.25em" />
  : <EyeIcon width="1.25em" height="1.25em" />);

export function PasswordInput({
  className,
  loading = false,
  defaultVisible = false,
  getTooltipText = getDefaultTooltipText,
  renderToggleButtonIcon = renderToggleButtonDefaultIcon,
  onClickToggleButton,
  ...props
}: PasswordInputProps) {
  const [visible, setVisible] = useState(defaultVisible);

  const handleClickToggleButton: MouseEventHandler<HTMLButtonElement> = (event) => {
    setVisible(!visible);
    if (typeof onClickToggleButton === 'function') {
      onClickToggleButton(event);
    }
  };

  return (
    <TextInput
      {...props}
      className={classNames('dc-password-input', className)}
      type={visible ? 'text' : 'password'}
      readOnly={loading ?? props.readOnly}
      slotRight={() => (
        <Tooltip title={getTooltipText(visible)}>
          {(props) => (
            <Button
              {...props}
              className="dc-password-input__toggle-button"
              buttonStyle="plain"
              onClick={handleClickToggleButton}
            >
              {loading
                ? <Spinner width="1.15em" />
                : renderToggleButtonIcon(visible)}
            </Button>
          )}
        </Tooltip>
      )}
    />
  );
}

function EyeIcon(props: ComponentProps<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={24}
      height={24}
      stroke="currentColor"
      strokeWidth={1.5}
      fill="none"
      {...props}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
    </svg>
  );
}

function EyeSlashIcon(props: ComponentProps<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={24}
      height={24}
      stroke="currentColor"
      strokeWidth={1.5}
      fill="none"
      {...props}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
    </svg>
  );
}
