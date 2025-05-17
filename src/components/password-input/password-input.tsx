import { MouseEventHandler, ReactNode, forwardRef, useState } from 'react';
import { classNames } from '../../lib/react-helpers.js';
import { TextInput, TextInputProps } from '../text-input/index.js';
import { Tooltip } from '../tooltip/index.js';
import { EyeIcon } from '../hero-icons/24/outline/eye-icon.js';
import { EyeSlashIcon } from '../hero-icons/24/outline/eye-slash-icon.js';
import { Spinner } from '../spinner/index.js';

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
  ? <EyeIcon width="1.25em" height="1.25em" />
  : <EyeSlashIcon width="1.25em" height="1.25em" />);

export const PasswordInput = forwardRef<
  HTMLInputElement,
  PasswordInputProps
>(function PasswordInput({
  className,
  loading = false,
  defaultVisible = false,
  getTooltipText = getDefaultTooltipText,
  renderToggleButtonIcon = renderToggleButtonDefaultIcon,
  onClickToggleButton,
  ...props
}, ref) {
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
      ref={ref}
      className={classNames('dc-password-input', className)}
      type={visible ? 'text' : 'password'}
      readOnly={loading ?? props.readOnly}
      slotRight={() => (
        <Tooltip content={getTooltipText(visible)}>
          <button
            className="dc-password-input__toggle-button"
            type="button"
            disabled={loading}
            onClick={handleClickToggleButton}
          >
            {loading
              ? <Spinner width="1.15em" />
              : renderToggleButtonIcon(visible)}
          </button>
        </Tooltip>
      )}
    />
  );
});
