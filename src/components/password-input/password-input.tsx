import { ReactNode, forwardRef, useState } from 'react';
import { classNames } from '../../lib/react-helpers';
import { TextInput, TextInputProps } from '../text-input';
import { Tooltip } from '../tooltip';
import { EyeIcon, EyeSlashIcon } from './icons';

export type PasswordInputBaseProps = Omit<TextInputProps, 'type' | 'slotRight'>
export type PasswordInputProps = {
  defaultVisible?: boolean;
  getTooltipText?: (visible: boolean) => ReactNode;
  renderToggleButtonIcon?: (visible: boolean) => ReactNode;
} & PasswordInputBaseProps;

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
  defaultVisible = false,
  getTooltipText = getDefaultTooltipText,
  renderToggleButtonIcon = renderToggleButtonDefaultIcon,
  ...props
}, ref) {
  const [visible, setVisible] = useState(defaultVisible);

  return (
    <TextInput
      {...props}
      ref={ref}
      className={classNames('dc-password-input', className)}
      type={visible ? 'text' : 'password'}
      slotRight={() => (
        <Tooltip content={getTooltipText(visible)}>
          <button
            className="dc-password-input__toggle-button"
            type="button"
            onClick={() => setVisible(!visible)}
          >
            {renderToggleButtonIcon(visible)}
          </button>
        </Tooltip>
      )}
    />
  );
});
