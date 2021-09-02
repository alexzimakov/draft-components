import { ComponentPropsWithRef, ReactNode } from 'react';
import { classNames } from '../../lib/react-helpers';
import { SvgIcon } from '../svg-icon';
import { ToastButton } from './toast-button';
import { exclamationCircleFill } from '../../icons/exclamation-circle-fill';
import { exclamationTriangleFill } from '../../icons/exclamation-triangle-fill';
import { checkCircleFill } from '../../icons/check-circle-fill';
import { infoCircleFill } from '../../icons/info-circle-fill';

interface BaseToastProps extends ComponentPropsWithRef<'section'> {
  appearance?: 'warning' | 'error' | 'info' | 'success';
  fullWidth?: boolean;
  icon?: ReactNode;
}

export type ToastProps = BaseToastProps &
  (
    | { heading: ReactNode; message?: ReactNode }
    | { heading?: ReactNode; message: ReactNode }
  );

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
  heading,
  message,
  className,
  children: buttons,
  ...props
}: ToastProps) {
  if (!icon && appearance) {
    icon = <SvgIcon icon={defaultIcons[appearance]} size="1.15em" />;
  }

  return (
    <section
      {...props}
      className={classNames(className, 'dc-toast', {
        'dc-toast_full-width': fullWidth,
        [`dc-toast_appearance_${appearance}`]: appearance,
      })}
    >
      <div className="dc-toast__body">
        {icon && <div className="dc-toast__icon">{icon}</div>}
        <div className="dc-toast__content">
          {heading && <h3 className="dc-toast__heading">{heading}</h3>}
          {message && <p className="dc-toast__message">{message}</p>}
        </div>
      </div>

      {buttons && <div className="dc-toast__btns">{buttons}</div>}
    </section>
  );
}

Toast.Button = ToastButton;
