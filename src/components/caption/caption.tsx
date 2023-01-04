import {
  forwardRef,
  type ComponentPropsWithRef,
  type ComponentPropsWithoutRef,
  type ElementType,
} from 'react';
import { classNames } from '../../shared/react-helpers';
import { ErrorIcon, InfoIcon, SuccessIcon, WarningIcon } from './icons';

export type CaptionAppearance =
  | 'default'
  | 'info'
  | 'success'
  | 'error'
  | 'warning';
export type CaptionProps = ComponentPropsWithRef<'div'> & {
  showIcon?: boolean;
  appearance?: CaptionAppearance;
};

const iconMapping: Record<
  CaptionAppearance,
  ElementType<ComponentPropsWithoutRef<'svg'>>
> = {
  default: InfoIcon,
  info: InfoIcon,
  success: SuccessIcon,
  error: ErrorIcon,
  warning: WarningIcon,
};

export const Caption = forwardRef<
  HTMLParagraphElement,
  CaptionProps
>(function Caption({
  showIcon = false,
  appearance = 'default',
  className,
  children,
  ...props
}, ref) {
  let icon: JSX.Element | null = null;
  if (showIcon) {
    const Icon = iconMapping[appearance];
    icon = <Icon className="dc-caption__icon" data-testid="caption-icon" />;
  }

  return (
    <div {...props} ref={ref} className={classNames(className, {
      'dc-caption': true,
      [`dc-caption_appearance_${appearance}`]: appearance,
    })}>
      {icon}
      {children}
    </div>
  );
});
