import {
  COIN_TYPES,
  COINS,
  FA_ADDRESSES,
  Network,
} from '@interest-protocol/aptos-sr-amm';
import BigNumber from 'bignumber.js';
import { values } from 'ramda';
import { type FC, useEffect, useId } from 'react';
import useSWR from 'swr';

import { getAddressCoinBalances, getFaPrimaryStore, isAptos } from '@/utils';

import { useAptosClient } from '../aptos-provider/aptos-client/aptos-client.hooks';
import { useCurrentAccount } from '../aptos-provider/wallet/wallet.hooks';
import { useCoins } from './coins-manager.hooks';
import { Asset } from './coins-manager.types';

const CoinsManager: FC = () => {
  const id = useId();
  const client = useAptosClient();
  const currentAccount = useCurrentAccount();

  const { setError, setLoading, setCoins, setMutate } = useCoins();

  useEffect(() => {
    setCoins({});
  }, [currentAccount]);

  const { mutate } = useSWR(
    [id, currentAccount?.address, CoinsManager.name],
    async () => {
      try {
        setError(null);
        setLoading(true);

        if (!currentAccount?.address) return setCoins({});

        const fasRaw = await Promise.all(
          values(FA_ADDRESSES[Network.Porto]).map((address) =>
            getFaPrimaryStore(
              currentAccount.address,
              address.toString(),
              client
            )
          )
        );

        const fas = fasRaw.reduce(
          (acc, fa) => {
            if (BigNumber(String(fa.balance)).isZero()) return acc;

            return {
              ...acc,
              [fa.fa.address.toString()]: {
                metadata: {
                  name: fa.fa.name,
                  symbol: fa.fa.symbol,
                  address: fa.fa.address,
                  decimals: Number(fa.fa.decimals),
                },
                balance: BigNumber(fa.balance.toString()),
              },
            };
          },
          {} as Record<string, Asset>
        );

        const coinsRaw = await getAddressCoinBalances(
          currentAccount.address,
          client
        );

        const coins = coinsRaw.reduce(
          (acc, { type, balance }) => {
            if (
              values(COIN_TYPES[Network.Porto]).some((coinType) =>
                type.includes(coinType)
              )
            ) {
              const coinType = values(COIN_TYPES[Network.Porto]).find(
                (coinType) => type.includes(coinType)
              )!;

              if (isAptos(coinType))
                return {
                  ...acc,
                  [type]: {
                    metadata: COINS[Network.Porto].APT!,
                    balance: BigNumber(balance.toString()),
                  },
                };

              return {
                ...acc,
                [coinType]: {
                  metadata: COINS[Network.Porto][coinType],
                  balance: BigNumber(balance.toString()),
                },
              };
            }
            return acc;
          },
          {} as Record<string, Asset>
        );

        setCoins?.({ ...coins, ...fas } as Record<string, Asset>);
      } catch (e) {
        setError((e as Error).message);
      } finally {
        setLoading(false);
      }
    },
    {
      refreshInterval: 15000,
      revalidateOnFocus: false,
      revalidateOnMount: true,
      refreshWhenHidden: false,
    }
  );

  useEffect(() => {
    setMutate(mutate);
  }, []);

  return null;
};

export default CoinsManager;
