import * as React from 'react';
import { TextField, TextFieldProps } from '../text-field';
import { IconButton } from '../icon-button';
import { SvgIcon, SvgIconProps } from '../svg-icon';
import { eyeIcon } from '../svg-icon/icons/eye';
import { eyeCloseIcon } from '../svg-icon/icons/eye-close';
import { classNames } from '../../lib';

export type PasswordFieldBaseProps = Omit<
  TextFieldProps,
  'type' | 'trailingAddOn'
>;

export interface PasswordFieldProps extends PasswordFieldBaseProps {
  showPasswordA11yTitle?: string;
  hidePasswordA11yTitle?: string;
}

export function PasswordField({
  showPasswordA11yTitle = 'Show password',
  hidePasswordA11yTitle = 'Hide password',
  className,
  ...props
}: PasswordFieldProps) {
  const [type, setType] = React.useState<TextFieldProps['type']>('password');

  let icon: SvgIconProps['icon'] = eyeCloseIcon;
  let title: string = showPasswordA11yTitle;
  if (type === 'text') {
    icon = eyeIcon;
    title = hidePasswordA11yTitle;
  }

  return (
    <TextField
      {...props}
      className={classNames(className, 'dc-password-field')}
      type={type}
      trailingAddOn={
        <IconButton
          icon={<SvgIcon icon={icon} />}
          title={title}
          type="button"
          onClick={() => setType(type === 'password' ? 'text' : 'password')}
        />
      }
    />
  );
}
