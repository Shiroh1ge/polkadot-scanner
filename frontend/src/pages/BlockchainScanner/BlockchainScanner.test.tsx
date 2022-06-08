import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import BlockchainScanner from './BlockchainScanner';

test('renders scanner elements', async () => {
  render(<BlockchainScanner />);
  await waitFor(() => {
    // ideally we use getByRole for the input, but it doesn't work for the MUI table for some reason
    expect(screen.getByText('Start Block')).toBeInTheDocument();
    expect(screen.getByText('End Block')).toBeInTheDocument();
    expect(screen.getByText('Endpoint')).toBeInTheDocument();
    expect(screen.getByRole('form')).toBeInTheDocument();
  });
});
