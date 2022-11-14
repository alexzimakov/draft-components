import { ComponentPropsWithoutRef, KeyboardEvent, ReactNode } from 'react';
import { isFunction } from '../../lib/guards';
import { classNames } from '../../lib/react-helpers';
import { KeyCode, similarToClick } from '../../lib/keyboard-helpers';
import { Button } from '../Button';

type SegmentId = string | number;

export interface Segment<T extends SegmentId> {
  value: T;
  label: ReactNode;
  icon?: ReactNode;
}

export interface SegmentedControlProps<T extends SegmentId>
  extends ComponentPropsWithoutRef<'ul'> {
  size?: 'sm' | 'md' | 'lg';
  items: Segment<T>[];
  selectedValue: Segment<T>['value'];
  onChangeSelectedValue(value: Segment<T>['value']): void;
}

export function SegmentedControl<T extends SegmentId>({
  size = 'md',
  items,
  selectedValue,
  onChangeSelectedValue,
  className,
  onKeyDown,
  ...props
}: SegmentedControlProps<T>) {
  function selectSegment(segment: Segment<T>) {
    if (segment.value !== selectedValue) {
      onChangeSelectedValue(segment.value);
    }
  }

  function handleKeyDown(event: KeyboardEvent<HTMLUListElement>) {
    const code = event.code;
    if (
      code === KeyCode.home ||
      code === KeyCode.end ||
      code === KeyCode.arrowLeft ||
      code === KeyCode.arrowRight
    ) {
      event.preventDefault();

      const segments = event.currentTarget.getElementsByTagName('li');
      const segmentsCount = segments.length;

      let nextSegment: number;
      if (code === KeyCode.home) {
        nextSegment = 0;
      } else if (code === KeyCode.end) {
        nextSegment = segmentsCount - 1;
      } else {
        nextSegment = Array.prototype.indexOf.call(
          event.currentTarget.children,
          document.activeElement
        );
        if (code === KeyCode.arrowLeft) {
          nextSegment -= 1;
          if (nextSegment < 0) {
            nextSegment = segmentsCount - 1;
          }
        } else {
          nextSegment += 1;
          if (nextSegment >= segmentsCount) {
            nextSegment = 0;
          }
        }
      }

      segments[nextSegment].focus();
    }

    isFunction(onKeyDown) && onKeyDown(event);
  }

  return (
    <ul
      {...props}
      className={classNames(
        className,
        'dc-segmented-control',
        `dc-segmented-control_size_${size}`
      )}
      role="radiogroup"
      onKeyDown={handleKeyDown}
    >
      {items.map((segment) => {
        const isSelected = segment.value === selectedValue;
        return (
          <Button
            key={segment.value}
            size={size}
            className="dc-segmented-control__radio-btn"
            appearance={isSelected ? 'default' : 'minimal'}
            leadingIcon={segment.icon}
            renderAs={(props) => (
              <li
                {...props}
                role="radio"
                aria-checked={isSelected}
                tabIndex={isSelected ? 0 : -1}
                onClick={() => selectSegment(segment)}
                onKeyDown={(event) => {
                  if (similarToClick(event)) {
                    event.preventDefault();
                    selectSegment(segment);
                  }
                }}
              />
            )}
          >
            {segment.label}
          </Button>
        );
      })}
    </ul>
  );
}
