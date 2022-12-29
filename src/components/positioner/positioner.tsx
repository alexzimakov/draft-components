import {
  useLayoutEffect,
  useState,
  type CSSProperties,
  type ReactNode,
  type RefCallback,
} from 'react';
import { type Alignment, type Placement, type Rect } from './types';
import { calcPosition } from './calc-position';
import { Portal } from '../portal';

export type PositionerAnchorRenderFn = (params: {
  setRef: RefCallback<HTMLElement>,
}) => ReactNode;
export type PositionerContentRenderFn = (params: {
  style: CSSProperties;
  className: string;
  setRef: RefCallback<HTMLElement>;
}) => ReactNode;
export type Position = 'fixed' | 'absolute';
export type PositionerProps = {
  anchorGap?: number;
  viewportGap?: number;
  position?: Position;
  placement?: Placement;
  alignment?: Alignment;
  renderAnchor: PositionerAnchorRenderFn;
  renderContent: PositionerContentRenderFn;
};

export function Positioner({
  anchorGap = 4,
  viewportGap = 8,
  position = 'fixed',
  placement = 'bottom',
  alignment = 'start',
  renderAnchor,
  renderContent,
}: PositionerProps) {
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);
  const [content, setContent] = useState<HTMLElement | null>(null);

  useLayoutEffect(() => {
    if (!anchor || !content) {
      return;
    }

    const calcContentPosition = () => {
      const isPositionedFixed = position === 'fixed';
      const result = calcPosition({
        placement,
        alignment,
        anchorGap,
        viewportGap,
        anchorRect: getRect(anchor),
        contentRect: getRect(content),
        viewportWidth: document.documentElement.clientWidth,
        viewportHeight: document.documentElement.clientHeight,
        scrollX: isPositionedFixed ? 0 : Math.round(window.scrollX),
        scrollY: isPositionedFixed ? 0 : Math.round(window.scrollY),
      });
      content.style.transform = `translate(${result.x}px, ${result.y}px)`;
      content.dataset.position = `${result.placement}-${result.alignment}`;
    };

    calcContentPosition();
    window.addEventListener('resize', calcContentPosition);
    window.addEventListener('scroll', calcContentPosition);

    return () => {
      window.removeEventListener('resize', calcContentPosition);
      window.removeEventListener('scroll', calcContentPosition);
    };
  }, [anchor, content, position, placement, alignment, anchorGap, viewportGap]);

  return (
    <>
      {renderAnchor({ setRef: setAnchor })}
      <Portal>
        {renderContent({
          setRef: setContent,
          className: 'dc-portal',
          style: {
            position,
            maxWidth: `calc(100% - ${viewportGap * 2}px)`,
          },
        })}
      </Portal>
    </>
  );
}

function getRect(element: HTMLElement): Rect {
  const domRect = element.getBoundingClientRect();
  const width = Math.round(domRect.width);
  const height = Math.round(domRect.height);
  const top = Math.round(domRect.top);
  const left = Math.round(domRect.left);
  return {
    width,
    height,
    top,
    left,
    right: left + width,
    bottom: top + height,
  };
}
