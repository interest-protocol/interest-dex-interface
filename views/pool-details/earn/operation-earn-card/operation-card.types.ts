import { PoolToken } from '@/views/pools/pools.types';

export interface OperationEarnCardProps {
  token: PoolToken;
  onPrimary: () => void;
  onSecondary?: () => void;
  type: 'staked' | 'unstaked' | 'rewards';
}
