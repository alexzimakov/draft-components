import { classNames } from '../../lib/react-helpers.js';
import { useDialogContext } from './dialog-context.js';
import { ComponentProps } from 'react';

type DialogFooterHTMLProps = ComponentProps<'div'>;

export type DialogFooterProps = DialogFooterHTMLProps;

export function DialogFooter({
  className,
  ...props
}: DialogFooterProps) {
  const { isBodyHasScroll } = useDialogContext();
  return (
    <div
      className={classNames(className, {
        'dc-dialog__footer': true,
        'dc-dialog__footer_has_scroll-shadow': isBodyHasScroll,
      })}
      {...props}
    />
  );
}
