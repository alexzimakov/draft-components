export function assertNullOrUndefined<T>(
  value: T,
  message = 'Value can not be null or undefined.',
): asserts value is NonNullable<T> {
  if (value === null || value === undefined) {
    throw TypeError(message);
  }
}

export function exhaustiveCheck(value: never, message?: string): never {
  throw new Error(message);
}

export function roundNumber(num: number, precision = 5): number {
  return Number(num.toFixed(precision));
}

export function formatPercent(percent: number, fractionDigits = 2): string {
  return `${roundNumber(percent * 100, fractionDigits)}%`;
}

export function deleteKeys<T extends object, K extends keyof T>(obj: T, ...keys: K[]): Omit<T, K> {
  const result = { ...obj };
  for (const key of keys) {
    delete result[key];
  }
  return result;
}
