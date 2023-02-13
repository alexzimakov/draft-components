import {
  type Alignment,
  type Coordinates,
  type Placement,
  type Rect,
} from './types';

export type CalcPositionParams = {
  placement: Placement;
  alignment: Alignment;
  anchorRect: Rect;
  contentRect: Rect;
  viewportWidth: number;
  viewportHeight: number;
  scrollX: number;
  scrollY: number;
  anchorGap: number;
  viewportGap: number;
};

export type CalcPositionResult = Coordinates & {
  placement: Placement;
  alignment: Alignment;
};

export function calcPosition({
  placement,
  alignment,
  anchorRect,
  contentRect,
  viewportWidth,
  viewportHeight,
  scrollX,
  scrollY,
  anchorGap,
  viewportGap,
}: CalcPositionParams): CalcPositionResult {
  const maxWidth = viewportWidth - (2 * viewportGap);
  const maxSideWidth = Math.max(
    anchorRect.left - anchorGap - viewportGap,
    viewportWidth - anchorRect.right - anchorGap - viewportGap,
  );

  if (
    (placement === 'left' || placement === 'right') &&
    contentRect.width >= maxSideWidth
  ) {
    placement = 'bottom';
  }

  let x: number;
  let y: number;
  if (contentRect.width >= maxWidth) {
    x = scrollX + viewportGap;
    const result = getYAxisOffset({
      placement,
      anchorGap,
      scrollY,
      viewportHeight,
      anchorY: anchorRect.top,
      anchorHeight: anchorRect.height,
      contentHeight: contentRect.height,
    });
    y = result.offset;
    placement = result.placement;
  } else if (placement === 'left' || placement === 'right') {
    // noinspection JSSuspiciousNameCombination
    const result = getYAxisOffset({
      placement,
      anchorGap,
      scrollY: scrollX,
      anchorY: anchorRect.left,
      viewportHeight: viewportWidth,
      contentHeight: contentRect.width,
      anchorHeight: anchorRect.width,
    });
    x = result.offset;
    placement = result.placement;

    // noinspection JSSuspiciousNameCombination
    y = getXAxisOffset({
      alignment,
      viewportGap,
      scrollX: scrollY,
      anchorX: anchorRect.top,
      viewportWidth: viewportHeight,
      contentWidth: contentRect.height,
      anchorWidth: anchorRect.height,
    });
  } else {
    x = getXAxisOffset({
      alignment,
      viewportGap,
      scrollX,
      viewportWidth,
      anchorX: anchorRect.left,
      contentWidth: contentRect.width,
      anchorWidth: anchorRect.width,
    });

    const result = getYAxisOffset({
      placement,
      anchorGap,
      scrollY,
      viewportHeight,
      anchorY: anchorRect.top,
      contentHeight: contentRect.height,
      anchorHeight: anchorRect.height,
    });
    y = result.offset;
    placement = result.placement;
  }

  return { x, y, placement, alignment };
}

type GetXAxisOffsetParams = {
  alignment: Alignment;
  viewportGap: number;
  scrollX: number;
  anchorX: number;
  viewportWidth: number;
  contentWidth: number;
  anchorWidth: number;
};

function getXAxisOffset({
  alignment,
  viewportGap,
  scrollX,
  anchorX,
  viewportWidth,
  contentWidth,
  anchorWidth,
}: GetXAxisOffsetParams): number {
  let x;
  if (alignment === 'start') {
    x = scrollX + anchorX;
  } else if (alignment === 'end') {
    x = scrollX + anchorX + anchorWidth - contentWidth;
  } else {
    x = scrollX + anchorX + (anchorWidth / 2) - (contentWidth / 2);
  }

  if (x < scrollX) {
    x = scrollX + viewportGap;
  } else if (x + contentWidth > scrollX + viewportWidth) {
    x = scrollX + viewportWidth - viewportGap - contentWidth;
  }

  return x;
}

type GetYAxisOffsetParams = {
  placement: Placement;
  anchorGap: number;
  scrollY: number;
  anchorY: number;
  viewportHeight: number;
  contentHeight: number;
  anchorHeight: number;
};

export function getYAxisOffset({
  placement,
  anchorGap,
  scrollY,
  anchorY,
  viewportHeight,
  contentHeight,
  anchorHeight,
}: GetYAxisOffsetParams): { offset: number; placement: Placement } {
  const anchorBottom = viewportHeight - anchorY + anchorHeight;
  const top = scrollY + anchorY - anchorGap - contentHeight;
  const bottom = scrollY + anchorY + anchorHeight + anchorGap;

  let y;
  if (placement === 'top' || placement === 'left') {
    y = top;
    if (y < scrollY && anchorY < anchorBottom) {
      y = bottom;
      placement = placement === 'top' ? 'bottom' : 'right';
    }
  } else {
    y = bottom;
    if (
      y + contentHeight > scrollY + viewportHeight &&
      anchorY > anchorBottom
    ) {
      y = top;
      placement = placement === 'bottom' ? 'top' : 'left';
    }
  }

  return { offset: y, placement };
}
