import 'dotenv/config';
import {
  Args,
  Mas,
  SmartContract,
  JsonRpcProvider,
  bytesToStr,
  U256,
  U64,
} from '@massalabs/massa-web3';

const isMainnet = String(process.env.MAINNET).toLowerCase() === 'true';

const provider = isMainnet ? JsonRpcProvider.mainnet() : JsonRpcProvider.buildnet();
console.log('Get data on', isMainnet ? 'MAINNET' : 'BUILDNET', '...');

const contractAddress = isMainnet ? String(process.env.MAINNET_CONTRACT_ADDRESS) : String(process.env.BUILDNET_CONTRACT_ADDRESS);
const contract = new SmartContract(provider, contractAddress);

const result01 = await contract.read('name', new Args());
console.log('Name:', bytesToStr(result01.value));

const result02 = await contract.read('symbol', new Args());
console.log('Symbol:', bytesToStr(result02.value));

const result03 = await contract.read('baseURI', new Args());
console.log('Base URI:', bytesToStr(result03.value));

const result04 = await contract.read('tokenURI', new Args().addU256(1n));
console.log('Token URI:', bytesToStr(result04.value));

/* OR
const result04b = await contract.read('uri', new Args().addU256(1n));
console.log('Token URI:', bytesToStr(result04b.value));
*/

const result05 = await contract.read('totalSupply', new Args());
const result06 = await contract.read('maxSupply', new Args());
console.log('Current supply:', U256.fromBytes(result05.value).toString(), '/', U256.fromBytes(result06.value).toString());

const result07 = await provider.readStorage(contractAddress, ['IS_MINTABLE', 'IS_TRANSFERABLE', 'OWNER', 'MINT_PRICE']);
console.log('Mint price:', result07 && result07[3] ? Mas.toString(U64.fromBytes(result07[3])) : 'N/A', 'MAS');
console.log('Is mintable ?:', result07 && result07[0] ? (result07[0][0] === 1 ? 'YES' : 'NO') : 'N/A');
console.log('Is transferable ?:', result07 && result07[1] ? (result07[1][0] === 1 ? 'YES' : 'NO') : 'N/A');
console.log('Owner:', result07 && result07[2] ? bytesToStr(result07[2]) : 'N/A');