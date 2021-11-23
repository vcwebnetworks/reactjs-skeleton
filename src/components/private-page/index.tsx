import React, { useMemo } from 'react';
import { Navigate, To, useLocation } from 'react-router-dom';

import { useAuth } from '@/context';

export interface PrivatePageProps {
  page: React.ComponentType;
  to?: To;
}

const PrivatePage: React.FC<PrivatePageProps> = ({ page: Page, to = '/' }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  const searchParams = useMemo(
    () => new URLSearchParams(location.search),
    [location.search],
  );

  if (!isAuthenticated) {
    window.localStorage.setItem(
      '@login.redirect',
      window.btoa(
        `${location.pathname}${
          searchParams.toString().trim() ? `?${searchParams}` : ''
        }`,
      ),
    );

    return <Navigate to={to} state={{ from: location }} />;
  }

  return <Page />;
};

export default PrivatePage;
