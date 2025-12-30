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

// MINTABLE ? - NEED TO BE CHANGED
const mintable = false;

const isMainnet = String(process.env.MAINNET).toLowerCase() === 'true';

const account = await Account.fromEnv();
const provider = isMainnet ? JsonRpcProvider.mainnet(account) : JsonRpcProvider.buildnet(account);
console.log('Set mintable to', mintable ? 'YES' : 'NO', 'on', isMainnet ? 'MAINNET' : 'BUILDNET', '...');

const contractAddress = isMainnet ? String(process.env.MAINNET_CONTRACT_ADDRESS) : String(process.env.BUILDNET_CONTRACT_ADDRESS);
const contract = new SmartContract(provider, contractAddress);

const setMintableResult = await contract.call('setMintable', new Args().addBool(mintable), { coins: Mas.fromString('0.01') });
console.log('Set mintable transaction ID:', setMintableResult.id);

const op = new Operation(provider, setMintableResult.id);
const setMintableOp = await op.waitSpeculativeExecution();
console.log('Set mintable operation status:', setMintableOp === OperationStatus.SpeculativeSuccess ? 'Success' : 'Failed');