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

// RECIPIENT ADDRESS & NFT INDEX - NEED TO BE CHANGED
const recipientAddress = "AU1L3YbT7SBwxdVwzacoonEgou5oXi5mNfXMaXqYhoL69GVrDUre";
const nftIndex = 1n;

const isMainnet = String(process.env.MAINNET).toLowerCase() === 'true';

const account = await Account.fromEnv();
const provider = isMainnet ? JsonRpcProvider.mainnet(account) : JsonRpcProvider.buildnet(account);
console.log('Mint NFT to', recipientAddress, 'on', isMainnet ? 'MAINNET' : 'BUILDNET', '...');

const contractAddress = isMainnet ? String(process.env.MAINNET_CONTRACT_ADDRESS) : String(process.env.BUILDNET_CONTRACT_ADDRESS);
const contract = new SmartContract(provider, contractAddress);

const mintResult = await contract.call('mint', new Args().addString(recipientAddress).addU256(nftIndex), { coins: Mas.fromString('10') });
console.log('Mint transaction ID:', mintResult.id);

const op = new Operation(provider, mintResult.id);
const mintOp = await op.waitSpeculativeExecution();
console.log('Mint operation status:', mintOp === OperationStatus.SpeculativeSuccess ? 'Success' : 'Failed');