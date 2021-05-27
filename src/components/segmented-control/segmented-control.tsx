import * as React from 'react';
import { Button } from '../button';
import { classNames, uniqueId, keyboardUtil, guards } from '../../lib';

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
  const onListKeyDown: React.KeyboardEventHandler<HTMLUListElement> = (
    event
  ) => {
    const isLeftArrowPressed = keyboardUtil.isArrowLeftPressed(event);
    const isRightArrowPressed = keyboardUtil.isArrowRightPressed(event);

    if (isLeftArrowPressed || isRightArrowPressed) {
      event.preventDefault();

      const radios = event.currentTarget.children;
      for (let i = 0, len = radios.length; i < len; i += 1) {
        const radio = radios[i];
        if (radio === document.activeElement) {
          let index;
          if (isLeftArrowPressed) {
            index = i === 0 ? len - 1 : i - 1;
          } else {
            index = i + 1 === len ? 0 : i + 1;
          }
          (radios[index] as HTMLElement).focus();
          break;
        }
      }
    }

    guards.isFunction(onKeyDown) && onKeyDown(event);
  };
  return (
    <ul
      {...props}
      className={classNames(
        className,
        'dc-segmented-control',
        `dc-segmented-control_size_${size}`
      )}
      role="radiogroup"
      onKeyDown={onListKeyDown}
    >
      {items.map((item) => {
        const isSelected = item.id === selectedItemKey;
        return (
          <Button
            key={item.id}
            className="dc-segmented-control__radio-btn"
            size={size}
            leadingIcon={item.icon}
            appearance={isSelected ? 'default' : 'minimal'}
            renderAs={(props) => (
              <li
                {...props}
                role="radio"
                aria-checked={isSelected}
                tabIndex={isSelected ? 0 : -1}
                onClick={() => onItemSelect(item.id, item)}
                onKeyDown={(event) => {
                  if (
                    keyboardUtil.isEnterPressed(event) ||
                    keyboardUtil.isSpacePressed(event)
                  ) {
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
