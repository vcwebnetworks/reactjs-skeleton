export const parseJson = (
  json: string | null,
): boolean | Record<string, never> => {
  if (typeof json !== 'string') {
    json = JSON.stringify(json);
  }

  try {
    json = JSON.parse(json);
  } catch (e) {
    return false;
  }

  if (typeof json === 'object' && json !== null) {
    return json;
  }

  return false;
};
