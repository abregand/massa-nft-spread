import 'dotenv/config';
import {
  Account,
  Args,
  Mas,
  SmartContract,
  JsonRpcProvider,
  Operation,
  OperationStatus,
} from '@massalabs/massa-web3';

// OWNER ADDRESS - NEED TO BE CHANGED
const ownerAddress = "AU1L3YbT7SBwxdVwzacoonEgou5oXi5mNfXMaXqYhoL69GVrDUrE";

const isMainnet = String(process.env.MAINNET).toLowerCase() === 'true';

const account = await Account.fromEnv();
const provider = isMainnet ? JsonRpcProvider.mainnet(account) : JsonRpcProvider.buildnet(account);
console.log('Set owner to', ownerAddress, 'on', isMainnet ? 'MAINNET' : 'BUILDNET', '...');

const contractAddress = isMainnet ? String(process.env.MAINNET_CONTRACT_ADDRESS) : String(process.env.BUILDNET_CONTRACT_ADDRESS);
const contract = new SmartContract(provider, contractAddress);

const setOwnerResult = await contract.call('setOwner', new Args().addString(ownerAddress), { coins: Mas.fromString('0.01') });
console.log('Set owner transaction ID:', setOwnerResult.id);

const op = new Operation(provider, setOwnerResult.id);
const setOwnerOp = await op.waitSpeculativeExecution();
console.log('Set owner operation status:', setOwnerOp === OperationStatus.SpeculativeSuccess ? 'Success' : 'Failed');