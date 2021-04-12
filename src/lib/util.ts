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
