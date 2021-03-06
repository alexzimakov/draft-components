export function noop() {}

export function once<T extends (...args: any[]) => any>(
  fn: T
): (...args: Parameters<T>) => ReturnType<T> {
  let isCalled = false;
  let result: ReturnType<T>;

  return (...args) => {
    if (!isCalled) {
      isCalled = true;
      result = fn(...args);
    }
    return result;
  };
}

export function randomInt(min: number, max: number): number {
  if (min >= max) {
    throw new Error(`randomInt: parameter "min" must be less than "max".`);
  }
  return Math.floor(Math.random() * (max - min)) + min;
}

export function randomString(size: number): string {
  if (size < 1) {
    throw new Error(`randomString: "size" parameter must be greater than 0.`);
  }

  const chars = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789`;
  return Array.from({ length: size })
    .map(() => chars[randomInt(0, chars.length - 1)])
    .join('');
}

export function uniqueId(prefix?: string): string {
  return (prefix ?? '') + randomString(5);
}
