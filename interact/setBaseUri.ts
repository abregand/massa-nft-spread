import 'dotenv/config';
import {
  Account,
  Args,
  Mas,
  SmartContract,
  JsonRpcProvider,
  Operation,
  OperationStatus
} from '@massalabs/massa-web3';

// BASE URI - NEED TO BE CHANGED
const baseUri = "https://nft.massa.net/metadata/";

const isMainnet = String(process.env.MAINNET).toLowerCase() === 'true';

const account = await Account.fromEnv();
const provider = isMainnet ? JsonRpcProvider.mainnet(account) : JsonRpcProvider.buildnet(account);
console.log('Set base URI with', baseUri, 'on', isMainnet ? 'MAINNET' : 'BUILDNET', '...');

const contractAddress = isMainnet ? String(process.env.MAINNET_CONTRACT_ADDRESS) : String(process.env.BUILDNET_CONTRACT_ADDRESS);
const contract = new SmartContract(provider, contractAddress);

const setBaseUriResult = await contract.call('setBaseURI', new Args().addString(baseUri), { coins: Mas.fromString('0.01') });
console.log('Set base URI transaction ID:', setBaseUriResult.id);

const op = new Operation(provider, setBaseUriResult.id);
const setBaseUriOp = await op.waitSpeculativeExecution();
console.log('Set base URI operation status:', setBaseUriOp === OperationStatus.SpeculativeSuccess ? 'Success' : 'Failed');