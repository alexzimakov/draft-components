import { useState } from 'react';
import { classNames } from '../../lib/react-helpers';
import { TextInput, TextInputProps } from '../text-input';
import { Button } from '../Button';
import { SvgIcon, SvgIconProps } from '../svg-icon';
import { eye } from '../../bootstrap-icons/eye';
import { eyeSlash } from '../../bootstrap-icons/eye-slash';

type BaseProps = Omit<TextInputProps, 'type' | 'trailingAddOn'>;

export interface PasswordInputProps extends BaseProps {
  showPasswordAriaTitle?: string;
  hidePasswordAriaTitle?: string;
}

export function PasswordInput({
  showPasswordAriaTitle = 'Show password',
  hidePasswordAriaTitle = 'Hide password',
  className,
  ...props
}: PasswordInputProps) {
  const [type, setType] = useState<'password' | 'text'>('password');

  let icon: SvgIconProps['icon'] = eyeSlash;
  let title: string = showPasswordAriaTitle;
  if (type === 'text') {
    icon = eye;
    title = hidePasswordAriaTitle;
  }

  return (
    <TextInput
      {...props}
      className={classNames(className, 'dc-password-input')}
      type={type}
      trailingAddOn={
        <Button
          className="dc-password-input__button"
          appearance="minimal"
          noPadding={true}
          leadingIcon={<SvgIcon size="xl" icon={icon} />}
          title={title}
          size="sm"
          onClick={() => setType(type === 'password' ? 'text' : 'password')}
        />
      }
    />
  );
}
