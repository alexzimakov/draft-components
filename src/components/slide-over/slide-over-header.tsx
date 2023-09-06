import { ComponentPropsWithoutRef, MouseEventHandler, ReactNode } from 'react';
import { classNames } from '../../lib';
import { IconButton } from '../button';
import { useSlideOverContext } from './slide-over-context';
import { XMarkIcon } from '../hero-icons/24/outline/x-mark-icon';

export type SlideOverHeaderHTMLProps = ComponentPropsWithoutRef<'div'>;
export type SlideOverHeaderBaseProps = Omit<SlideOverHeaderHTMLProps, 'title'>;
export type SlideOverHeaderProps = {
  htmlTitle?: SlideOverHeaderHTMLProps['title'];
  title: ReactNode;
  description?: ReactNode;
  closeButtonAccessibleName?: string;
  onClickCloseButton?: MouseEventHandler<HTMLButtonElement>;
} & SlideOverHeaderBaseProps;

export function SlideOverHeader({
  className,
  htmlTitle,
  title,
  children,
  description,
  closeButtonAccessibleName,
  onClickCloseButton,
  ...props
}: SlideOverHeaderProps) {
  const { titleId, descriptionId, closePanel } = useSlideOverContext();
  const onCloseButtonClicked: MouseEventHandler<HTMLButtonElement> = (ev) => {
    closePanel('close-button');
    onClickCloseButton?.(ev);
  };
  return (
    <div
      className={classNames('dc-slide-over-header', className)}
      title={htmlTitle}
      {...props}
    >
      <div className="dc-slide-over-header__title">
        <h2 id={titleId}>
          {title}
        </h2>
        <IconButton
          buttonStyle="tinted"
          size="xs"
          aria-label={closeButtonAccessibleName}
          onClick={onCloseButtonClicked}
        >
          <XMarkIcon width={20} height={20} />
        </IconButton>
      </div>
      {description ? (
        <div id={descriptionId} className="dc-slide-over-header__description">
          {description}
        </div>
      ) : null}
      {children ? (
        <div className="dc-slide-over-header__content">
          {children}
        </div>
      ) : null}
    </div>
  );
}
