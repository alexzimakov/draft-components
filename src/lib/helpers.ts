// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyFunction = (...args: any[]) => any;

export function once<
  T extends AnyFunction
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
