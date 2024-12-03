import { FC } from 'react';

import { SVGProps } from '@/components/svg/svg.types';
import { AssetMetadata } from '@/lib/coins-manager/coins-manager.types';

export enum FilterTypeEnum {
  CATEGORY = 'category',
}

export enum FormFilterValue {
  'official' = 'official',
  'all' = 'all',
  'volatile' = 'volatile',
  'stable' = 'stable',
  'farm' = 'farm',
}

export enum EarnTabEnum {
  Earn,
  MyPosition,
}

export interface EarncCardTokenInfoProps {
  coins: ReadonlyArray<AssetMetadata>;
}
export interface FilterItemProps {
  type: FilterTypeEnum;
  value: FormFilterValue;
}

export enum EarnLabelEnum {
  'staked' = 'staked',
  'unstaked' = 'unstaked',
  'rewards' = 'rewards',
}

export interface ISrEarn {
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

export interface EarnCardProps {
  label: string;
  balance: number;
  tokenName: string;
  earnAmount: number;
  TokenIcon: FC<SVGProps>;
}
