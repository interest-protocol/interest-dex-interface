import { BTCSVG, DefaultTokenSVG, ETHSVG, USDCSVG } from '@/components/svg';

export const EARN_CARD_DATA = [
  {
    label: 'staked',
    tokenName: ' MOVE token',
    balance: 10,
    TokenIcon: DefaultTokenSVG,
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
    tokenName: 'USDC',
    balance: 80,
    TokenIcon: USDCSVG,
    earnAmount: 300.089,
  },
  {
    label: 'unstaked',
    tokenName: 'BTC',
    balance: 30000,
    TokenIcon: BTCSVG,
    earnAmount: 2.089,
  },
  {
    label: 'unstaked',
    tokenName: 'EHT',
    balance: 30,
    TokenIcon: ETHSVG,
    earnAmount: 567,
  },
];
