import { type BoundingRect } from './get-element-bounding-rect.js';
import { roundNumber } from './helpers.js';

export { type BoundingRect };

export type Placement = 'top' | 'right' | 'bottom' | 'left';

export type Alignment = 'start' | 'center' | 'end';

export type Coordinates = {
  x: number;
  y: number;
};

export type PositionCalcParams = {
  anchorRect: BoundingRect;
  elementRect: BoundingRect;
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
  elementRect,
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

  if (elementRect.width >= maxInlinePadding && (placement === 'left' || placement === 'right')) {
    placement = 'bottom';
  }

  let x: number;
  let y: number;
  if (elementRect.width >= maxInlineWidth) {
    x = scrollX + viewportPadding;
    const result = calcMainAxisOffset({
      placement,
      anchorOffset: anchorRect.top,
      anchorSize: anchorRect.height,
      anchorPadding,
      viewportSize: viewportHeight,
      elementSize: elementRect.height,
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
      elementSize: elementRect.width,
      viewportSize: viewportWidth,
      scrollSize: scrollX,
    });
    x = result.offset;
    placement = result.placement;

    y = calcCrossAxisOffset({
      alignment,
      anchorOffset: anchorRect.top,
      anchorSize: anchorRect.height,
      elementSize: elementRect.height,
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
      elementSize: elementRect.width,
      scrollSize: scrollX,
    });

    const result = calcMainAxisOffset({
      placement,
      anchorOffset: anchorRect.top,
      anchorSize: anchorRect.height,
      anchorPadding,
      elementSize: elementRect.height,
      viewportSize: viewportHeight,
      scrollSize: scrollY,
    });
    y = result.offset;
    placement = result.placement;
  }

  let maxWidth = elementRect.width;
  let maxHeight = elementRect.height;
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
    x: roundNumber(x),
    y: roundNumber(y),
    placement,
    alignment,
    maxWidth: roundNumber(maxWidth),
    maxHeight: roundNumber(maxHeight),
  };
}

function calcMainAxisOffset({
  placement,
  anchorOffset,
  anchorSize,
  anchorPadding,
  elementSize,
  viewportSize,
  scrollSize,
}: {
  placement: Placement;
  anchorOffset: number;
  anchorSize: number;
  anchorPadding: number;
  elementSize: number;
  viewportSize: number;
  scrollSize: number;
}): { offset: number; placement: Placement } {
  const anchorBottom = viewportSize - anchorOffset + anchorSize;
  const top = scrollSize + anchorOffset - anchorPadding - elementSize;
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
    if (anchorOffset > anchorBottom && offset + elementSize > scrollSize + viewportSize) {
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
  elementSize,
  viewportSize,
  viewportPadding,
  scrollSize,
}: {
  alignment: Alignment;
  anchorSize: number;
  anchorOffset: number;
  elementSize: number;
  viewportSize: number;
  viewportPadding: number;
  scrollSize: number;
}): number {
  let offset;
  if (alignment === 'start') {
    offset = scrollSize + anchorOffset;
  } else if (alignment === 'end') {
    offset = scrollSize + anchorOffset + anchorSize - elementSize;
  } else {
    offset = scrollSize + anchorOffset + (anchorSize / 2) - (elementSize / 2);
  }

  if (offset < scrollSize) {
    offset = scrollSize + viewportPadding;
  } else if (offset + elementSize > scrollSize + viewportSize) {
    offset = scrollSize + viewportSize - viewportPadding - elementSize;
  }

  return offset;
}
