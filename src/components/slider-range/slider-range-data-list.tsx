import { ReactNode } from 'react';
import { classNames } from '../../lib/index.js';

export type SliderRangeTickMarkDescriptor = {
  value: number;
  label?: ReactNode;
};

export function SliderRangeDataList({
  className,
  id,
  tickMarks,
}: {
  className?: string;
  id: string;
  tickMarks: SliderRangeTickMarkDescriptor[];
}) {
  const renderedOptions: ReactNode[] = [];
  const renderedTickMarks: ReactNode[] = [];
  for (const { value, label } of tickMarks) {
    const key = `${value}-tick-mark`;
    renderedOptions.push(<option key={key} value={value} />);
    renderedTickMarks.push(<li key={key}>{label}</li>);
  }

  return (
    <>
      <datalist id={id}>
        {renderedOptions}
      </datalist>
      <ol className={classNames('dc-slider-range__tick-marks', className)}>
        {renderedTickMarks}
      </ol>
    </>
  );
}
