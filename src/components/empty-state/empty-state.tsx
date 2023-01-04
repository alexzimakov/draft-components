import { type ComponentPropsWithoutRef, type ReactNode } from 'react';
import { classNames } from '../../shared/react-helpers';

type EmptyStateHTMLProps = ComponentPropsWithoutRef<'div'>;
export type EmptyStateProps = {
  image?: ReactNode;
  heading?: ReactNode;
  description?: ReactNode;
  primaryAction?: ReactNode;
  secondaryAction?: ReactNode;
} & EmptyStateHTMLProps;

export function EmptyState({
  className,
  image,
  heading,
  description,
  primaryAction,
  secondaryAction,
  children,
}: EmptyStateProps) {
  return (
    <section className={classNames('dc-empty-state', className)}>
      {Boolean(image) && (
        <div className="dc-empty-state__image">{image}</div>
      )}
      {Boolean(heading) && (
        <h1 className="dc-empty-state__heading">{heading}</h1>
      )}
      {Boolean(description) && (
        <div className="dc-empty-state__description">{description}</div>
      )}
      {Boolean(primaryAction) && (
        <div className="dc-empty-state__primary-action">{primaryAction}</div>
      )}
      {Boolean(secondaryAction) && (
        <div className="dc-empty-state__secondary-action">{secondaryAction}</div>
      )}
      {Boolean(children) && (
        <div className="dc-empty-state__content">{children}</div>
      )}
    </section>
  );
}
