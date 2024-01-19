export const omit = (
  obj: Record<string, unknown>,
  arr: string[]
): Record<string, unknown> =>
  Object.keys(obj)
    .filter((k) => !arr.includes(k))
    .reduce((acc, key) => {
      acc[key] = obj[key];
      return acc;
    }, {} as Record<string, unknown>);
