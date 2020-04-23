import { useRef, useEffect } from 'react';

export default function useTitle(title: string) {
  const prevTitle = useRef(document.title);

  useEffect(() => {
    if (title && title.trim()) {
      document.title = title;
    }
  }, [title]);

  useEffect(() => {
    return () => {
      document.title = prevTitle?.current;
    };
  }, []);
}
