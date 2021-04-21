import * as React from 'react';
import { classNames } from '../../lib';
import { Icon, SvgIcon } from '../svg-icon';
import { warningIcon } from '../svg-icon/icons/warning';
import { errorIcon } from '../svg-icon/icons/error';
import { infoIcon } from '../svg-icon/icons/info';
import { successIcon } from '../svg-icon/icons/success';

export interface BannerAction {
  label: React.ReactNode;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export interface BannerProps extends React.ComponentPropsWithRef<'div'> {
  hasFullWidth?: boolean;
  appearance?: 'default' | 'warning' | 'error' | 'info' | 'success';
  actions?: BannerAction | [BannerAction] | [BannerAction, BannerAction];
}

const bannerIcons: Record<NonNullable<BannerProps['appearance']>, Icon> = {
  error: errorIcon,
  warning: warningIcon,
  success: successIcon,
  info: infoIcon,
  default: infoIcon,
};

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
          <SvgIcon
            className="dc-banner__icon"
            icon={bannerIcons[appearance] || bannerIcons.default}
          />
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
