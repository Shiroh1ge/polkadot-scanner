import { ApiPromise, WsProvider } from '@polkadot/api';

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
