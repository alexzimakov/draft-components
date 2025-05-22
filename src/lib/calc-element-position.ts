import { calcPosition, type Alignment, type Placement, type PositionCalcResult } from './calc-position.js';
import { getElementBoundingRect } from './get-element-bounding-rect.js';

type AlignmentWithoutCenter = Exclude<Alignment, 'center'>;

export type ElementPlacement = Placement | `${Placement}-${AlignmentWithoutCenter}`;

export type ElementPositionCalcParams = {
  placement?: ElementPlacement;
  anchorPadding?: number;
  viewportPadding?: number;
};

export function calcElementPosition(
  anchor: HTMLElement | SVGElement,
  element: HTMLElement | SVGElement,
  params: ElementPositionCalcParams = {},
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

  const root = anchor.ownerDocument || window.document;
  const isPopoverFixed = window.getComputedStyle(element).position === 'fixed';

  return calcPosition({
    anchorRect: getElementBoundingRect(anchor),
    elementRect: getElementBoundingRect(element),
    placement,
    alignment,
    anchorPadding: params.anchorPadding || 4,
    viewportPadding: params.viewportPadding || 4,
    viewportWidth: root.documentElement.clientWidth,
    viewportHeight: root.documentElement.clientHeight,
    scrollX: isPopoverFixed ? 0 : Math.round(window.scrollX),
    scrollY: isPopoverFixed ? 0 : Math.round(window.scrollY),
  });
}
