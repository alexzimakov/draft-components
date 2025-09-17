import { type ComponentProps, type ReactNode } from 'react';
import { classNames } from '../../lib/react-helpers.js';
import { useDialogContext } from './dialog-context.js';
import { IconButton } from '../button/index.js';

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

function XMarkIcon(props: ComponentProps<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={24}
      height={24}
      stroke="currentColor"
      strokeWidth={1.5}
      fill="none"
      {...props}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
    </svg>
  );
}
