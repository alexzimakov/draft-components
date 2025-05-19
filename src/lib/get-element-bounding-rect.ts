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
  const top = round(domRect.top);
  const left = round(domRect.left);
  const width = round(domRect.width);
  const height = round(domRect.height);
  return {
    width,
    height,
    top,
    left,
    right: left + width,
    bottom: top + height,
  };
}

function round(n: number, precision = 2) {
  return Number(n.toFixed(precision));
}
