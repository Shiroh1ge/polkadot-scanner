import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders app', () => {
  render(<App />);
  const form = screen.getByRole('form');
  const headerTitle = screen.getByText('Blockchain Scanner');
  expect(form).toBeInTheDocument();
  expect(headerTitle).toBeInTheDocument();
});
