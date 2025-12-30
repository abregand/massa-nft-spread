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

// AMOUNT & RECIPIENT ADDRESS - NEED TO BE CHANGED
const amountToWithdraw = Mas.fromString('1');
const recipientAddress = "AU1L3YbT7SBwxdVwzacoonEgou5oXi5mNfXMaXqYhoL69GVrDUrE";

const isMainnet = String(process.env.MAINNET).toLowerCase() === 'true';

const account = await Account.fromEnv();
const provider = isMainnet ? JsonRpcProvider.mainnet(account) : JsonRpcProvider.buildnet(account);
console.log('Withdraw to', recipientAddress, 'on', isMainnet ? 'MAINNET' : 'BUILDNET', '...');

const contractAddress = isMainnet ? String(process.env.MAINNET_CONTRACT_ADDRESS) : String(process.env.BUILDNET_CONTRACT_ADDRESS);
const contract = new SmartContract(provider, contractAddress);

const withdrawResult = await contract.call('withdraw', new Args().addU64(amountToWithdraw).addString(recipientAddress), { coins: Mas.fromString('0') });
console.log('Withdraw transaction ID:', withdrawResult.id);

const op = new Operation(provider, withdrawResult.id);
const withdrawOp = await op.waitSpeculativeExecution();
console.log('Withdraw operation status:', withdrawOp === OperationStatus.SpeculativeSuccess ? 'Success' : 'Failed');