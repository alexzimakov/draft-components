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
  'id'?: string;
  'style'?: CSSProperties;
  'className'?: string;
  'disabled'?: boolean;
  'fullWidth'?: boolean;
  'showLabels'?: boolean;
  'iconLeft'?: ReactNode;
  'iconRight'?: ReactNode;
  'tickMarks'?: SliderTickMark[];
  'name'?: string;
  'step'?: number;
  'min'?: number;
  'minThumbName'?: string;
  'minThumbAriaLabel'?: string;
  'max'?: number;
  'maxThumbName'?: string;
  'maxThumbAriaLabel'?: string;
  'format'?: (value: number) => ReactNode;
  'value': RangeSliderValue;
  'onChange': (value: RangeSliderValue) => void;
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
  value,
  format = numberFormatter.format,
  onChange,
}: RangeSliderProps) {
  const defaultId = useId();
  const [activeThumb, setActiveThumb] = useState<'min' | 'max'>('min');
  const positionMin = calcPosition(value.min, { min, max });
  const positionMax = calcPosition(value.max, { min, max });

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

  const handleChangeMin = (min: number) => {
    onChange({
      ...value,
      min: Math.min(value.max, min),
    });
  };

  const handlePointerDownOnMinThumb = () => {
    setActiveThumb('min');
  };

  const handleChangeMax = (max: number) => {
    onChange({
      ...value,
      max: Math.max(value.min, max),
    });
  };

  const handlePointerDownOnMaxThumb = () => {
    setActiveThumb('max');
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
      })}
      >
        {iconLeft}
        <SliderTrack
          positionStart={positionMin}
          positionEnd={positionMax}
        >
          {tickMarksElement}
          <SliderThumb
            name={minThumbName || (name && `${name}[min]`)}
            active={activeThumb === 'min'}
            aria-label={minThumbAriaLabel}
            showLabel={showLabels}
            dataListId={dataListId}
            position={positionMin}
            step={step}
            min={min}
            max={max}
            value={value.min}
            format={format}
            onChange={handleChangeMin}
            onPointerDown={handlePointerDownOnMinThumb}
          />
          <SliderThumb
            name={maxThumbName || (name && `${name}[max]`)}
            active={activeThumb === 'max'}
            aria-label={maxThumbAriaLabel}
            showLabel={showLabels}
            dataListId={dataListId}
            position={positionMax}
            step={step}
            min={min}
            max={max}
            value={value.max}
            format={format}
            onChange={handleChangeMax}
            onPointerDown={handlePointerDownOnMaxThumb}
          />
        </SliderTrack>
        {iconRight}
      </div>
    </fieldset>
  );
}
