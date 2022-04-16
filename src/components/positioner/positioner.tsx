import {
  CSSProperties,
  ReactNode,
  RefCallback,
  useLayoutEffect,
  useState,
} from 'react';
import { Alignment, Placement, Rect } from './types';
import { getPosition } from './get-position';
import { Portal } from '../portal';

export type PositionerProps = {
  placement?: Placement;
  alignment?: Alignment;
  anchorGap?: number;
  viewportGap?: number;
  renderAnchor(params: { setRef: RefCallback<HTMLElement> }): ReactNode;
  renderContent(params: {
    style: CSSProperties;
    setRef: RefCallback<HTMLElement>;
  }): ReactNode;
};

export function Positioner({
  placement = 'bottom',
  alignment = 'start',
  anchorGap = 4,
  viewportGap = 8,
  renderAnchor,
  renderContent,
}: PositionerProps) {
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);
  const [content, setContent] = useState<HTMLElement | null>(null);

  useLayoutEffect(() => {
    if (!anchor || !content) {
      return;
    }

    const update = () => {
      const isContentPositionedFixed = content.style.position === 'fixed';
      const result = getPosition({
        placement,
        alignment,
        anchorRect: getRect(anchor),
        contentRect: getRect(content),
        viewportWidth: document.documentElement.clientWidth,
        viewportHeight: document.documentElement.clientHeight,
        scrollX: isContentPositionedFixed ? 0 : Math.round(window.scrollX),
        scrollY: isContentPositionedFixed ? 0 : Math.round(window.scrollY),
        anchorGap: anchorGap,
        viewportGap: viewportGap,
      });
      content.style.transform = `translate(${result.x}px, ${result.y}px)`;
      content.dataset.position = `${result.placement}-${result.alignment}`;
    };

    update();
    window.addEventListener('resize', update);
    window.addEventListener('scroll', update);

    return () => {
      window.removeEventListener('resize', update);
      window.removeEventListener('scroll', update);
    };
  }, [anchor, content, placement, alignment, anchorGap, viewportGap]);

  return (
    <>
      {renderAnchor({ setRef: setAnchor })}
      <Portal>
        {renderContent({
          setRef: setContent,
          style: {
            position: 'absolute',
            top: 0,
            left: 0,
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
