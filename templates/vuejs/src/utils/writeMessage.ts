import {
  ICommandResult,
  Pact,
  createClient,
  isSignedTransaction,
  signWithChainweaver,
} from '@kadena/client';

import { API_HOST, CHAIN_ID, NETWORK_ID } from './consts';
import getAccountKey from './getAccountKey';

interface IWriteMessage {
  account: string;
  messageToWrite: string;
}

export default async function writeMessage({
  account,
  messageToWrite,
}: IWriteMessage): Promise<ICommandResult> {
  try {
    const transactionBuilder = Pact.builder
      .execution(
        Pact.modules['free.cka-message-store']['write-message'](
          account,
          messageToWrite,
        ),
      )
      .addSigner(getAccountKey(account), (withCapability) => [
        withCapability('coin.GAS'),
        withCapability('free.cka-message-store.ACCOUNT-OWNER', account),
      ])
      .setMeta({ chainId: CHAIN_ID, senderAccount: account })
      .setNetworkId(NETWORK_ID)
      .createTransaction();

    const signedTx = await signWithChainweaver(transactionBuilder);
    const client = createClient(API_HOST);

    if (isSignedTransaction(signedTx)) {
      const transactionDescriptor = await client.submit(signedTx);
      const response = await client.listen(transactionDescriptor);
      if (response.result.status === 'success') {
        return response;
      } else {
        throw response.result.error;
      }
    } else {
      throw new Error('Failed to sign transaction');
    }
  } catch (e) {
    throw new Error(e);
  }
}
