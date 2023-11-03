const { Pact, createClient } = require('@kadena/client');

const NETWORK_ID = 'testnet04';
const CHAIN_ID = '0';
const HOST = 'api.testnet.chainweb.com';
const API_HOST = `https://${HOST}/chainweb/0.0/${NETWORK_ID}/chain/${CHAIN_ID}/pact`;

const client = createClient(API_HOST);

listModules();

async function listModules() {
  const transaction = Pact.builder
    .execution('(list-modules)')
    .setMeta({ chainId: CHAIN_ID })
    .setNetworkId(NETWORK_ID)
    .createTransaction();

  const response = await client.local(transaction, {
    preflight: false,
    signatureVerification: false,
  });

  const { result } = response;
  console.log(result.data);
}
