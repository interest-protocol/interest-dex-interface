/**
 * @RoutesEnum is a custom data type
 * @description this data type will help us to uniformize our route names
 */
export enum RoutesEnum {
  Swap = 'swap',
  Pools = 'pools',
  Faucet = 'faucet',
  Analytics = 'analytics',
  PoolCreate = 'pool-create',
  PoolDetails = 'pool-details',
}

/**
 * @Routes is the constant with our internal or external routes
 * @description this constant will help us to create standard routes
 */
export const Routes: Record<RoutesEnum, string> = {
  [RoutesEnum.Swap]: '/',
  [RoutesEnum.Pools]: '/pools',
  [RoutesEnum.Faucet]: '/faucet',
  [RoutesEnum.Analytics]: '/analytics',
  [RoutesEnum.PoolCreate]: '/pools/create',
  [RoutesEnum.PoolDetails]: '/pools/details',
};
