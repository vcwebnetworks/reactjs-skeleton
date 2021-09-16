import { useCallback, useEffect, useState } from 'react';

export const useMatchMedia = (
  query: string,
  matchImmediate = true,
): boolean => {
  const [match, setMatch] = useState(false);

  const handleOnChange = useCallback((event: MediaQueryListEvent) => {
    setMatch(event.matches);
  }, []);

  useEffect(() => {
    if (!window.matchMedia) {
      return;
    }

    const matchMedia = window.matchMedia(query);

    if (!matchMedia.addEventListener) {
      return;
    }

    if (matchImmediate && matchMedia.matches) {
      setMatch(true);
    }

    matchMedia.addEventListener('change', handleOnChange);

    return () => {
      matchMedia.removeEventListener('change', handleOnChange);
    };
  }, [handleOnChange, matchImmediate, query]);

  return match;
};
