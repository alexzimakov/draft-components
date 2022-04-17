import { ComponentPropsWithoutRef, forwardRef } from 'react';
import { classNames } from '../../lib/react-helpers';

export type BoxPadding =
  | 'none'
  | '1x'
  | '2x'
  | '3x'
  | '4x'
  | '5x'
  | '6x'
  | '8x';

export type BoxBorderRadius =
  | 'none'
  | '2xs'
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | '2xl';

export type BoxBorder = 'none' | 'primary' | 'secondary';

export type BoxElevation = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type BoxBackground = 'none' | 'primary' | 'secondary' | 'tertiary';

export type BoxProps = {
  padding?: BoxPadding;
  paddingTop?: BoxPadding;
  paddingRight?: BoxPadding;
  paddingBottom?: BoxPadding;
  paddingLeft?: BoxPadding;
  background?: BoxBackground;
  border?: BoxBorder;
  borderRadius?: BoxBorderRadius;
  elevation?: BoxElevation;
} & ComponentPropsWithoutRef<'div'>;

export const Box = forwardRef<HTMLDivElement, BoxProps>(function Box(
  {
    padding = '4x',
    paddingTop,
    paddingRight,
    paddingBottom,
    paddingLeft,
    background = 'primary',
    border = 'primary',
    borderRadius = 'none',
    elevation = 'none',
    className,
    ...props
  },
  ref
) {
  return (
    <div
      ref={ref}
      className={classNames(
        className,
        'dc-box',
        background && `dc-box_bg_${background}`,
        border && `dc-box_border_${border}`,
        borderRadius && `dc-box_border-radius_${borderRadius}`,
        elevation && `dc-box_elevation_${elevation}`,
        padding && `dc-box_p_${padding}`,
        paddingTop && `dc-box_pt_${paddingTop}`,
        paddingRight && `dc-box_pr_${paddingRight}`,
        paddingBottom && `dc-box_pb_${paddingBottom}`,
        paddingLeft && `dc-box_pl_${paddingLeft}`
      )}
      {...props}
    />
  );
});
