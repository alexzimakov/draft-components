import * as React from 'react';
import { isFunction } from '../../lib/guards';
import { uniqueId } from '../../lib/util';
import { classNames } from '../../lib/react-helpers';
import { similarToClick, KeyCode } from '../../lib/keyboard-helpers';
import { Button } from '../button';

type SegmentId = string | number;

export interface Segment<T extends SegmentId> {
  id: T;
  label: React.ReactNode;
  icon?: React.ReactNode;
}

export interface SegmentedControlProps<T extends SegmentId>
  extends React.ComponentPropsWithoutRef<'ul'> {
  size?: 'sm' | 'md' | 'lg';
  name?: string;
  items: Segment<T>[];
  selectedItemKey: Segment<T>['id'];
  onItemSelect(itemId: Segment<T>['id'], item: Segment<T>): void;
}

export function SegmentedControl<T extends SegmentId>({
  size = 'md',
  name = uniqueId('segmented-control-'),
  items,
  selectedItemKey,
  onItemSelect,
  className,
  onKeyDown,
  ...props
}: SegmentedControlProps<T>) {
  function handleKeyDown(event: React.KeyboardEvent<HTMLUListElement>) {
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
      {items.map((item) => {
        const isSelected = item.id === selectedItemKey;
        return (
          <Button
            key={item.id}
            size={size}
            className="dc-segmented-control__radio-btn"
            appearance={isSelected ? 'default' : 'minimal'}
            leadingIcon={item.icon}
            renderAs={(props) => (
              <li
                {...props}
                role="radio"
                aria-checked={isSelected}
                tabIndex={isSelected ? 0 : -1}
                onClick={() => onItemSelect(item.id, item)}
                onKeyDown={(event) => {
                  if (similarToClick(event)) {
                    event.preventDefault();
                    onItemSelect(item.id, item);
                  }
                }}
              />
            )}
          >
            {item.label}
          </Button>
        );
      })}
    </ul>
  );
}
