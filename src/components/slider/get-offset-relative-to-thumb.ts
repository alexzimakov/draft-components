import { roundNumber, formatPercent } from '../../lib/index.js';

export function getOffsetRelativeToThumb(position: number) {
  return 'calc('
    + `${formatPercent(position)} - `
    + `var(--dc-slider-thumb-width) * ${roundNumber(position / 2)} + `
    + `var(--dc-slider-thumb-width) * ${roundNumber((1 - position) / 2)}`
    + ')';
}
