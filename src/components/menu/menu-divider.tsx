import { ComponentPropsWithoutRef } from 'react';
import { classNames } from '../../lib/react-helpers';

export function MenuDivider({
  className,
  ...props
}: ComponentPropsWithoutRef<'hr'>) {
  return (
    <hr
      className={classNames('dc-menu__divider', className)}
      data-testid="dc-menu-divider"
      {...props}
    />
  );
}
