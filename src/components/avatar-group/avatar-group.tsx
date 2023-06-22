import { type ComponentPropsWithoutRef, type JSX } from 'react';
import { classNames } from '../../lib/react-helpers';

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
