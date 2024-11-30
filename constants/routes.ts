export enum RoutesEnum {
  Swap = 'swap',
  Earn = 'earn',
  Pools = 'pools',
  Analytics = 'analytics',
  PoolCreate = 'pool-create',
  PoolDetails = 'pool-details',
  TokenCreate = 'token-create',
  EarnDetails = 'earn-details',
}

/**
 * @Routes is the constant with our internal or external routes
 * @description this constant will help us to create standard routes
 */
export const Routes: Record<RoutesEnum, string> = {
  [RoutesEnum.Swap]: '/',
  [RoutesEnum.Pools]: '/pools',
  [RoutesEnum.Earn]: '/earn',
  [RoutesEnum.Analytics]: '/analytics',
  [RoutesEnum.PoolCreate]: '/pools/create',
  [RoutesEnum.TokenCreate]: '/create-token',
  [RoutesEnum.EarnDetails]: '/earn/details',
  [RoutesEnum.PoolDetails]: '/pools/details',
};
