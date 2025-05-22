import { type ReactNode } from 'react';
import { formatPercent } from '../../lib/helpers.js';

export type SliderTickMark = {
  value: number;
  label?: ReactNode;
};

export type SliderTrackProps = {
  positionStart: number;
  positionEnd: number;
  children: ReactNode;
};

export function SliderTrack({
  positionStart,
  positionEnd,
  children,
}: SliderTrackProps) {
  const start = formatPercent(positionStart);
  const end = formatPercent(positionEnd);
  const background = 'linear-gradient('
    + 'to right, '
    + `var(--track-background) ${start}, `
    + `var(--track-background-filled) ${start}, `
    + `var(--track-background-filled) ${end}, `
    + `var(--track-background) ${end}`
    + ')';
  return (
    <div style={{ background }} className="dc-slider__track">
      {children}
    </div>
  );
}
