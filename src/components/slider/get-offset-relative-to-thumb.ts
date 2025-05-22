import { roundNumber, formatPercent } from '../../lib/helpers.js';

export function getOffsetRelativeToThumb(position: number) {
  return 'calc('
    + `${formatPercent(position)} - `
    + `var(--thumb-width) * ${roundNumber(position / 2)} + `
    + `var(--thumb-width) * ${roundNumber((1 - position) / 2)}`
    + ')';
}
