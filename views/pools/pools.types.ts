import { SrAmmPool } from '@/interface';
import { AssetMetadata } from '@/lib/coins-manager/coins-manager.types';

import { ISwapSettings } from '../swap/swap.types';
import { FormFilterValue } from './pool-card/pool-card.types';

export enum FilterTypeEnum {
  ALGORITHM = 'algorithm',
  POOL_TYPE = 'pool_type',
  CATEGORY = 'category',
}

export enum PoolTabEnum {
  Pools,
  MyPosition,
}

export enum PoolOption {
  Deposit,
  Withdraw,
}

export interface PoolCardListProps {
  tab: PoolTabEnum;
}

export interface PoolCardListContentProps {
  done: boolean;
  next?: () => void;
  hasMore?: boolean;
  arePoolsLoading: boolean;
  pools?: ReadonlyArray<ReadonlyArray<SrAmmPool>>;
}

export interface PoolTokenWithMetadata extends AssetMetadata {
  value: string;
  locked: boolean;
}

export type PoolToken = PoolTokenWithMetadata;

export interface IPoolForm {
  error: string | null;
  lpCoin: PoolToken;
  tokenSelected?: string;
  explorerLink: string;
  isFindingPool: boolean;
  settings: ISwapSettings;
  tokenList: ReadonlyArray<PoolToken>;
  filterList: ReadonlyArray<FilterItemProps>;
  pool: SrAmmPool;
}

export interface FilterItemProps {
  type: FilterTypeEnum;
  value: FormFilterValue;
}
