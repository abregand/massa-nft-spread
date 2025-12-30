import 'dotenv/config';
import {
  Account,
  Args,
  Mas,
  SmartContract,
  JsonRpcProvider,
} from '@massalabs/massa-web3';
import { getScByteCode } from './utils';

const isMainnet = String(process.env.MAINNET).toLowerCase() === 'true';

const account = await Account.fromEnv();
const provider = isMainnet ? JsonRpcProvider.mainnet(account) : JsonRpcProvider.buildnet(account);

console.log('Deploying contract on', isMainnet ? 'MAINNET' : 'BUILDNET', '...');

const byteCode = getScByteCode('build', 'main.wasm');

const constructorArgs = new Args()
                                .addString('TEST NFT') // name
                                .addString('TST') // symbol
                                .addString('https://example.com/metadata/') // base_uri
                                .addString('.json') // extension_uri - BASE_URI + token_id + EXTENSION_URI = full URI
                                .addU256(106n) // max_supply
                                .addU64(100_000_000_000n) // mint_price = 100 MAS
                                .addBool(false) // is_mintable
                                .addBool(false); // is_transferable

const contract = await SmartContract.deploy(
  provider,
  byteCode,
  constructorArgs,
  { coins: Mas.fromString('0.05') },
);

console.log('Contract deployed at:', contract.address);

const events = await provider.getEvents({
  smartContractAddress: contract.address,
});

for (const event of events) {
  console.log('Event message:', event.data);
}
