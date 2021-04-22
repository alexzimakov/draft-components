import * as React from 'react';

type Arrangement = 'top' | 'right' | 'bottom' | 'left';
type Alignment = 'start' | 'center' | 'end';
type Position = 'absolute' | 'fixed';

export interface UsePositionElementParams {
  anchorRef: React.MutableRefObject<HTMLElement | null>;
  targetRef: React.MutableRefObject<HTMLElement | null>;
  position: Position;
  arrangement: Arrangement;
  alignment: Alignment;
  anchorOffset: number;
  viewportOffset: number;
  isShown: boolean;
  shouldUpdatePositionWhenScroll?: boolean;
}

export function usePositionElement({
  anchorRef,
  targetRef,
  position,
  arrangement,
  alignment,
  anchorOffset,
  viewportOffset,
  isShown,
  shouldUpdatePositionWhenScroll,
}: UsePositionElementParams) {
  React.useLayoutEffect(() => {
    const anchor = anchorRef.current;
    const target = targetRef.current;
    if (!isShown || !anchor || !target) {
      return;
    }

    const updatePopoverPosition = () => {
      const { x, y } = getElementCoordinates({
        anchorRect: anchor.getBoundingClientRect(),
        targetRect: target.getBoundingClientRect(),
        position,
        arrangement,
        alignment,
        anchorOffset: anchorOffset,
        viewportOffset: viewportOffset,
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
    arrangement,
    alignment,
    anchorOffset,
    viewportOffset,
    shouldUpdatePositionWhenScroll,
  ]);
}

export function getElementCoordinates(params: {
  anchorRect: DOMRect;
  targetRect: DOMRect;
  position: Position;
  arrangement: Arrangement;
  alignment: Alignment;
  anchorOffset: number;
  viewportOffset: number;
}): { x: number; y: number } {
  let {
    anchorRect,
    targetRect,
    position,
    arrangement,
    alignment,
    anchorOffset,
    viewportOffset,
  } = params;
  const viewportWidth = document.documentElement.clientWidth;
  const viewportHeight = document.documentElement.clientHeight;
  const scrollX = position === 'fixed' ? 0 : window.pageXOffset;
  const scrollY = position === 'fixed' ? 0 : window.pageYOffset;
  const maxWidthWhenArrangedVertically = viewportWidth - 2 * viewportOffset;
  const maxWidthWhenArrangedHorizontally = Math.max(
    anchorRect.left - anchorOffset - viewportOffset,
    viewportWidth - anchorRect.right - anchorOffset - viewportOffset
  );

  if (
    (arrangement === 'left' || arrangement === 'right') &&
    targetRect.width >= maxWidthWhenArrangedHorizontally
  ) {
    arrangement = 'bottom';
  }

  let x = 0;
  let y = 0;
  if (targetRect.width >= maxWidthWhenArrangedVertically) {
    x = scrollX + viewportOffset;
    y = getVerticalAxisOffset({
      arrangement,
      anchorOffset,
      scrollY,
      viewportHeight,
      anchorY: anchorRect.y,
      anchorHeight: anchorRect.height,
      targetHeight: targetRect.height,
    });
  } else if (arrangement === 'left' || arrangement === 'right') {
    x = getVerticalAxisOffset({
      arrangement,
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
      arrangement,
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
  arrangement: Arrangement;
  anchorOffset: number;
  scrollY: number;
  anchorY: number;
  viewportHeight: number;
  anchorHeight: number;
  targetHeight: number;
}): number {
  const {
    arrangement,
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
  if (arrangement === 'top' || arrangement === 'left') {
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
