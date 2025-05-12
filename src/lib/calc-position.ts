import { BoundingRect } from './get-element-bounding-rect.js';

export { type BoundingRect };

export type Placement = 'top' | 'right' | 'bottom' | 'left';

export type Alignment = 'start' | 'center' | 'end';

export type Coordinates = {
  x: number;
  y: number;
};

export type PositionCalcParams = {
  anchorRect: BoundingRect;
  popoverRect: BoundingRect;
  placement: Placement;
  alignment: Alignment;
  anchorPadding: number;
  viewportPadding: number;
  viewportWidth: number;
  viewportHeight: number;
  scrollX: number;
  scrollY: number;
};

export type PositionCalcResult = Coordinates & {
  placement: Placement;
  alignment: Alignment;
  maxWidth: number;
  maxHeight: number;
};

export function calcPosition({
  anchorRect,
  popoverRect,
  placement,
  alignment,
  anchorPadding,
  viewportPadding,
  viewportWidth,
  viewportHeight,
  scrollX,
  scrollY,
}: PositionCalcParams): PositionCalcResult {
  const maxLeftSpace = anchorRect.left - anchorPadding - viewportPadding;
  const maxRightSpace = viewportWidth - anchorRect.right - anchorPadding - viewportPadding;
  const maxInlineWidth = viewportWidth - (2 * viewportPadding);
  const maxInlinePadding = Math.max(maxLeftSpace, maxRightSpace);

  if (popoverRect.width >= maxInlinePadding && (placement === 'left' || placement === 'right')) {
    placement = 'bottom';
  }

  let x: number;
  let y: number;
  if (popoverRect.width >= maxInlineWidth) {
    x = scrollX + viewportPadding;
    const result = calcMainAxisOffset({
      placement,
      anchorOffset: anchorRect.top,
      anchorSize: anchorRect.height,
      anchorPadding,
      viewportSize: viewportHeight,
      popoverSize: popoverRect.height,
      scrollSize: scrollY,
    });
    y = result.offset;
    placement = result.placement;
  } else if (placement === 'left' || placement === 'right') {
    const result = calcMainAxisOffset({
      placement,
      anchorOffset: anchorRect.left,
      anchorSize: anchorRect.width,
      anchorPadding,
      popoverSize: popoverRect.width,
      viewportSize: viewportWidth,
      scrollSize: scrollX,
    });
    x = result.offset;
    placement = result.placement;

    y = calcCrossAxisOffset({
      alignment,
      anchorOffset: anchorRect.top,
      anchorSize: anchorRect.height,
      popoverSize: popoverRect.height,
      viewportSize: viewportHeight,
      viewportPadding,
      scrollSize: scrollY,
    });
  } else {
    x = calcCrossAxisOffset({
      alignment,
      anchorOffset: anchorRect.left,
      anchorSize: anchorRect.width,
      viewportSize: viewportWidth,
      viewportPadding,
      popoverSize: popoverRect.width,
      scrollSize: scrollX,
    });

    const result = calcMainAxisOffset({
      placement,
      anchorOffset: anchorRect.top,
      anchorSize: anchorRect.height,
      anchorPadding,
      popoverSize: popoverRect.height,
      viewportSize: viewportHeight,
      scrollSize: scrollY,
    });
    y = result.offset;
    placement = result.placement;
  }

  let maxWidth = popoverRect.width;
  let maxHeight = popoverRect.height;
  if (placement === 'top' || placement === 'bottom') {
    maxWidth = Math.min(maxWidth, maxInlineWidth);
    if (placement === 'top') {
      const maxTopSpace = anchorRect.top - anchorPadding - viewportPadding;
      maxHeight = Math.min(maxHeight, maxTopSpace);
    } else {
      const maxBottomSpace = viewportHeight - viewportPadding - anchorRect.bottom - anchorPadding;
      maxHeight = Math.min(maxHeight, maxBottomSpace);
    }
  } else {
    maxHeight = Math.min(
      maxHeight,
      viewportHeight - 2 * viewportPadding,
    );
    if (placement === 'left') {
      maxWidth = Math.min(maxWidth, maxLeftSpace);
    } else {
      maxWidth = Math.min(maxWidth, maxRightSpace);
    }
  }

  return {
    x,
    y,
    placement,
    alignment,
    maxWidth,
    maxHeight,
  };
}

function calcMainAxisOffset({
  placement,
  anchorOffset,
  anchorSize,
  anchorPadding,
  popoverSize,
  viewportSize,
  scrollSize,
}: {
  placement: Placement;
  anchorOffset: number;
  anchorSize: number;
  anchorPadding: number;
  popoverSize: number;
  viewportSize: number;
  scrollSize: number;
}): { offset: number; placement: Placement } {
  const anchorBottom = viewportSize - anchorOffset + anchorSize;
  const top = scrollSize + anchorOffset - anchorPadding - popoverSize;
  const bottom = scrollSize + anchorOffset + anchorSize + anchorPadding;

  let offset;
  if (placement === 'top' || placement === 'left') {
    offset = top;
    if (offset < scrollSize && anchorOffset < anchorBottom) {
      offset = bottom;
      placement = placement === 'top' ? 'bottom' : 'right';
    }
  } else {
    offset = bottom;
    if (anchorOffset > anchorBottom && offset + popoverSize > scrollSize + viewportSize) {
      offset = top;
      placement = placement === 'bottom' ? 'top' : 'left';
    }
  }

  return { offset, placement };
}

function calcCrossAxisOffset({
  alignment,
  anchorSize,
  anchorOffset,
  popoverSize,
  viewportSize,
  viewportPadding,
  scrollSize,
}: {
  alignment: Alignment;
  anchorSize: number;
  anchorOffset: number;
  popoverSize: number;
  viewportSize: number;
  viewportPadding: number;
  scrollSize: number;
}): number {
  let offset;
  if (alignment === 'start') {
    offset = scrollSize + anchorOffset;
  } else if (alignment === 'end') {
    offset = scrollSize + anchorOffset + anchorSize - popoverSize;
  } else {
    offset = scrollSize + anchorOffset + (anchorSize / 2) - (popoverSize / 2);
  }

  if (offset < scrollSize) {
    offset = scrollSize + viewportPadding;
  } else if (offset + popoverSize > scrollSize + viewportSize) {
    offset = scrollSize + viewportSize - viewportPadding - popoverSize;
  }

  return offset;
}
