import React, { ReactNode } from 'react';

import { Wrapper } from './styles';

type DefaultLayoutType = { children: ReactNode };

export default function({ children }: DefaultLayoutType) {
  return <Wrapper>{children}</Wrapper>;
}
