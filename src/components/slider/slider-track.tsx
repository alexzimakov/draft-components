import { ReactNode } from 'react';

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
  const start = `${Math.floor(positionStart * 100)}%`;
  const end = `${Math.floor(positionEnd * 100)}%`;
  const background = 'linear-gradient(' +
    'to right, ' +
    `var(--dc-slider-track-bg) ${start}, ` +
    `var(--dc-slider-active-track-bg) ${start}, ` +
    `var(--dc-slider-active-track-bg) ${end}, ` +
    `var(--dc-slider-track-bg) ${end}` +
    ')';
  return (
    <div style={{ background }} className="dc-slider__track">
      {children}
    </div>
  );
}
