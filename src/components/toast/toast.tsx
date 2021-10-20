import { ComponentPropsWithRef, ReactNode } from 'react';
import { classNames } from '../../lib/react-helpers';
import { SvgIcon } from '../svg-icon';
import { ToastButton } from './toast-button';
import { exclamationCircleFill } from '../../icons/exclamation-circle-fill';
import { exclamationTriangleFill } from '../../icons/exclamation-triangle-fill';
import { checkCircleFill } from '../../icons/check-circle-fill';
import { infoCircleFill } from '../../icons/info-circle-fill';

interface BaseToastProps extends ComponentPropsWithRef<'div'> {
  appearance?: 'warning' | 'error' | 'info' | 'success';
  fullWidth?: boolean;
  icon?: ReactNode;
}

export interface ToastProps extends BaseToastProps {
  message: ReactNode;
  informativeText?: ReactNode;
}

const defaultIcons = {
  info: infoCircleFill,
  success: checkCircleFill,
  warning: exclamationTriangleFill,
  error: exclamationCircleFill,
};

export function Toast({
  appearance,
  fullWidth,
  icon,
  message,
  informativeText,
  className,
  children: buttons,
  ...props
}: ToastProps) {
  if (!icon && appearance) {
    icon = <SvgIcon icon={defaultIcons[appearance]} size="1.15em" />;
  }

  return (
    <div
      {...props}
      className={classNames(className, 'dc-toast', {
        'dc-toast_full-width': fullWidth,
        [`dc-toast_appearance_${appearance}`]: appearance,
      })}
    >
      <div className="dc-toast__body">
        {icon && <div className="dc-toast__icon">{icon}</div>}
        <div className="dc-toast__content">
          {message && <h3 className="dc-toast__message">{message}</h3>}
          {informativeText && (
            <p className="dc-toast__informative-text">{informativeText}</p>
          )}
        </div>
      </div>

      {buttons && <div className="dc-toast__btns">{buttons}</div>}
    </div>
  );
}

Toast.Button = ToastButton;
