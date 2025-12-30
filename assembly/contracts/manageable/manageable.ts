/**
 *
 * This is an extension.
 *
 * It provides functions to manage the mintable and transferable properties of the contract
 * It should be used with the internal functions from manageable-internal
 *
 */

import { _isMintable, _isTransferable, _setMintable, _setTransferable } from './manageable-internal';

export function isMintable(): bool {
  return _isMintable();
}

export function isTransferable(): bool {
  return _isTransferable();
}