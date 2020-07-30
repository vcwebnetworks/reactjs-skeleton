import { useRef, useEffect } from 'react';

export default function useChangeTitle(title: string): void {
  const refTitle = useRef<string>(document.title);

  useEffect(() => {
    if (title && title.trim()) {
      document.title = title;
    }
  }, [title]);

  useEffect(() => {
    const prevTitle = refTitle?.current;

    return () => {
      document.title = prevTitle;
    };
  }, []);
}
