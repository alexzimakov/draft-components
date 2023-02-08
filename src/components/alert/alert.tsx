import { type ComponentPropsWithRef, type ReactNode, forwardRef } from 'react';
import { classNames } from '../../lib/react-helpers';

type AlertHTMLProps = ComponentPropsWithRef<'section'>;
export type AlertAppearance =
  | 'default'
  | 'info'
  | 'success'
  | 'warning'
  | 'error';
export type AlertVariant =
  | 'default'
  | 'full-width'
  | 'accent-border'
export type AlertProps = {
  icon?: JSX.Element | null;
  heading?: ReactNode;
  variant?: AlertVariant;
  appearance?: AlertAppearance;
} & AlertHTMLProps;

export const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert({
  icon = null,
  heading = null,
  variant = 'default',
  appearance = 'default',
  className,
  children,
  ...props
}, ref) {
  const shouldShowIcon = Boolean(icon);
  const shouldRenderHeading = Boolean(heading);
  const shouldRenderContent = Boolean(children);

  return (
    <section
      {...props}
      ref={ref}
      className={classNames(className, {
        'dc-alert': true,
        'dc-alert_has_icon': shouldShowIcon,
        [`dc-alert_variant_${variant}`]: variant,
        [`dc-alert_appearance_${appearance}`]: appearance,
      })}
    >
      {shouldShowIcon && <div className="dc-alert__icon">{icon}</div>}
      <div className="dc-alert__body">
        {shouldRenderHeading && (
          <h1 className="dc-alert__title">{heading}</h1>
        )}
        {shouldRenderContent && (
          <div className="dc-alert__content">{children}</div>
        )}
      </div>
    </section>
  );
});
