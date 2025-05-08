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
  const top = Math.round(domRect.top);
  const left = Math.round(domRect.left);
  const width = Math.round(domRect.width);
  const height = Math.round(domRect.height);
  return {
    width,
    height,
    top,
    left,
    right: left + width,
    bottom: top + height,
  };
}
