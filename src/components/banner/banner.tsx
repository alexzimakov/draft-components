import * as React from 'react';
import { classNames } from '../../lib/react-helpers';
import { Icon, SvgIcon } from '../svg-icon';
import { exclamationCircleFill } from '../../icons/exclamation-circle-fill';
import { exclamationTriangleFill } from '../../icons/exclamation-triangle-fill';
import { checkCircleFill } from '../../icons/check-circle-fill';
import { infoCircleFill } from '../../icons/info-circle-fill';

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
  error: exclamationCircleFill,
  warning: exclamationTriangleFill,
  success: checkCircleFill,
  info: infoCircleFill,
  default: infoCircleFill,
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
