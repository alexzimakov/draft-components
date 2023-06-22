import { type JSX, type ReactNode } from 'react';

export type RenderTickMarkLabel = (index: number) => ReactNode;
export type SliderTickMarksProps = {
  tickMarksCount: number;
  renderTickMarkLabel?: RenderTickMarkLabel;
};

export function SliderTickMarks({
  tickMarksCount,
  renderTickMarkLabel,
}: SliderTickMarksProps) {
  if (tickMarksCount < 1) {
    return null;
  }

  const tickMarks: JSX.Element[] = [];
  for (let index = 0; index < tickMarksCount; index += 1) {
    const label = renderTickMarkLabel?.(index);
    tickMarks.push((
      <div key={index} className="dc-slider-tick-mark" data-testid="tick-mark">
        {Boolean(label) && (
          <span className="dc-slider-tick-mark__label">
            {label}
          </span>
        )}
      </div>
    ));
  }

  return <div className="dc-slider__tick-marks">{tickMarks}</div>;
}
