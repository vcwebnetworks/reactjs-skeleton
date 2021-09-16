import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollReset: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return null;
};

export default React.memo(ScrollReset);
