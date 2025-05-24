import { classNames } from '../../lib/react-helpers.js';
import { useDialogContext } from './dialog-context.js';
import { type ComponentProps, type ReactNode } from 'react';
import { IconButton } from '../button/index.js';
import { XMarkIcon } from '../hero-icons/24/outline/x-mark-icon.js';

type DialogHeaderHTMLProps = ComponentProps<'div'>;

type DialogHeaderBaseProps = {
  title?: ReactNode;
  contentAlign?: 'left' | 'right' | 'center';
};

export type DialogHeaderProps =
  & DialogHeaderBaseProps
  & Omit<DialogHeaderHTMLProps, keyof DialogHeaderBaseProps>;

export function DialogHeader({
  className,
  title,
  children,
  contentAlign = 'left',
  ...props
}: DialogHeaderProps) {
  const { titleId, isBodyHasScroll, onClose } = useDialogContext();

  return (
    <div
      className={classNames(className, {
        'dc-dialog__section': true,
        'dc-dialog__header': true,
        'dc-dialog__header_has_scroll-shadow': isBodyHasScroll,
        [`dc-dialog__header_content-align_${contentAlign}`]: contentAlign,
      })}
      {...props}
    >
      {title
        ? <h2 id={titleId} className="dc-dialog__title">{title}</h2>
        : null}
      <IconButton
        className="dc-dialog__close-button"
        buttonStyle="plain"
        onClick={onClose}
      >
        <XMarkIcon width={18} height={18} strokeWidth={2} />
      </IconButton>
      {children
        ? <div className="dc-dialog__header-body">{children}</div>
        : null}
    </div>
  );
}
