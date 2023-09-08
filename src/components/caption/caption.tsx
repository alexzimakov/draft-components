import { ComponentPropsWithRef, ReactNode, forwardRef } from 'react';
import { classNames } from '../../lib/react-helpers.js';

type CaptionHTMLProps = ComponentPropsWithRef<'div'>;
type CaptionBaseProps = Omit<CaptionHTMLProps, 'color'>;
export type CaptionColor =
  | 'gray'
  | 'blue'
  | 'green'
  | 'orange'
  | 'red';
export type CaptionProps = {
  icon?: ReactNode;
  color?: CaptionColor;
} & CaptionBaseProps;

export const Caption = forwardRef<
  HTMLDivElement,
  CaptionProps
>(function Caption({
  color = 'gray',
  icon,
  children,
  className,
  ...props
}, ref) {
  return (
    <div {...props} ref={ref} className={classNames(className, 'dc-caption', {
      [`dc-caption_color_${color}`]: color,
    })}>
      {icon
        ? <span className="dc-caption__icon">{icon}</span>
        : null}
      {children}
    </div>
  );
});
