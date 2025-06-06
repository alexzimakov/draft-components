import { type ComponentProps } from 'react';
import { classNames } from '../../lib/react-helpers.js';

export type TagStyle = 'default' | 'filled' | 'tinted';

export type TagSize = 'sm' | 'md' | 'lg';

export type TagTint =
  | 'gray'
  | 'green'
  | 'lime'
  | 'sky'
  | 'blue'
  | 'indigo'
  | 'pink'
  | 'red'
  | 'orange'
  | 'yellow';

export type TagElementType =
  | 'abbr'
  | 'b'
  | 'bdo'
  | 'cite'
  | 'code'
  | 'dfn'
  | 'em'
  | 'i'
  | 'kbd'
  | 'samp'
  | 'small'
  | 'span'
  | 'strong'
  | 'var';

type TagHTMLProps = ComponentProps<'strong'>;

type TagBaseProps = {
  as?: TagElementType;
  tagStyle?: TagStyle;
  size?: TagSize;
  tint?: TagTint;
  isRounded?: boolean;
};

export type TagProps =
  & TagBaseProps
  & Omit<TagHTMLProps, keyof TagBaseProps>;

export function Tag({
  as: Component = 'strong',
  tagStyle = 'default',
  size = 'md',
  tint = 'gray',
  isRounded: rounded,
  className,
  children,
  ...props
}: TagProps) {
  return (
    <Component
      {...props}
      className={classNames(className, 'dc-tag', {
        [`dc-tag_${tagStyle}`]: tagStyle,
        [`dc-tag_${size}`]: size,
        [`dc-tag_${tint}`]: tint,
        'dc-tag_rounded': rounded,
      })}
    >
      {children}
    </Component>
  );
}
