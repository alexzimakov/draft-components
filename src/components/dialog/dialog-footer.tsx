import { type ComponentPropsWithoutRef } from 'react';
import { classNames } from '../../lib/react-helpers';

type DialogFooterHTMLProps = ComponentPropsWithoutRef<'div'>;
export type DialogFooterProps = {
  hasBorder?: boolean;
} & DialogFooterHTMLProps;

export function DialogFooter({
  hasBorder,
  className,
  children,
}: DialogFooterProps) {
  return (
    <div className={classNames(className, {
      'dc-dialog-footer': true,
      'dc-dialog-footer_has_border': hasBorder,
    })}>
      {children}
    </div>
  );
}
