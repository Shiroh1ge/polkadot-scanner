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
        console.log('Something went wrong when trying to connect to the endpoint: ', error);
      });

      await api.current.isReady;
      console.log('api.current.isReady', api.current.isReady);
    })();

  }, [endpoint]);

  return api.current;
};


export const createPolkadotApi = async (endpoint: string) => {
  const provider = new WsProvider(endpoint, 100);
  provider.on('error', (error) => {
    provider.disconnect();
    console.log('Something went wrong when trying to connect to the endpoint: ', error);
  });

  return await ApiPromise.create(
    {
      provider
    }
  )
};
