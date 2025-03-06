import { Network } from '@interest-protocol/interest-aptos-v2';

export const DAY_IN_MS = 1000 * 60 * 60 * 24;

export const TREASURY =
  '0x9246635e191195a4866d1facb32c1928923ecb12f40f40b231a6d31c1e78480b';

export const MAX_NUMBER_INPUT_VALUE = 9000000000000000;

export const LOCAL_STORAGE_VERSION = 'v5';

export const PAGE_SIZE = 50;

export const RPC_URL = {
  [Network.MovementMainnet]: 'https://mainnet.movementlabs.xyz/v1',
};

export const INDEXER_URL = {
  [Network.MovementMainnet]: 'https://mainnet.movementnetwork.xyz/v1/graphql',
};

export const EXPLORER_URL = {
  [Network.MovementMainnet]: (path: string) =>
    `https://mainnet.movementnetwork.xyz/${path}`,
} as Record<Network, (path: string) => string>;

export const TOAST_DURATION = 10000;

export * from './routes';
