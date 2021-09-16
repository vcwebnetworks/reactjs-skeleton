type TypeResponse = undefined | string | Record<string, any>;

export function useQuerySearch<T = TypeResponse>(
  name?: string,
  defaultValue?: T,
): T {
  const urlSearchParams = new URLSearchParams(window.location.search);

  if (name) {
    return (urlSearchParams.get(name) ?? defaultValue) as T;
  }

  const all = {};

  urlSearchParams.forEach((value, key) => {
    all[key] = value;
  });

  return all as any;
}
