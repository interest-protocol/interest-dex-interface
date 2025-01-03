/* eslint-disable @typescript-eslint/no-unused-vars */
import { AccountAddress } from '@aptos-labs/ts-sdk';
import { SrPool } from '@interest-protocol/aptos-sr-amm';
import BigNumber from 'bignumber.js';

import { AssetMetadata } from '@/lib/coins-manager/coins-manager.types';

export type BigNumberish = BigNumber | bigint | string | number;

export interface CoinData {
  type: `0x${string}`;
  decimals: number;
  symbol: string;
}

export interface PoolPageProps {
  address: string;
}

export enum PoolTypeEnum {
  CLAMM = 'CLAMM',
  srAMM = 'SR-AMM',
}

export interface AmmPoolCoinTypes {
  typeX: string;
  typeY: string;
}

export interface SrAmmPool {
  isVolatile: boolean;
  poolAddress: string;
  poolType: PoolTypeEnum;
  coins: AmmPoolCoinTypes;
}

export interface ISrPool {
  supply: bigint;
  balanceY: bigint;
  balanceX: bigint;
  metadataY: string;
  metadataX: string;
  isSrMode: boolean;
  poolAddress: string;
  bidLiquidity: bigint;
  slotBalanceX: bigint;
  slotBalanceY: bigint;
  lastSlotTimestamp: bigint;
  metadata: {
    x: AssetMetadata;
    y: AssetMetadata;
    pool: AssetMetadata;
  };
}

export interface SrAmmPoolWithMetadata
  extends Omit<SrPool, 'metadataX' | 'metadataY'> {
  metadata: AssetMetadata;
  metadataX: AssetMetadata;
  metadataY: AssetMetadata;
}

export interface CoinBalance {
  type: string;
  balance: bigint;
}

export interface SdkSrAmmConfig {
  type: `${string}::${string}::${string}`;
  admin: AccountAddress;
  adminFee: bigint;
  delay: bigint;
  fee: bigint;
  newFaPaymentAmount: bigint;
  pendingAdmin: AccountAddress;
  slotWindow: bigint;
  start: bigint;
  treasury: AccountAddress;
}

export interface PriceResponse {
  coin: string;
  price: number;
  priceChange24HoursPercentage: number;
}
