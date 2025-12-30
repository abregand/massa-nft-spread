import { boolToByte, byteToBool, stringToBytes } from '@massalabs/as-types';
import { Storage } from '@massalabs/massa-as-sdk';

export const MINTABLE_KEY = stringToBytes('IS_MINTABLE');
export const TRANSFERABLE_KEY = stringToBytes('IS_TRANSFERABLE');

/**
 * 
 * @param state - the new state of mintable
 */
export function _setMintable(state: bool): void {
  Storage.set(MINTABLE_KEY, boolToByte(state));
}

/**
 * 
 * @param state - the new state of mintable
 */
export function _setTransferable(state: bool): void {
  Storage.set(TRANSFERABLE_KEY, boolToByte(state));
}

export function _isMintable(): bool {
  const isMintable = byteToBool(Storage.get(MINTABLE_KEY));
  return isMintable;
}

export function _isTransferable(): bool {
  const isTransferable = byteToBool(Storage.get(TRANSFERABLE_KEY));
  return isTransferable;
}