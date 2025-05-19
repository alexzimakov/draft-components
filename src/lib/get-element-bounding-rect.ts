import { roundNumber } from './helpers.js';

export type BoundingRect = {
  top: number;
  right: number;
  bottom: number;
  left: number;
  width: number;
  height: number;
};

export function getElementBoundingRect(element: Element): BoundingRect {
  const domRect = element.getBoundingClientRect();
  const top = roundNumber(domRect.top);
  const left = roundNumber(domRect.left);
  const width = roundNumber(domRect.width);
  const height = roundNumber(domRect.height);
  return {
    width,
    height,
    top,
    left,
    right: left + width,
    bottom: top + height,
  };
}
