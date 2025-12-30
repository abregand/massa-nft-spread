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

// MINT PRICE - NEED TO BE CHANGED
const mintPrice = Mas.fromString('10');

const isMainnet = String(process.env.MAINNET).toLowerCase() === 'true';

const account = await Account.fromEnv();
const provider = isMainnet ? JsonRpcProvider.mainnet(account) : JsonRpcProvider.buildnet(account);
console.log('Set mint price to', Mas.toString(mintPrice), 'MAS on', isMainnet ? 'MAINNET' : 'BUILDNET', '...');

const contractAddress = isMainnet ? String(process.env.MAINNET_CONTRACT_ADDRESS) : String(process.env.BUILDNET_CONTRACT_ADDRESS);
const contract = new SmartContract(provider, contractAddress);

const setMintPriceResult = await contract.call('setMintPrice', new Args().addU64(mintPrice), { coins: Mas.fromString('0.01') });
console.log('Set mint price transaction ID:', setMintPriceResult.id);

const op = new Operation(provider, setMintPriceResult.id);
const setMintPriceOp = await op.waitSpeculativeExecution();
console.log('Set mint price operation status:', setMintPriceOp === OperationStatus.SpeculativeSuccess ? 'Success' : 'Failed');