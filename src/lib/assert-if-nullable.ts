export function assertIfNullable<T>(
  value: T,
  message = 'value is null or undefined'
): asserts value is NonNullable<T> {
  if (value == null) {
    throw Error(message);
  }
}
