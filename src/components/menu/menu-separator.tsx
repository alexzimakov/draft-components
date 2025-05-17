import { type ComponentProps } from 'react';
import { classNames } from '../../lib/react-helpers.js';

export type MenuSeparatorProps = ComponentProps<'hr'>;

export function MenuSeparator({
  className,
  ...props
}: MenuSeparatorProps) {
  return (
    <hr {...props} className={classNames('dc-menu-separator', className)} />
  );
}
