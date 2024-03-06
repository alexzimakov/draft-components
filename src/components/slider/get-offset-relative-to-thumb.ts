import { formatNumber, formatPercent } from '../../lib/index.js';

export function getOffsetRelativeToThumb(position: number) {
  return 'calc('
    + `${formatPercent(position)} - `
    + `var(--dc-slider-thumb-width) * ${formatNumber(position / 2)} + `
    + `var(--dc-slider-thumb-width) * ${formatNumber((1 - position) / 2)}`
    + ')';
}
