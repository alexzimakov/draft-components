import { classNames } from '../../lib/react-helpers';
import { getAvatarSizeInPixels } from './get-avatar-size-in-pixels';
import {
  makeAvatarShapePath,
  makeRoundShapePath,
} from './make-avatar-shape-path';
import { makeInitials } from './make-initials';
import { AvatarShape } from './avatar-shape';
import { AvatarGroup } from './avatar-group';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import type { AvatarSize, AvatarTint } from './types';
import type { AvatarShapeProps } from './avatar-shape';

export interface AvatarProps extends ComponentPropsWithoutRef<'div'> {
  size?: AvatarSize | number;
  tint?: AvatarTint;
  iconTint?: AvatarTint;
  square?: boolean;
  src?: string;
  alt?: string;
  initials?: ReactNode;
  icon?: ReactNode;
}

export function Avatar({
  size = 'md',
  tint = 'gray',
  iconTint = 'gray',
  square = false,
  src,
  alt,
  initials,
  icon,
  className,
  ...props
}: AvatarProps) {
  const sizeInPixels = getAvatarSizeInPixels(size);
  const path = makeAvatarShapePath({ size: sizeInPixels }, square);

  let subtract: AvatarShapeProps['subtract'] = null;
  let renderedIcon: ReactNode = null;
  if (icon) {
    const iconRatio = 0.38;
    const iconSize = sizeInPixels * iconRatio;
    const iconOffset = sizeInPixels - iconSize;
    const iconGap = Math.max(sizeInPixels * 0.05, 2);
    const subtractSize = iconSize + 2 * iconGap;
    const subtractOffset = sizeInPixels - iconSize - iconGap;

    subtract = (
      <path
        d={makeRoundShapePath({
          size: subtractSize,
          offsetX: subtractOffset,
          offsetY: subtractOffset,
        })}
        fill="#000"
      />
    );
    renderedIcon = (
      <div
        className="dc-avatar__icon"
        style={{
          top: iconOffset,
          left: iconOffset,
          width: iconSize,
          height: iconSize,
          fontSize: iconSize * 0.618,
        }}
      >
        {icon}
      </div>
    );
  }

  return (
    <div
      role="img"
      aria-label={alt}
      className={classNames(className, 'dc-avatar', {
        [`dc-avatar_tint_${tint}`]: tint,
        [`dc-avatar_icon-tint_${iconTint}`]: iconTint,
      })}
      {...props}
    >
      <AvatarShape
        path={path}
        size={sizeInPixels}
        imageUrl={src}
        initials={initials}
        subtract={subtract}
      />
      {renderedIcon}
    </div>
  );
}

Avatar.Group = AvatarGroup;
Avatar.makeInitials = makeInitials;
