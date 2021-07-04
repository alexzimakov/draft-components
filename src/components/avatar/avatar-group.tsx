import { classNames } from '../../lib/react-helpers';
import { getAvatarSizeInPixels } from './get-avatar-size-in-pixels';
import { makeAvatarShapePath } from './make-avatar-shape-path';
import { AvatarShape } from './avatar-shape';
import type { ComponentPropsWithoutRef, ReactNode, CSSProperties } from 'react';
import type { AvatarSize, AvatarTint } from './types';

export interface AvatarItem {
  tint?: AvatarTint;
  src?: string;
  initials?: ReactNode;
}

export interface AvatarGroupProps extends ComponentPropsWithoutRef<'ul'> {
  items: AvatarItem[];
  size?: AvatarSize | number;
  square?: boolean;
  alt?: string;
}

export function AvatarGroup({
  items,
  size = 'md',
  square = false,
  alt,
  className,
  ...props
}: AvatarGroupProps) {
  const sizeInPixels = getAvatarSizeInPixels(size);
  const offsetX = -sizeInPixels / 2;
  const itemGap = Math.max(sizeInPixels * 0.05, 2);
  const path = makeAvatarShapePath({ size: sizeInPixels }, square);
  const subtract = (
    <path
      d={makeAvatarShapePath({ size: sizeInPixels, offsetX }, square)}
      fill="#000"
    />
  );
  const renderedItems = [
    renderItem({
      ...items[0],
      index: 0,
      path: path,
      size: sizeInPixels,
    }),
  ];
  for (let i = 1; i < items.length; i += 1) {
    renderedItems.push(
      renderItem({
        ...items[i],
        index: i,
        path: path,
        size: sizeInPixels,
        subtract: subtract,
        style: { marginLeft: offsetX + itemGap },
      })
    );
  }

  return (
    <ul
      role="img"
      aria-label={alt}
      className={classNames(className, 'dc-avatar-group')}
      {...props}
    >
      {renderedItems}
    </ul>
  );
}

function renderItem(
  props: AvatarItem & {
    index: number;
    size: number;
    path: string;
    style?: CSSProperties;
    subtract?: ReactNode;
  }
): JSX.Element {
  return (
    <li
      key={`avatar-item-${props.index}`}
      data-testid="avatar-group-item"
      style={props.style}
      className={classNames('dc-avatar', {
        [`dc-avatar_tint_${props.tint}`]: props.tint,
      })}
    >
      <AvatarShape
        size={props.size}
        path={props.path}
        imageUrl={props.src}
        initials={props.initials}
        subtract={props.subtract}
      />
    </li>
  );
}
