import { ComponentPropsWithoutRef, ReactNode } from 'react';
import { classNames } from '../../lib/react-helpers';
import { useDialogContext } from './dialog-context';
import { IconButton } from '../button';
import { XMarkIcon } from './x-mark-icon';

type DialogHeaderHTMLProps = ComponentPropsWithoutRef<'div'>;
export type DialogHeaderProps = {
  hasBorder?: boolean;
  heading?: ReactNode;
  subheading?: ReactNode;
} & DialogHeaderHTMLProps;

export function DialogHeader({
  hasBorder,
  heading,
  subheading,
  className,
  children,
}: DialogHeaderProps) {
  const {
    titleId,
    descriptionId,
    onClose,
  } = useDialogContext();
  const shouldRenderHeading = Boolean(heading);
  const shouldRenderDescription = Boolean(subheading);
  const shouldRenderChildren = Boolean(children);

  return (
    <div className={classNames(className, {
      'dc-dialog-header': true,
      'dc-dialog-header_has_border': hasBorder,
    })}>
      <div className="dc-dialog-header__title-bar">
        {shouldRenderHeading && (
          <h2 id={titleId} className="dc-dialog-header__heading">
            {heading}
          </h2>
        )}
        <IconButton
          icon={<XMarkIcon width={18} height={18} strokeWidth={2} />}
          variant="plain"
          className="dc-dialog-header__close-btn"
          onClick={() => onClose()}
        />
      </div>
      {shouldRenderDescription && (
        <div id={descriptionId} className="dc-dialog-header__subheading">
          {subheading}
        </div>
      )}
      {shouldRenderChildren && (
        <div className="dc-dialog-header__body">
          {children}
        </div>
      )}
    </div>
  );
}
