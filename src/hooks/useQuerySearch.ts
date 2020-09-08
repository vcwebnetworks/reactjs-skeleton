type TypeResponse = undefined | string | Record<string, any>;

export function useQuerySearch<T extends string>(
  name?: string,
  defaultValue?: T,
): T | TypeResponse {
  const urlSearchParams = new URLSearchParams(window.location.search);

  if (name) {
    return (urlSearchParams.get(name) ?? defaultValue) as T;
  }

  const all: Record<string, any> = {};

  urlSearchParams.forEach((value, key) => {
    all[key] = value;
  });

  return all;
}
