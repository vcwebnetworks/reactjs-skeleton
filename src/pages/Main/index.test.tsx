import React from 'react';

import { render, screen } from '@testing-library/react';

import MainPage from './index';

test('test page main', () => {
  render(<MainPage />);

  const text = screen.getByText('MainPage');

  expect(text).toBeInTheDocument();
});
