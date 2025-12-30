import { bytesToString, stringToBytes, u256ToBytes } from '@massalabs/as-types';
import { Storage, createEvent, generateEvent } from '@massalabs/massa-as-sdk';
import { u256 } from 'as-bignum/assembly';

export const BASE_URI_KEY = stringToBytes('BASE_URI');
export const EXTENSION = stringToBytes('EXTENSION_URI');

/**
 * Set the base URI for all token IDs
 * @param newBaseUri - the new base URI
 */
export function _setBaseURI(newBaseUri: string): void {
  Storage.set(BASE_URI_KEY, stringToBytes(newBaseUri));
}

/**
 * Set the extension URI for all token IDs
 * @param newExtensionUri - the new extension URI
 */
export function _setExtensionURI(newExtensionUri: string): void {
  Storage.set(EXTENSION, stringToBytes(newExtensionUri));
}

/**
 * @returns the base URI
 */
export function _baseURI(): string {
  return Storage.has(BASE_URI_KEY)
    ? bytesToString(Storage.get(BASE_URI_KEY))
    : '';
}

/**
 * Returns the URI for a given token ID.
 *
 * It returns the base uri concatenated to the tokenUri if the tokenUri is not empty
 * And if it is empty it returns the super uri from token-internal
 *
 * @param id - The token ID
 * @returns the URI for the given token ID
 */
export function _tokenURI(id: u256): string {
  const extension = Storage.get(EXTENSION);
  return _baseURI().concat(id.toString()).concat(bytesToString(extension));
}
