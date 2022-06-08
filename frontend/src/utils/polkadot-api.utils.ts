import { ApiPromise, WsProvider } from '@polkadot/api';
import { useEffect, useRef } from 'react';

export const usePolkadotApi = (endpoint: string) => {
  const api = useRef<ApiPromise>();

  useEffect(() => {
    (async () => {
      if (api.current) {
        await api.current.disconnect();
      }
      const provider = new WsProvider(endpoint);
      api.current = new ApiPromise({ provider });

      provider.on('error', (error) => {
        provider.disconnect();
        console.error('Something went wrong when trying to connect to the endpoint: ', error);
      });

      await api.current.isReady;
    })();
  }, [endpoint]);

  return api.current;
};

export const createPolkadotApi = async (endpoint: string) => {
  const provider = new WsProvider(endpoint);
  provider.on('error', async (error) => {
    await provider.disconnect();
    console.error('Something went wrong when trying to connect to the endpoint: ', error);
  });

  let client;

  try {
    client = await ApiPromise.create({
      provider,
    });
  } catch (error) {
    console.error('Client could not initialize : ', error);
  }

  return client;
};
