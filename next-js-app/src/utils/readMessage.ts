import { ICommandResult, Pact, createClient } from '@kadena/client';
import { CHAIN_ID, NETWORK_ID, API_HOST } from './consts';

export default async function readMessage({
  account,
}): Promise<string> {
  try {
    const transactionBuilder = Pact.builder
      .execution(Pact.modules['free.cka-message-store']['read-message'](account))
      .setMeta({ chainId: CHAIN_ID })
      .setNetworkId(NETWORK_ID)
      .createTransaction();

    const staticClient = createClient(API_HOST);
    const res = await staticClient.local(transactionBuilder, {
      preflight: false,
      signatureVerification: false,
    });

    if (res.result.status === 'success') {
      return res.result.data;
    } else {
      throw res.result.error;
    }
  } catch (e) {
    throw new Error(e);
  }
};
