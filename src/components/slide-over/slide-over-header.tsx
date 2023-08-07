import { ComponentPropsWithoutRef, MouseEventHandler, ReactNode } from 'react';
import { classNames } from '../../lib';
import { IconButton } from '../button';
import { useSlideOverContext } from './slide-over-context';

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
          icon={<XMarkIcon />}
          aria-label={closeButtonAccessibleName}
          variant="tinted"
          size="xs"
          onClick={onCloseButtonClicked}
        />
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

function XMarkIcon(props: ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={20}
      height={20}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );
}
