import { calcPosition, Alignment, Placement, PositionCalcResult } from './calc-position.js';
import { getElementBoundingRect } from './get-element-bounding-rect.js';

type AlignmentWithoutCenter = Exclude<Alignment, 'center'>;

export type PopoverPlacement = Placement | `${Placement}-${AlignmentWithoutCenter}`;

export type PopoverPositionCalcParams = {
  placement?: PopoverPlacement;
  anchorPadding?: number;
  viewportPadding?: number;
};

export function calcPopoverPosition(
  anchor: HTMLElement,
  popover: HTMLElement,
  params: PopoverPositionCalcParams = {},
): PositionCalcResult {
  let placement: Placement = 'bottom';
  let alignment: Alignment = 'center';
  const parts = (params.placement || '').split('-');
  if (parts[0] === 'top' || parts[0] === 'right' || parts[0] === 'bottom' || parts[0] === 'left') {
    placement = parts[0];
  }
  if (parts[1] === 'start' || parts[1] === 'end') {
    alignment = parts[1];
  }

  const isPopoverFixed = window.getComputedStyle(popover).position === 'fixed';

  return calcPosition({
    anchorRect: getElementBoundingRect(anchor),
    popoverRect: getElementBoundingRect(popover),
    placement,
    alignment,
    anchorPadding: 4,
    viewportPadding: 4,
    viewportWidth: document.documentElement.clientWidth,
    viewportHeight: document.documentElement.clientHeight,
    scrollX: isPopoverFixed ? 0 : Math.round(window.scrollX),
    scrollY: isPopoverFixed ? 0 : Math.round(window.scrollY),
  });
}
