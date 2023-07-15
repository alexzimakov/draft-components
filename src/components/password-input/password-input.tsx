import { ComponentPropsWithoutRef, ElementType, forwardRef, useState } from 'react';
import { classNames } from '../../lib/react-helpers';
import { TextInput, TextInputProps, TextInputRenderAddOn } from '../text-input';
import { Tooltip } from '../tooltip';
import { EyeIcon, EyeSlashIcon } from './icons';

type PasswordInputBaseProps = Omit<TextInputProps, 'type' | 'rightAddOn'>
export type PasswordInputProps = {
  isDefaultVisible?: boolean;
  showPasswordTitle?: string;
  hidePasswordTitle?: string;
} & PasswordInputBaseProps;

export const PasswordInput = forwardRef<
  HTMLInputElement,
  PasswordInputProps
>(function PasswordInput({
  isDefaultVisible = false,
  showPasswordTitle = 'Show password',
  hidePasswordTitle = 'Hide password',
  className,
  ...props
}, ref) {
  const [visible, setVisible] = useState(isDefaultVisible);

  let type: TextInputProps['type'];
  let content: string;
  let Icon: ElementType<ComponentPropsWithoutRef<'svg'>>;
  if (visible) {
    type = 'text';
    content = hidePasswordTitle;
    Icon = EyeIcon;
  } else {
    type = 'password';
    content = showPasswordTitle;
    Icon = EyeSlashIcon;
  }

  const handleButtonClick = () => setVisible(!visible);
  const renderRightAddOn: TextInputRenderAddOn = ({ className }) => (
    <div className={classNames('dc-password-input__right-addon', className)}>
      <Tooltip content={content}>
        <button
          className="dc-password-input__btn"
          type="button"
          onClick={handleButtonClick}
        >
          <Icon className="dc-password-input__icon" aria-hidden={true} />
        </button>
      </Tooltip>
    </div>
  );

  return (
    <TextInput
      {...props}
      className={classNames('dc-password-input', className)}
      ref={ref}
      type={type}
      rightAddOn={renderRightAddOn}
    />
  );
});
