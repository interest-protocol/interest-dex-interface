import { MOVESVG, USDCSVG, USDTSVG } from '@/components/svg';

export const EARN_CARD_DATA = [
  {
    label: 'staked',
    tokenName: ' MOVE token',
    balance: 10,
    TokenIcon: MOVESVG,
    earnAmount: 12.0089,
  },
  {
    label: 'unstaked',
    tokenName: 'USDC',
    balance: 100000,
    TokenIcon: USDCSVG,
    earnAmount: 2.089,
  },
  {
    label: 'rewards',
    tokenName: 'USDT',
    balance: 80,
    TokenIcon: USDTSVG,
    earnAmount: 300.089,
  },
];
