import { AvatarSize } from './types';

export const AVATAR_SIZE_IN_PIXELS: Record<AvatarSize, number> = {
  xs: 28,
  sm: 36,
  md: 44,
  lg: 52,
  xl: 60,
};

export function getAvatarSizeInPixels(size: AvatarSize | number): number {
  if (typeof size === 'number' && Number.isFinite(size)) {
    return size;
  }

  return AVATAR_SIZE_IN_PIXELS[size as AvatarSize] || AVATAR_SIZE_IN_PIXELS.md;
}
