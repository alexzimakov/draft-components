import { type ComponentProps, type ReactNode } from 'react';
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

export function Caption({
  color = 'gray',
  icon,
  children,
  className,
  ...props
}: CaptionProps) {
  return (
    <div
      {...props}
      className={classNames(className, {
        'dc-caption': true,
        [`dc-caption_color_${color}`]: color,
      })}
    >
      {icon
        ? <span className="dc-caption__icon">{icon}</span>
        : null}
      {children}
    </div>
  );
}
