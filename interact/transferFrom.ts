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

// NFT ID & RECIPIENT ADDRESS - NEED TO BE CHANGED
const nftId = 1n;
const recipientAddress = "AU1L3YbT7SBwxdVwzacoonEgou5oXi5mNfXMaXqYhoL69GVrDUrE";

const isMainnet = String(process.env.MAINNET).toLowerCase() === 'true';

const account = await Account.fromEnv();
const provider = isMainnet ? JsonRpcProvider.mainnet(account) : JsonRpcProvider.buildnet(account);
console.log('Transfer NFT to', recipientAddress, 'on', isMainnet ? 'MAINNET' : 'BUILDNET', '...');

const contractAddress = isMainnet ? String(process.env.MAINNET_CONTRACT_ADDRESS) : String(process.env.BUILDNET_CONTRACT_ADDRESS);
const contract = new SmartContract(provider, contractAddress);

// TRANSFER FROM YOUR WALLET TO THE RECIPIENT ADDRESS
const transferResult = await contract.call('transferFrom', new Args().addString(account.address.toString()).addString(recipientAddress).addU256(nftId), { coins: Mas.fromString('0.01') });
console.log('Transfer transaction ID:', transferResult.id);

const op = new Operation(provider, transferResult.id);
const transferOp = await op.waitSpeculativeExecution();
console.log('Transfer operation status:', transferOp === OperationStatus.SpeculativeSuccess ? 'Success' : 'Failed');