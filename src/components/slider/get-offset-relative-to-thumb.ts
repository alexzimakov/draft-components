import { formatNumber } from '../../lib/index.js';

export function getOffsetRelativeToThumb(position: number) {
  return 'calc(' +
    `${Math.floor(position * 100)}% - ` +
    `var(--dc-slider-thumb-width) * ${formatNumber(position / 2)} + ` +
    `var(--dc-slider-thumb-width) * ${formatNumber((1 - position) / 2)}` +
    ')';
}
