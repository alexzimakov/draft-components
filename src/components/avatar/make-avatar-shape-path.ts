interface ShapePathParams {
  size: number;
  offsetX?: number;
  offsetY?: number;
}

function roundNumber(n: number, fractionDigits: number = 2): number {
  return Number.isInteger(n) ? n : Number(n.toFixed(fractionDigits));
}

export function makeRoundShapePath({
  size,
  offsetX = 0,
  offsetY = 0,
}: ShapePathParams) {
  const r = roundNumber(size / 2);
  const x = roundNumber(offsetX);
  const y = roundNumber(r + offsetY);
  return [
    `M${x},${y}`,
    `a${r},${r} 0 0 0 ${size},0`,
    `a${r},${r} 0 0 0 ${-size},0`,
    `z`,
  ].join(' ');
}

export function makeSquareShapePath({
  size,
  offsetX = 0,
  offsetY = 0,
}: ShapePathParams) {
  const r = roundNumber(size * 0.15);
  const h = roundNumber(size - r * 2);
  const x = roundNumber(offsetX);
  const y = roundNumber(r + offsetY);
  return [
    `M${x},${y}`,
    `q0,${-r} ${r},${-r}`,
    `h${h}`,
    `q${r},0 ${r},${r}`,
    `v${h}`,
    `q0,${r} ${-r},${r}`,
    `h${-h}`,
    `q${-r},0 ${-r},${-r}`,
    `z`,
  ].join(' ');
}

export function makeAvatarShapePath(params: ShapePathParams, square?: boolean) {
  return square ? makeSquareShapePath(params) : makeRoundShapePath(params);
}
