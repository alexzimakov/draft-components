import { ComponentProps, ReactNode } from 'react';
import { classNames } from '../../lib/react-helpers.js';

type EmptyStateHTMLProps = ComponentProps<'div'>;

type EmptyStateBaseProps = {
  image?: ReactNode;
  title?: ReactNode;
  message?: ReactNode;
  primaryAction?: ReactNode;
  secondaryAction?: ReactNode;
  fullHeight?: boolean;
};

export type EmptyStateProps =
  & EmptyStateBaseProps
  & Omit<EmptyStateHTMLProps, keyof EmptyStateBaseProps>;

export function EmptyState({
  className,
  image,
  title,
  message,
  primaryAction,
  secondaryAction,
  fullHeight,
  children,
  ...props
}: EmptyStateProps) {
  return (
    <div
      {...props}
      className={classNames(className, {
        'dc-empty-state': true,
        'dc-empty-state_full_height': fullHeight,
      })}
    >
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
    </div>
  );
}
