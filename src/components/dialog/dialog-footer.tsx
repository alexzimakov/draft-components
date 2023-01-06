import { type ComponentPropsWithoutRef } from 'react';
import { classNames } from '../../lib/react-helpers';

type DialogFooterHTMLProps = ComponentPropsWithoutRef<'div'>;
export type DialogFooterProps = DialogFooterHTMLProps;

export function DialogFooter({
  className,
  children,
}: DialogFooterProps) {
  return (
    <div className={classNames('dc-dialog-footer', className)}>
      {children}
    </div>
  );
}
