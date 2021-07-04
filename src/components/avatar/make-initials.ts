export function makeInitials(from: string): string {
  let initials = '';
  if (from) {
    const words = from.trim().split(/\s+/);
    for (let i = 0; i < 2; i += 1) {
      const word = words[i];
      if (word && word[0]) {
        initials += word[0].toUpperCase();
      }
    }
  }

  return initials;
}
