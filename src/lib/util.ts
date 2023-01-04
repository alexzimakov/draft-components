export function once<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  T extends (...args: any[]) => any
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
  message = 'value is null or undefined'
): asserts value is NonNullable<T> {
  if (value == null) {
    throw Error(message);
  }
}
