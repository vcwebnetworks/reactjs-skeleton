import React, { Suspense, useMemo } from 'react';
import { To } from 'react-router-dom';

import PrivatePage from '@/components/private-page';
import { loadLazyPage } from '@/utils';

interface Props {
  page: string | React.ComponentType;
  auth?: boolean;
  to?: To;
}

const LoadPage: React.FC<Props> = ({ page, auth = false, to }) => {
  const Page = typeof page === 'string' ? loadLazyPage(page) : page;

  const renderPage = useMemo(() => {
    if (auth) return <PrivatePage page={Page} to={to} />;
    return <Page />;
  }, [Page, auth, to]);

  return <Suspense fallback={<>loading page</>}>{renderPage}</Suspense>;
};

export default LoadPage;
