import { Args } from '@massalabs/as-types';
import { mrc721Constructor } from './enumerable/MRC721Enumerable';
import { _setBaseURI, _setExtensionURI } from './metadata';
import { _setMintable, _setTransferable } from './manageable/manageable-internal';
import { onlyOwner } from './utils';
import { Address, transferCoins } from '@massalabs/massa-as-sdk';
import { _setMintPrice } from './enumerable';

/**
 * Contract constructor
 * @param _binaryArgs - The binary arguments passed to the constructor
 */
export function constructor(_binaryArgs: StaticArray<u8>): void {
    const args = new Args(_binaryArgs);
    const name = args.nextString().expect('name argument is missing or invalid');
    const symbol = args.nextString().expect('symbol argument is missing or invalid');
    const baseURI = args.nextString().expect('baseURI argument is missing or invalid');
    const extensionURI = args.nextString().expect('extensionURI argument is missing or invalid');
    const maxSupply = args.nextU256().expect('maxSupply argument is missing or invalid');
    const mintPrice = args.nextU64().expect('mintPrice argument is missing or invalid');
    const isMintable = args.nextBool().expect('isMintable argument is missing or invalid');
    const isTransferable = args.nextBool().expect('isTransferable argument is missing or invalid');

    mrc721Constructor(name, symbol, maxSupply);
    _setBaseURI(baseURI);
    _setExtensionURI(extensionURI);
    _setMintPrice(mintPrice);
    _setMintable(isMintable);
    _setTransferable(isTransferable);
}

/**
 * Sets the base URI for token metadata
 * @param _binaryArgs - The binary arguments containing the base URI
 */
export function setBaseURI(_binaryArgs: StaticArray<u8>): void {
    onlyOwner();
    const args = new Args(_binaryArgs);
    const baseURI = args.nextString().expect('baseURI argument is missing or invalid');
    _setBaseURI(baseURI);
}

/** 
 * Sets the extension URI for token metadata
 * @param _binaryArgs - The binary arguments containing the extension URI
 */
export function setExtensionURI(_binaryArgs: StaticArray<u8>): void {
    onlyOwner();
    const args = new Args(_binaryArgs);
    const extensionURI = args.nextString().expect('extensionURI argument is missing or invalid');
    _setExtensionURI(extensionURI);
}

/** 
 * Sets the mint price for minting new tokens
 * @param _binaryArgs - The binary arguments containing the mint price
 */
export function setMintPrice(_binaryArgs: StaticArray<u8>): void {
    onlyOwner();
    const args = new Args(_binaryArgs);
    const mintPrice = args.nextU64().expect('mintPrice argument is missing or invalid');
    _setMintPrice(mintPrice);
}

/** 
 * Sets whether new tokens can be minted
 * @param _binaryArgs - The binary arguments containing the mintable flag
 */
export function setMintable(_binaryArgs: StaticArray<u8>): void {
    onlyOwner();
    const args = new Args(_binaryArgs);
    const mintable = args.nextBool().expect('mintable argument is missing or invalid');
    _setMintable(mintable);
}

/** 
 * Sets whether tokens can be transferred
 * @param _binaryArgs - The binary arguments containing the transferable flag
 */
export function setTransferable(_binaryArgs: StaticArray<u8>): void {
    onlyOwner();
    const args = new Args(_binaryArgs);
    const transferable = args.nextBool().expect('transferable argument is missing or invalid');
    _setTransferable(transferable);
}

/**
 * Withdraws specified amount of MAS to a given address
 * @param _binaryArgs 
 */
export function withdraw(_binaryArgs: StaticArray<u8>): void {
    onlyOwner();
    const args = new Args(_binaryArgs);
    const amount = args.nextU64().expect('amount argument is missing or invalid');
    const address = args.nextString().expect('address argument is missing or invalid');
    transferCoins(new Address(address), amount);
}

export {
  isApprovedForAll,
  setApprovalForAll,
  totalSupply,
  maxSupply,
  getApproved,
  approve,
  transferFrom,
  balanceOf,
  symbol,
  name,
  mint,
  ownerOf
} from './enumerable/MRC721Enumerable';
export { baseURI, tokenURI, uri } from './metadata/metadata';
export { setOwner, ownerAddress } from './utils/ownership';