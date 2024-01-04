import {
  CSSProperties,
  ChangeEventHandler,
  ReactNode,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { classNames, formatNumber, formatPercent, getCustomPropertyValue } from '../../lib/index.js';
import { SliderRangeLabel } from './slider-range-label.js';
import { SliderRangeDataList, SliderRangeTickMarkDescriptor } from './slider-range-data-list.js';

export type SliderRangeValue = {
  readonly min: number;
  readonly max: number;
};

export type SliderRangeProps = {
  style?: CSSProperties;
  className?: string;
  tickMarks?: SliderRangeTickMarkDescriptor[];
  disabled?: boolean;
  min?: number;
  max?: number;
  step?: number;
  name?: string;
  value: SliderRangeValue;
  onChange: (value: SliderRangeValue) => void;
  renderValue?: (value: number) => ReactNode;
};

type InputKey = keyof SliderRangeValue;
const inputKeys: InputKey[] = ['min', 'max'];
const numberFormatter = new Intl.NumberFormat();

export function SliderRange({
  style,
  className,
  tickMarks,
  disabled,
  min = 0,
  max = 100,
  step = 1,
  name,
  value: range,
  onChange: onChangeRange,
  renderValue = numberFormatter.format,
}: SliderRangeProps) {
  const id = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const labelsContainerRef = useRef<HTMLDivElement>(null);
  const minValueLabelRef = useRef<HTMLOutputElement>(null);
  const maxValueLabelRef = useRef<HTMLOutputElement>(null);
  const rangeLabelRef = useRef<HTMLOutputElement>(null);
  const [focusedInputKey, setFocusedInputKey] = useState<InputKey>('min');

  let dataListId: string | undefined;
  let dataList: ReactNode;
  if (tickMarks && tickMarks.length > 0) {
    dataListId = `${id}data-list`;
    dataList = <SliderRangeDataList id={dataListId} tickMarks={tickMarks} />;
  }

  const handleFocus = (key: InputKey) => () => {
    setFocusedInputKey(key);
  };

  const handleChange = (key: InputKey): ChangeEventHandler<HTMLInputElement> => (event) => {
    const value = Number(event.target.value);
    const { min, max } = range;
    if (key === 'min') {
      onChangeRange({ max, min: Math.min(max, value) });
    } else {
      onChangeRange({ min, max: Math.max(min, value) });
    }
  };

  const activeTrackLeft = calcTrackOffsetInPercent(range.min, {
    min,
    max,
    step,
  });
  const activeTrackRight = calcTrackOffsetInPercent(range.max, {
    min,
    max,
    step,
  });
  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) {
      throw new Error('container ref is not set');
    }

    const labelsContainer = labelsContainerRef.current;
    if (!labelsContainer) {
      throw new Error('labelsContainer ref is not set');
    }

    const minLabel = minValueLabelRef.current;
    if (!minLabel) {
      throw new Error('minValueLabel ref is not set');
    }

    const maxLabel = maxValueLabelRef.current;
    if (!maxLabel) {
      throw new Error('maxValueLabel ref is not set');
    }

    const rangeLabel = rangeLabelRef.current;
    if (!rangeLabel) {
      throw new Error('rangeLabel ref is not set');
    }

    const resizeObserver = new ResizeObserver(() => {
      const thumbWidth = parseFloat(getCustomPropertyValue(
        container,
        '--dc-slider-range-thumb-width',
      ));
      const labelsContainerWidth = getElementWidth(labelsContainer);
      const minLabelWidth = getElementWidth(minLabel);
      const maxLabelWidth = getElementWidth(maxLabel);
      const rangeLabelWidth = getElementWidth(rangeLabel);

      const minLabelOffset = calcLabelOffsetInPixels(minLabelWidth, {
        thumbWidth,
        containerWidth: labelsContainerWidth,
        offsetInPercent: activeTrackLeft,
      });
      setElementTranslateX(minLabel, minLabelOffset);

      const maxLabelOffset = calcLabelOffsetInPixels(maxLabelWidth, {
        thumbWidth,
        containerWidth: labelsContainerWidth,
        offsetInPercent: activeTrackRight,
      });
      setElementTranslateX(maxLabel, maxLabelOffset);

      let rangeLabelOffset: number;
      if (focusedInputKey === 'max') {
        rangeLabelOffset = minLabelOffset;
      } else {
        rangeLabelOffset = (maxLabelOffset + maxLabelWidth) - rangeLabelWidth;
      }
      setElementTranslateX(rangeLabel, rangeLabelOffset);

      const shouldShowRangeLabel = (minLabelOffset + minLabelWidth) >= maxLabelOffset;
      if (shouldShowRangeLabel) {
        minLabel.hidden = true;
        maxLabel.hidden = true;
        rangeLabel.hidden = false;
      } else {
        minLabel.hidden = false;
        maxLabel.hidden = false;
        rangeLabel.hidden = true;
      }
    });

    resizeObserver.observe(labelsContainer);
    return () => resizeObserver.unobserve(labelsContainer);
  }, [focusedInputKey, activeTrackLeft, activeTrackRight]);

  return (
    <div
      ref={containerRef}
      style={{
        ...style,
        '--dc-slider-range-active-track-left': formatPercent(activeTrackLeft),
        '--dc-slider-range-active-track-right': formatPercent(1 - activeTrackRight),
      } as CSSProperties}
      className={classNames(className, {
        'dc-slider-range': true,
        'dc-slider-range_disabled': disabled,
      })}
    >
      <div
        ref={labelsContainerRef}
        className="dc-slider-range__labels-container"
      >
        <SliderRangeLabel
          ref={minValueLabelRef}
          htmlFor={generateInputId(id, 'min')}
        >
          {renderValue(range.min)}
        </SliderRangeLabel>
        <SliderRangeLabel
          ref={maxValueLabelRef}
          htmlFor={generateInputId(id, 'max')}
        >
          {renderValue(range.max)}
        </SliderRangeLabel>
        <SliderRangeLabel
          ref={rangeLabelRef}
          hidden={true}
          htmlFor={[generateInputId(id, 'min'), generateInputId(id, 'max')]}
        >
          {range.min === range.max
            ? <>{renderValue(range.min)}</>
            : <>{renderValue(range.min)} - {renderValue(range.max)}</>}
        </SliderRangeLabel>
      </div>
      <div className="dc-slider-range__track">
        {inputKeys.map((inputKey) => (
          <input
            key={inputKey}
            id={generateInputId(id, inputKey)}
            className={classNames({
              'dc-slider-range__input': true,
              'dc-slider-range__input_active': focusedInputKey === inputKey,
            })}
            type="range"
            min={min}
            max={max}
            step={step}
            list={dataListId}
            name={name ? `${name}[${inputKey}]` : undefined}
            value={range[inputKey]}
            disabled={disabled}
            onChange={handleChange(inputKey)}
            onFocus={handleFocus(inputKey)}
          />
        ))}
      </div>
      {dataList}
    </div>
  );
}

function generateInputId(id: string, inputKey: InputKey): string {
  return `${id}input-range-${inputKey}`;
}

function calcTrackOffsetInPercent(value: number, opts: {
  min: number;
  max: number;
  step: number;
}): number {
  return Math.round(value / opts.step) * opts.step / (opts.max - opts.min);
}

function calcLabelOffsetInPixels(labelWidth: number, opts: {
  thumbWidth: number;
  containerWidth: number;
  offsetInPercent: number;
}): number {
  let offset = (
    (opts.offsetInPercent * opts.containerWidth) -
    (opts.offsetInPercent * opts.thumbWidth) -
    ((labelWidth - opts.thumbWidth) / 2)
  );
  const min = 0;
  const max = opts.containerWidth - labelWidth;
  if (offset < min) {
    offset = min;
  }
  if (offset > max) {
    offset = max;
  }
  return offset;
}

function getElementWidth(element: HTMLElement): number {
  const rect = element.getBoundingClientRect();
  return rect.width;
}

function setElementTranslateX(element: HTMLElement, offsetX: number): void {
  element.style.transform = `translateX(${formatNumber(offsetX)}px)`;
}
