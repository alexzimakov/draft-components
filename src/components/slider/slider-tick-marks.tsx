import { type ReactNode } from 'react';
import { getOffsetRelativeToThumb } from './get-offset-relative-to-thumb.js';
import { calcPosition } from './calc-position.js';

export type SliderTickMark = {
  value: number;
  label?: ReactNode;
};

export type SliderTickMarksProps = {
  dataListId: string;
  min: number;
  max: number;
  tickMarks: SliderTickMark[];
};

export function SliderTickMarks({
  dataListId,
  min,
  max,
  tickMarks,
}: SliderTickMarksProps) {
  const options: ReactNode[] = [];
  const listItems: ReactNode[] = [];
  for (let index = 0; index < tickMarks.length; index += 1) {
    const { value, label } = tickMarks[index];
    const key = `tick-mark-${value}:${index}`;

    options.push(
      <option
        key={key}
        value={value}
        data-testid="slider-data-list-option"
      >
        {label}
      </option>,
    );

    listItems.push(
      <li
        className="dc-slider__tick-mark"
        key={key}
        data-value={value}
        style={{
          left: getOffsetRelativeToThumb(calcPosition(value, { min, max })),
        }}
      />,
    );
  }

  return (
    <>
      <datalist id={dataListId}>
        {options}
      </datalist>
      <ol className="dc-slider__tick-marks">
        {listItems}
      </ol>
    </>
  );
}
