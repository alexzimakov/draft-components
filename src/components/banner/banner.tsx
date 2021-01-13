import * as React from 'react';
import { classNames } from '../../lib';
import { SvgIcon, SvgIconProps } from '../svg-icon';
import {
  warningIcon,
  errorIcon,
  infoIcon,
  successIcon,
} from '../svg-icon/icons';

export type FlashMessageHtmlAttrs = React.ComponentPropsWithRef<'div'>;

export interface BannerAction {
  label: React.ReactNode;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export interface BannerProps extends FlashMessageHtmlAttrs {
  hasFullWidth?: boolean;
  appearance?: 'default' | 'warning' | 'error' | 'info' | 'success';
  actions?: BannerAction | [BannerAction] | [BannerAction, BannerAction];
}

export const Banner = React.forwardRef<HTMLDivElement, BannerProps>(
  function FlashMessage(
    {
      hasFullWidth,
      appearance = 'default',
      actions,
      className,
      children,
      ...props
    },
    ref
  ) {
    return (
      <div
        {...props}
        ref={ref}
        className={classNames(
          className,
          'dc-banner',
          `dc-banner_appearance_${appearance}`,
          { 'dc-banner_full_width': hasFullWidth }
        )}
      >
        <div className="dc-banner__body">
          <SvgIcon className="dc-banner__icon" icon={getIcon(appearance)} />
          <div className="dc-banner__content">{children}</div>
        </div>
        {actions ? (
          <div className="dc-banner__actions">
            {(Array.isArray(actions) ? actions : [actions]).map(
              (action, index) => (
                <button
                  key={`banner-action-${index}`}
                  className="dc-banner__action-btn"
                  onClick={action.onClick}
                >
                  {action.label}
                </button>
              )
            )}
          </div>
        ) : null}
      </div>
    );
  }
);

function getIcon(appearance: BannerProps['appearance']): SvgIconProps['icon'] {
  switch (appearance) {
    case 'warning':
      return warningIcon;
    case 'error':
      return errorIcon;
    case 'success':
      return successIcon;
    case 'info':
    case 'default':
    default:
      return infoIcon;
  }
}
