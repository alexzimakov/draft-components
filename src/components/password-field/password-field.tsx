// noinspection ES6PreferShortImport

import * as React from 'react';
import { TextField, TextFieldProps } from '../text-field';
import { Button } from '../button';
import { SvgIcon, SvgIconProps } from '../svg-icon';
import { eye } from '../../icons/eye';
import { eyeSlash } from '../../icons/eye-slash';
import { classNames } from '../../lib';

export type PasswordFieldBaseProps = Omit<
  TextFieldProps,
  'type' | 'trailingAddOn'
>;

export interface PasswordFieldProps extends PasswordFieldBaseProps {
  showPasswordAriaTitle?: string;
  hidePasswordAriaTitle?: string;
}

export function PasswordField({
  showPasswordAriaTitle = 'Show password',
  hidePasswordAriaTitle = 'Hide password',
  className,
  ...props
}: PasswordFieldProps) {
  const [type, setType] = React.useState<TextFieldProps['type']>('password');

  let icon: SvgIconProps['icon'] = eyeSlash;
  let title: string = showPasswordAriaTitle;
  if (type === 'text') {
    icon = eye;
    title = hidePasswordAriaTitle;
  }

  return (
    <TextField
      {...props}
      className={classNames(className, 'dc-password-field')}
      type={type}
      trailingAddOn={
        <Button
          appearance="minimal"
          noPadding={true}
          leadingIcon={<SvgIcon size="xl" icon={icon} />}
          title={title}
          type="button"
          size="sm"
          onClick={() => setType(type === 'password' ? 'text' : 'password')}
        />
      }
    />
  );
}
