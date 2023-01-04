import { type ComponentPropsWithoutRef } from 'react';
import { classNames } from '../../shared/react-helpers';

type AvatarGroupBaseProps = Omit<ComponentPropsWithoutRef<'div'>, 'children'>;
export type AvatarGroupProps = AvatarGroupBaseProps & {
  children: JSX.Element | JSX.Element[];
};

export function AvatarGroup({
  className,
  children,
  ...props
}: AvatarGroupProps) {
  return (
    <div {...props} className={classNames(className, 'dc-avatar-group')}>
      {children}
    </div>
  );
}
