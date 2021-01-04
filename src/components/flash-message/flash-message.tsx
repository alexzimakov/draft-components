import * as React from 'react';
import { classNames } from '../../lib';
import { SvgIcon, SvgIconProps } from '../svg-icon';

export type FlashMessageHtmlAttrs = React.ComponentPropsWithRef<'div'>;

export interface FlashMessageProps extends FlashMessageHtmlAttrs {
  hasFullWidth?: boolean;
  appearance?: 'default' | 'warning' | 'error' | 'info' | 'success';
  actionButtonLabel?: React.ReactNode;
  onActionButtonClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export const FlashMessage = React.forwardRef<HTMLDivElement, FlashMessageProps>(
  function FlashMessage(
    {
      hasFullWidth,
      appearance = 'default',
      actionButtonLabel,
      onActionButtonClick,
      className,
      children,
      ...props
    },
    ref
  ) {
    if (actionButtonLabel && typeof onActionButtonClick !== 'function') {
      console.warn(
        'You provided a `actionButtonLabel` prop without an `onActionButtonClick` handler. This will render a redundant button element with no actions.'
      );
    }

    return (
      <div
        {...props}
        ref={ref}
        className={classNames(
          className,
          'dc-flash-message',
          `dc-flash-message_appearance_${appearance}`,
          { 'dc-flash-message_full_width': hasFullWidth }
        )}
      >
        <div className="dc-flash-message__body">
          <SvgIcon
            className="dc-flash-message__icon"
            icon={getIcon(appearance)}
          />
          <div className="dc-flash-message__content">{children}</div>
        </div>
        {actionButtonLabel ? (
          <button
            className="dc-flash-message__action-btn"
            onClick={onActionButtonClick}
          >
            {actionButtonLabel}
          </button>
        ) : null}
      </div>
    );
  }
);

function getIcon(
  appearance: FlashMessageProps['appearance']
): SvgIconProps['icon'] {
  switch (appearance) {
    case 'warning':
      return 'warning';
    case 'error':
      return 'error';
    case 'success':
      return 'success';
    case 'info':
    case 'default':
    default:
      return 'info';
  }
}
