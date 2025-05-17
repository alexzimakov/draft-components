import { ComponentProps, ReactNode, forwardRef } from 'react';
import { classNames } from '../../lib/react-helpers.js';

export type CaptionColor =
  | 'gray'
  | 'blue'
  | 'green'
  | 'orange'
  | 'red';

type CaptionHTMLProps = ComponentProps<'div'>;

type CaptionBaseProps = {
  icon?: ReactNode;
  color?: CaptionColor;
};

export type CaptionProps =
  & CaptionBaseProps
  & Omit<CaptionHTMLProps, keyof CaptionBaseProps>;

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
    <div
      {...props}
      ref={ref}
      className={classNames(className, 'dc-caption', {
        [`dc-caption_color_${color}`]: color,
      })}
    >
      {icon
        ? <span className="dc-caption__icon">{icon}</span>
        : null}
      {children}
    </div>
  );
});
