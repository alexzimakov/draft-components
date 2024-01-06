export function calcPosition(value: number, opts: {
  min: number;
  max: number;
}): number {
  return (value - opts.min) / (opts.max - opts.min);
}
