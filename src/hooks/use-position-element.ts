import { RefObject, useLayoutEffect } from 'react';

type Position = 'top' | 'right' | 'bottom' | 'left';
type Alignment = 'start' | 'center' | 'end';

export interface UsePositionElementParams {
  anchorRef: RefObject<HTMLElement>;
  targetRef: RefObject<HTMLElement>;
  position: Position;
  alignment: Alignment;
  anchorOffset: number;
  viewportOffset: number;
  isShown: boolean;
  isPositionedRelativeToViewport?: boolean;
  shouldUpdatePositionWhenScroll?: boolean;
}

export function usePositionElement({
  anchorRef,
  targetRef,
  position,
  alignment,
  anchorOffset,
  viewportOffset,
  isShown,
  shouldUpdatePositionWhenScroll,
  isPositionedRelativeToViewport,
}: UsePositionElementParams) {
  useLayoutEffect(() => {
    const anchor = anchorRef.current;
    const target = targetRef.current;
    if (!isShown || !anchor || !target) {
      return;
    }

    const updatePopoverPosition = () => {
      const { x, y } = getElementCoordinates({
        position,
        alignment,
        anchorOffset,
        viewportOffset,
        isPositionedRelativeToViewport,
        anchorRect: anchor.getBoundingClientRect(),
        targetRect: target.getBoundingClientRect(),
      });
      target.style.transform = `translate(${x}px, ${y}px)`;
    };

    updatePopoverPosition();
    window.addEventListener('resize', updatePopoverPosition);
    if (shouldUpdatePositionWhenScroll) {
      window.addEventListener('scroll', updatePopoverPosition);
    }

    return () => {
      window.removeEventListener('resize', updatePopoverPosition);
      if (shouldUpdatePositionWhenScroll) {
        window.removeEventListener('scroll', updatePopoverPosition);
      }
    };
  }, [
    anchorRef,
    targetRef,
    isShown,
    position,
    alignment,
    anchorOffset,
    viewportOffset,
    shouldUpdatePositionWhenScroll,
    isPositionedRelativeToViewport,
  ]);
}

export function getElementCoordinates(params: {
  anchorRect: DOMRect;
  targetRect: DOMRect;
  position: Position;
  alignment: Alignment;
  anchorOffset: number;
  viewportOffset: number;
  isPositionedRelativeToViewport?: boolean;
}): { x: number; y: number } {
  let {
    anchorRect,
    targetRect,
    position,
    alignment,
    anchorOffset,
    viewportOffset,
    isPositionedRelativeToViewport,
  } = params;
  const viewportWidth = document.documentElement.clientWidth;
  const viewportHeight = document.documentElement.clientHeight;
  const scrollX = isPositionedRelativeToViewport ? 0 : window.pageXOffset;
  const scrollY = isPositionedRelativeToViewport ? 0 : window.pageYOffset;
  const maxWidthWhenArrangedVertically = viewportWidth - 2 * viewportOffset;
  const maxWidthWhenArrangedHorizontally = Math.max(
    anchorRect.left - anchorOffset - viewportOffset,
    viewportWidth - anchorRect.right - anchorOffset - viewportOffset,
  );

  if (
    (position === 'left' || position === 'right') &&
    targetRect.width >= maxWidthWhenArrangedHorizontally
  ) {
    position = 'bottom';
  }

  let x = 0;
  let y = 0;
  if (targetRect.width >= maxWidthWhenArrangedVertically) {
    x = scrollX + viewportOffset;
    y = getVerticalAxisOffset({
      position,
      anchorOffset,
      scrollY,
      viewportHeight,
      anchorY: anchorRect.y,
      anchorHeight: anchorRect.height,
      targetHeight: targetRect.height,
    });
  } else if (position === 'left' || position === 'right') {
    x = getVerticalAxisOffset({
      position,
      anchorOffset,
      scrollY: scrollX,
      viewportHeight: viewportWidth,
      anchorY: anchorRect.x,
      anchorHeight: anchorRect.width,
      targetHeight: targetRect.width,
    });
    y = getHorizontalAxisOffset({
      alignment,
      viewportOffset,
      scrollX: scrollY,
      viewportWidth: viewportHeight,
      anchorX: anchorRect.y,
      anchorWidth: anchorRect.height,
      targetWidth: targetRect.height,
    });
  } else {
    x = getHorizontalAxisOffset({
      alignment,
      viewportOffset,
      scrollX,
      viewportWidth,
      anchorX: anchorRect.x,
      anchorWidth: anchorRect.width,
      targetWidth: targetRect.width,
    });
    y = getVerticalAxisOffset({
      position,
      anchorOffset,
      scrollY,
      viewportHeight,
      anchorY: anchorRect.y,
      anchorHeight: anchorRect.height,
      targetHeight: targetRect.height,
    });
  }

  return { x, y };
}

export function getHorizontalAxisOffset(params: {
  alignment: Alignment;
  viewportOffset: number;
  scrollX: number;
  anchorX: number;
  viewportWidth: number;
  anchorWidth: number;
  targetWidth: number;
}): number {
  const {
    alignment,
    viewportOffset,
    viewportWidth,
    scrollX,
    anchorX,
    anchorWidth,
    targetWidth,
  } = params;

  let x;
  if (alignment === 'start') {
    x = scrollX + anchorX;
  } else if (alignment === 'end') {
    x = scrollX + anchorX + anchorWidth - targetWidth;
  } else {
    x = scrollX + anchorX + anchorWidth / 2 - targetWidth / 2;
  }

  if (x < scrollX) {
    x = scrollX + viewportOffset;
  } else if (x + targetWidth > scrollX + viewportWidth) {
    x = scrollX + viewportWidth - viewportOffset - targetWidth;
  }

  return x;
}

export function getVerticalAxisOffset(params: {
  position: Position;
  anchorOffset: number;
  scrollY: number;
  anchorY: number;
  viewportHeight: number;
  anchorHeight: number;
  targetHeight: number;
}): number {
  const {
    position,
    anchorOffset,
    viewportHeight,
    scrollY,
    anchorY,
    anchorHeight,
    targetHeight,
  } = params;
  const anchorOffsetBottom = viewportHeight - anchorY + anchorHeight;
  const offsetTop = scrollY + anchorY - anchorOffset - targetHeight;
  const offsetBottom = scrollY + anchorY + anchorHeight + anchorOffset;

  let y;
  if (position === 'top' || position === 'left') {
    y = offsetTop;

    if (y < scrollY && anchorY < anchorOffsetBottom) {
      y = offsetBottom;
    }
  } else {
    y = offsetBottom;

    if (
      y + targetHeight > scrollY + viewportHeight &&
      anchorY > anchorOffsetBottom
    ) {
      y = offsetTop;
    }
  }

  return y;
}
