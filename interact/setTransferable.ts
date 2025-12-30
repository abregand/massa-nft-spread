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

// TRANSFERABLE ? - NEED TO BE CHANGED
const transferable = false;

const isMainnet = String(process.env.MAINNET).toLowerCase() === 'true';

const account = await Account.fromEnv();
const provider = isMainnet ? JsonRpcProvider.mainnet(account) : JsonRpcProvider.buildnet(account);
console.log('Set transferable to', transferable ? 'YES' : 'NO', 'on', isMainnet ? 'MAINNET' : 'BUILDNET', '...');

const contractAddress = isMainnet ? String(process.env.MAINNET_CONTRACT_ADDRESS) : String(process.env.BUILDNET_CONTRACT_ADDRESS);
const contract = new SmartContract(provider, contractAddress);

const setTransferableResult = await contract.call('setTransferable', new Args().addBool(transferable), { coins: Mas.fromString('0.01') });
console.log('Set transferable transaction ID:', setTransferableResult.id);

const op = new Operation(provider, setTransferableResult.id);
const setTransferableOp = await op.waitSpeculativeExecution();
console.log('Set transferable operation status:', setTransferableOp === OperationStatus.SpeculativeSuccess ? 'Success' : 'Failed');