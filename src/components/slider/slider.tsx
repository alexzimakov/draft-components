import { CSSProperties, ReactNode, useId } from 'react';
import { classNames } from '../../lib/index.js';
import { calcPosition } from './calc-position.js';
import { SliderTickMark, SliderTrack } from './slider-track.js';
import { SliderThumb } from './slider-thumb.js';
import { SliderTickMarks } from './slider-tick-marks.js';

export type SliderProps = {
  'aria-label'?: string;
  id?: string;
  style?: CSSProperties;
  className?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  showLabel?: boolean;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  tickMarks?: SliderTickMark[];
  name?: string;
  step?: number;
  min?: number;
  max?: number;
  value: number;
  format?: (value: number) => ReactNode;
  onChange: (value: number) => void;
};

const numberFormatter = new Intl.NumberFormat();

export function Slider({
  'aria-label': ariaLabel,
  id,
  style,
  className,
  disabled,
  fullWidth,
  showLabel,
  iconLeft,
  iconRight,
  tickMarks,
  step = 1,
  min = 0,
  max = 100,
  name,
  value,
  format = numberFormatter.format,
  onChange,
}: SliderProps) {
  const defaultId = useId();
  const thumbId = id || `${defaultId}slider-thumb`;
  const position = calcPosition(value, { min, max });

  let dataListId: string | undefined;
  let tickMarksElement: ReactNode;
  if (tickMarks && tickMarks.length > 0) {
    dataListId = `${defaultId}slider-datalist`;
    tickMarksElement = (
      <SliderTickMarks
        tickMarks={tickMarks}
        dataListId={dataListId}
        min={min}
        max={max}
      />
    );
  }

  return (
    <div
      style={style}
      className={classNames(className, {
        'dc-slider': true,
        'dc-slider_disabled': disabled,
        'dc-slider_full-width': fullWidth,
      })}
    >
      <div className={classNames({
        'dc-slider__body': true,
        'dc-slider__body_has_labels': showLabel,
        'dc-slider__body_has_tick-marks': tickMarksElement,
      })}>
        {iconLeft}
        <SliderTrack
          positionStart={0}
          positionEnd={position}
        >
          {tickMarksElement}
          <SliderThumb
            id={thumbId}
            name={name}
            aria-label={ariaLabel}
            disabled={disabled}
            showLabel={showLabel}
            dataListId={dataListId}
            position={position}
            step={step}
            min={min}
            max={max}
            value={value}
            onChange={onChange}
            format={format}
          />
        </SliderTrack>
        {iconRight}
      </div>
    </div>
  );
}
