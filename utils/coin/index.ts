import {
  AccountAddress,
  Aptos,
  InputViewFunctionData,
} from '@aptos-labs/ts-sdk';
import {
  COINS,
  FUNGIBLE_ASSETS,
  Network,
} from '@interest-protocol/aptos-sr-amm';
import { pathOr, propOr, values } from 'ramda';
import invariant from 'tiny-invariant';

import { CoinBalance } from '@/interface';
import {
  AssetMetadata,
  TokenStandard,
} from '@/lib/coins-manager/coins-manager.types';

import {
  ClientMetadata,
  CoinMetadata,
  FAMetadata,
  MetadataSources,
} from './coin.types';

export const isAptos = (id: string) =>
  id === '0x1::aptos_coin::AptosCoin' || Number(id) === 0xa;

export const getCoinTypeFromCoinStoreType = (coinStoreType: string) =>
  coinStoreType.split('<')[1].split('>')[0];

export const getAddressCoinBalances = async (
  account: string,
  client: Aptos
): Promise<CoinBalance[]> => {
  const data = await client.getAccountResources({
    accountAddress: AccountAddress.from(account),
  });

  return data
    .filter((resource) => resource.type.startsWith('0x1::coin::CoinStore'))
    .map((resource) => ({
      type: getCoinTypeFromCoinStoreType(resource.type),
      balance: BigInt(pathOr(0, ['data', 'coin', 'value'], resource)),
    }));
};

export const getFaPrimaryStore = async (
  owner: string,
  fa: string,
  client: Aptos
) => {
  try {
    const payload: InputViewFunctionData = {
      function: `0x1::primary_fungible_store::primary_store`,
      functionArguments: [owner, fa],
      typeArguments: ['0x1::fungible_asset::Metadata'],
    };

    const data = await client.view({ payload });

    invariant(data.length > 0, 'Data is empty');

    const inner = propOr('', 'inner', data[0]);

    invariant(inner, 'Inner is empty');

    const x = await client.getAccountResource({
      accountAddress: inner as `${string}::${string}::${string}`,
      resourceType: `0x1::fungible_asset::FungibleStore`,
    });

    const key: string = pathOr('', ['metadata', 'inner'], x);

    return {
      balance: BigInt(propOr(0, 'balance', x)),
      frozen: propOr(false, 'frozen', x),
      fa: FUNGIBLE_ASSETS[Network.Porto][key],
    };
  } catch {
    return {
      balance: BigInt(0),
      frozen: false,
      fa: FUNGIBLE_ASSETS[Network.Porto][fa],
    };
  }
};

export const parseToMetadata = ({
  name,
  symbol,
  decimals,
  ...metadata
}: MetadataSources): AssetMetadata => {
  const type = (
    (metadata as CoinMetadata).type ??
    (metadata as FAMetadata).address ??
    (metadata as ClientMetadata).asset_type
  ).toString();

  const standard = (metadata as CoinMetadata).type
    ? TokenStandard.COIN
    : (metadata as FAMetadata).address
      ? TokenStandard.FA
      : ((metadata as ClientMetadata).token_standard as TokenStandard);

  const iconUri =
    (metadata as CoinMetadata | FAMetadata).iconUri ??
    (metadata as ClientMetadata).icon_uri ??
    undefined;

  const projectUri =
    (metadata as FAMetadata).projectUri ??
    (metadata as ClientMetadata).project_uri ??
    undefined;

  return {
    type,
    name,
    symbol,
    decimals,
    standard,
    ...(iconUri && { iconUri }),
    ...(projectUri && { projectUri }),
  };
};

export const getCoinMetadata = (
  type: string,
  client: Aptos
): CoinMetadata | FAMetadata | Promise<ClientMetadata> => {
  const metadata =
    values(COINS[Network.Porto]).find((coin) => coin.type === type) ??
    values(FUNGIBLE_ASSETS[Network.Porto]).find((fa) =>
      fa.address.equals(AccountAddress.from(type))
    );

  if (metadata) return metadata as CoinMetadata | FAMetadata;

  return client.getFungibleAssetMetadataByAssetType({ assetType: type });
};
