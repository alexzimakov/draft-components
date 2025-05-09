// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyFunction = (...args: any[]) => any;

export function once<
  T extends AnyFunction,
>(fn: T): (...args: Parameters<T>) => ReturnType<T> {
  let called = false;
  let result: ReturnType<T>;
  return (...args) => {
    if (!called) {
      called = true;
      result = fn(...args);
    }
    return result;
  };
}

export function assertIfNullable<T>(
  value: T,
  message = 'assertIfNullable: value is null or undefined.',
): asserts value is NonNullable<T> {
  if (value == null) {
    throw Error(message);
  }
}

export function exhaustiveCheck(value: never, message?: string): never {
  throw new Error(message);
}

export function noop() {
  return undefined;
}

export function formatNumber(num: number, fractionDigits = 5): number {
  return Number(num.toFixed(fractionDigits));
}

export function formatPercent(percent: number, fractionDigits = 2): string {
  return `${formatNumber(percent * 100, fractionDigits)}%`;
}

export function omit<T extends object, K extends keyof T>(obj: T, ...keys: K[]): Omit<T, K> {
  const result = { ...obj };
  for (const key of keys) {
    delete result[key];
  }
  return result;
}
