import { type CSSProperties, type ReactNode, type RefCallback, useLayoutEffect, useState } from 'react';
import { calcPosition, type Placement, type Alignment } from '../../lib/calc-position.js';
import { getElementBoundingRect } from '../../lib/get-element-bounding-rect.js';
import { Portal } from '../portal/index.js';

export type PositionerAnchorRenderFn = (params: {
  setRef: RefCallback<HTMLElement>;
}) => ReactNode;
export type PositionerContentRenderFn = (params: {
  setRef: RefCallback<HTMLElement>;
  style: CSSProperties;
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
        anchorPadding: anchorGap,
        viewportPadding: viewportGap,
        anchorRect: getElementBoundingRect(anchor),
        popoverRect: getElementBoundingRect(content),
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
          style: {
            position,
            maxWidth: `calc(100% - ${viewportGap * 2}px)`,
          },
        })}
      </Portal>
    </>
  );
}
