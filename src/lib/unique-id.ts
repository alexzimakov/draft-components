let idCount = 0;

export function uniqueId(prefix?: string): string {
  idCount += 1;
  return prefix ? prefix + idCount : String(idCount);
}

export function resetIdCount() {
  idCount = 0;
}
