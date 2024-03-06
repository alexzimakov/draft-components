import { ComponentPropsWithoutRef } from 'react';
import { classNames } from '../../lib/react-helpers.js';

type DialogFooterHTMLProps = ComponentPropsWithoutRef<'div'>;
export type DialogFooterProps = {
  hasDivider?: boolean;
} & DialogFooterHTMLProps;

export function DialogFooter({
  className,
  hasDivider,
  children,
}: DialogFooterProps) {
  return (
    <div className={classNames(className, {
      'dc-dialog-footer': true,
      'dc-dialog-footer_has_divider': hasDivider,
    })}
    >
      {children}
    </div>
  );
}
