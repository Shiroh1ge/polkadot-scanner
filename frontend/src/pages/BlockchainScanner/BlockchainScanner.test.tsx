import React from 'react';
import { render, screen } from '@testing-library/react';
import BlockchainScanner from './BlockchainScanner';

test('renders learn react link', () => {
  render(<BlockchainScanner />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
