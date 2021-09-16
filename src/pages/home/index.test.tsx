// eslint-disable-next-line import/no-extraneous-dependencies
import { render, screen } from '@testing-library/react';

import Home from './index';

test('test page home', () => {
  render(<Home />);

  const text = screen.getByText('home');

  expect(text).toBeInTheDocument();
});
