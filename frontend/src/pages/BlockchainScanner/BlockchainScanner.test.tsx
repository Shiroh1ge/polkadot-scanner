import { ApiPromise } from '@polkadot/api';
import React from 'react';
import { act, render, screen, waitFor } from '@testing-library/react';
import { DEFAULT_API_URL } from '../../constants/api.constants';
import BlockchainScanner from './BlockchainScanner';
import userEvent from '@testing-library/user-event';
import * as api from '@polkadot/api';

jest.mock('@polkadot/api', () => ({
  ...jest.requireActual('@polkadot/api'),
  WsProvider: jest.fn().mockReturnValue({ on: jest.fn() }),
  ApiPromise: {
    create: jest.fn(),
  },
}));

describe('BlockchainScanner', () => {
  let mockApi: Partial<ApiPromise>;

  beforeEach(() => {
    (api.WsProvider as jest.Mock).mockReturnValue({ on: jest.fn() });
    mockApi = {
      at: jest.fn().mockReturnValue({
        query: {
          system: {
            events: jest.fn(),
          },
          timestamp: {
            now: jest.fn().mockReturnValue(1000000),
          },
        },
      }),
      rpc: {
        chain: {
          getBlockHash: jest.fn(),
          getBlock: jest.fn(),
        },
      } as any,
    };
  });
  it('renders scanner elements', async () => {
    render(<BlockchainScanner />);
    await waitFor(() => {
      // ideally we use getByRole for the input, but it doesn't work for the MUI table for some reason
      expect(screen.getByText('Start Block')).toBeInTheDocument();
      expect(screen.getByText('End Block')).toBeInTheDocument();
      expect(screen.getByText('Endpoint')).toBeInTheDocument();
      expect(screen.getByRole('form')).toBeInTheDocument();
    });
  });

  it('submits a valid form correctly', async () => {
    (api.ApiPromise.create as jest.Mock).mockReturnValue(Promise.resolve(mockApi));
    render(<BlockchainScanner />);
    // we use this to wait for useEffect to run first
    await act(
      () =>
        new Promise((resolve) => {
          resolve();
        }),
    );

    const startBlockInput = screen.getByTestId('start-block-input');
    const endBlockInput = screen.getByTestId('end-block-input');
    const endpointInput = screen.getByTestId('endpoint-input');
    const startBlock = 1000;
    const endBlock = 1002;

    await act(() => {
      userEvent.type(startBlockInput, startBlock.toString());
      userEvent.type(endBlockInput, endBlock.toString());
    });

    await act(() => {
      userEvent.click(screen.getByTestId('submit-button'));
    });

    await waitFor(() => {
      expect(startBlockInput).toHaveValue(startBlock);
      expect(endBlockInput).toHaveValue(endBlock);
      expect(endpointInput).toHaveValue(DEFAULT_API_URL);
    });
  });

  it('attempt to scan correctly', async () => {
    (api.ApiPromise.create as jest.Mock).mockReturnValue(Promise.resolve(mockApi));
    render(<BlockchainScanner />);
    // we use this to wait for useEffect to run first
    await act(
      () =>
        new Promise((resolve) => {
          resolve();
        }),
    );

    const startBlockInput = screen.getByTestId('start-block-input');
    const endBlockInput = screen.getByTestId('end-block-input');
    const endpointInput = screen.getByTestId('endpoint-input');
    const startBlock = 1000;
    const endBlock = 1002;
    const totalCallTimes = endBlock - startBlock + 1;

    await act(() => {
      userEvent.type(startBlockInput, startBlock.toString());
      userEvent.type(endBlockInput, endBlock.toString());
    });

    await act(() => {
      userEvent.click(screen.getByTestId('submit-button'));
    });

    await waitFor(async () => {
      expect(api.WsProvider).toHaveBeenCalledWith(DEFAULT_API_URL);
      expect(api.ApiPromise.create).toHaveBeenCalledTimes(1);
      expect(mockApi.rpc?.chain.getBlockHash).toHaveBeenCalledWith(startBlock);
      expect(mockApi.rpc?.chain.getBlockHash).toHaveBeenCalledWith(endBlock);
      expect(mockApi.rpc?.chain.getBlockHash).toBeCalledTimes(totalCallTimes);
      expect(mockApi.at).toBeCalledTimes(totalCallTimes);

      const apiAt = await mockApi.at!('0x0');
      expect(apiAt?.query?.timestamp.now).toBeCalledTimes(totalCallTimes);
      expect(apiAt?.query?.system.events).toBeCalledTimes(totalCallTimes);
    });
  });
});
