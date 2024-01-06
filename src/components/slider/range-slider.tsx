import { CSSProperties, ReactNode, useId, useState } from 'react';
import { classNames } from '../../lib/index.js';
import { calcPosition } from './calc-position.js';
import { SliderTickMark, SliderTrack } from './slider-track.js';
import { SliderThumb } from './slider-thumb.js';
import { SliderTickMarks } from './slider-tick-marks.js';

export type RangeSliderValue = {
  readonly min: number;
  readonly max: number;
};

export type RangeSliderProps = {
  'aria-label'?: string;
  id?: string;
  style?: CSSProperties;
  className?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  showLabels?: boolean;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  tickMarks?: SliderTickMark[];
  name?: string;
  step?: number;
  min?: number;
  minThumbName?: string;
  minThumbAriaLabel?: string;
  max?: number;
  maxThumbName?: string;
  maxThumbAriaLabel?: string;
  value: RangeSliderValue;
  onChange: (value: RangeSliderValue) => void;
  formatValue?: (value: number) => ReactNode;
};

const numberFormatter = new Intl.NumberFormat();

export function RangeSlider({
  'aria-label': ariaLabel,
  id,
  style,
  className,
  disabled,
  fullWidth,
  showLabels,
  iconLeft,
  iconRight,
  tickMarks,
  step = 1,
  min = 0,
  minThumbName,
  minThumbAriaLabel,
  max = 100,
  maxThumbName,
  maxThumbAriaLabel,
  name,
  value: range,
  onChange,
  formatValue = numberFormatter.format,
}: RangeSliderProps) {
  const defaultId = useId();
  const [focusedThumb, setFocusedThumb] = useState<'min' | 'max'>('min');
  const positionMin = calcPosition(range.min, { min, max });
  const positionMax = calcPosition(range.max, { min, max });

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

  const handleChangeMin = (value: number) => {
    onChange({
      ...range,
      min: Math.min(range.max, value),
    });
  };

  const handleFocusMinThumb = () => {
    setFocusedThumb('min');
  };

  const handleChangeMax = (value: number) => {
    onChange({
      ...range,
      max: Math.max(range.min, value),
    });
  };

  const handleFocusMaxThumb = () => {
    setFocusedThumb('max');
  };

  return (
    <fieldset
      id={id}
      style={style}
      className={classNames(className, {
        'dc-slider': true,
        'dc-slider_range': true,
        'dc-slider_disabled': disabled,
        'dc-slider_full-width': fullWidth,
      })}
      name={name}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      <div className={classNames({
        'dc-slider__body': true,
        'dc-slider__body_has_labels': showLabels,
        'dc-slider__body_has_tick-marks': tickMarksElement,
      })}>
        {iconLeft}
        <SliderTrack
          positionStart={positionMin}
          positionEnd={positionMax}
        >
          {tickMarksElement}
          <SliderThumb
            name={minThumbName || (name && `${name}[min]`)}
            active={focusedThumb === 'min'}
            aria-label={minThumbAriaLabel}
            showLabel={showLabels}
            dataListId={dataListId}
            position={positionMin}
            step={step}
            min={min}
            max={max}
            value={range.min}
            formatValue={formatValue}
            onChange={handleChangeMin}
            onFocus={handleFocusMinThumb}
          />
          <SliderThumb
            name={maxThumbName || (name && `${name}[max]`)}
            active={focusedThumb === 'max'}
            aria-label={maxThumbAriaLabel}
            showLabel={showLabels}
            dataListId={dataListId}
            position={positionMax}
            step={step}
            min={min}
            max={max}
            value={range.max}
            formatValue={formatValue}
            onChange={handleChangeMax}
            onFocus={handleFocusMaxThumb}
          />
        </SliderTrack>
        {iconRight}
      </div>
    </fieldset>
  );
}
