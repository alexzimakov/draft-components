import { ComponentPropsWithoutRef, ReactNode } from 'react';
import { classNames } from '../../lib/react-helpers.js';

type EmptyStateHTMLProps = ComponentPropsWithoutRef<'div'>;
type EmptyStateBaseProps = Omit<EmptyStateHTMLProps, 'title'>;
export type EmptyStateProps = {
  image?: ReactNode;
  title?: ReactNode;
  message?: ReactNode;
  primaryAction?: ReactNode;
  secondaryAction?: ReactNode;
} & EmptyStateBaseProps;

export function EmptyState({
  className,
  image,
  title,
  message,
  primaryAction,
  secondaryAction,
  children,
}: EmptyStateProps) {
  return (
    <section className={classNames('dc-empty-state', className)}>
      {image
        ? <div className="dc-empty-state__image">{image}</div>
        : null}
      {title
        ? <h2 className="dc-empty-state__title">{title}</h2>
        : null}
      {message
        ? <div className="dc-empty-state__message">{message}</div>
        : null}
      {primaryAction
        ? <div className="dc-empty-state__primary-action">{primaryAction}</div>
        : null}
      {secondaryAction
        ? <div className="dc-empty-state__secondary-action">{secondaryAction}</div>
        : null}
      {children
        ? <div className="dc-empty-state__content">{children}</div>
        : null}
    </section>
  );
}
