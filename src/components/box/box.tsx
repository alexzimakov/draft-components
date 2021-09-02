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
export interface BoxProps extends ComponentPropsWithoutRef<'div'> {
  padding?: BoxPadding;
  paddingTop?: BoxPadding;
  paddingRight?: BoxPadding;
  paddingBottom?: BoxPadding;
  paddingLeft?: BoxPadding;
  background?: 'none' | 'primary' | 'secondary' | 'tertiary';
  border?: 'none' | 'primary' | 'secondary';
  borderRadius?: 'none' | '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  elevation?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

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
        `dc-box_bg_${background}`,
        `dc-box_border_${border}`,
        `dc-box_border-radius_${borderRadius}`,
        `dc-box_elevation_${elevation}`,
        `dc-box_p_${padding}`,
        paddingTop && `dc-box_pt_${paddingTop}`,
        paddingRight && `dc-box_pr_${paddingRight}`,
        paddingBottom && `dc-box_pb_${paddingBottom}`,
        paddingLeft && `dc-box_pl_${paddingLeft}`
      )}
      {...props}
    />
  );
});
