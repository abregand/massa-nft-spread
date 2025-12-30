/**
 *
 * This is an extension to the MRC1155 standard.
 *
 * It allows to store uri for each token id
 * It should be used with the internal functions from metadata-internal
 *
 */

import { _tokenURI, _baseURI } from './metadata-internal';
import { Args, stringToBytes } from '@massalabs/as-types';

/**
 *
 * Get the URI for a token id
 *
 * @param id - the id of the token
 *
 * @returns the URI for the token
 *
 */
export function tokenURI(binaryArgs: StaticArray<u8>): StaticArray<u8> {
  const args = new Args(binaryArgs);
  const id = args.nextU256().expect('id argument is missing or invalid');

  return stringToBytes(_tokenURI(id));
}
// SAME FUNTION WITH ANOTHER NAME FOR COMPATIBILITY
export function uri(binaryArgs: StaticArray<u8>): StaticArray<u8> {
  const args = new Args(binaryArgs);
  const id = args.nextU256().expect('id argument is missing or invalid');

  return stringToBytes(_tokenURI(id));
}

/**
 * 
 * Get the base URI
 * 
 * @param _ 
 * @returns the base URI
 */
export function baseURI(_: StaticArray<u8>): StaticArray<u8> {
  return stringToBytes(_baseURI());
}
