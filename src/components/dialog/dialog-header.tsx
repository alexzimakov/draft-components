import { ComponentPropsWithoutRef, ReactNode } from 'react';
import { classNames } from '../../lib/react-helpers.js';
import { useDialogContext } from './dialog-context.js';
import { IconButton } from '../button/index.js';
import { XMarkIcon } from '../hero-icons/24/outline/x-mark-icon.js';

type DialogHeaderHTMLProps = ComponentPropsWithoutRef<'div'>;
type DialogHeaderBaseProps = Omit<DialogHeaderHTMLProps, 'title'>;
export type DialogHeaderProps = {
  hasDivider?: boolean;
  title?: ReactNode;
  subtitle?: ReactNode;
} & DialogHeaderBaseProps;

export function DialogHeader({
  className,
  hasDivider,
  title,
  subtitle,
  children,
}: DialogHeaderProps) {
  const { titleId, descriptionId, onClose } = useDialogContext();
  return (
    <div className={classNames(className, {
      'dc-dialog-header': true,
      'dc-dialog-header_has_divider': hasDivider,
    })}
    >
      {title
        ? <h3 id={titleId} className="dc-dialog-header__title">{title}</h3>
        : null}
      <IconButton
        buttonStyle="plain"
        className="dc-dialog-header__close-button"
        onClick={() => onClose()}
      >
        <XMarkIcon width={18} height={18} strokeWidth={2} />
      </IconButton>
      {subtitle
        ? <div id={descriptionId} className="dc-dialog-header__subtitle">{subtitle}</div>
        : null}
      {children
        ? <div className="dc-dialog-header__body">{children}</div>
        : null}
    </div>
  );
}
