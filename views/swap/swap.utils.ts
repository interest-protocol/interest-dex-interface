import { AccountAddress } from '@aptos-labs/ts-sdk';
import { Network } from '@interest-protocol/aptos-sr-amm';

import { fasByPool } from '@/constants/pools';
import { CoinMetadata, FAMetadata } from '@/interface';
import { Quest } from '@/server/model/quest';

import { SwapToken } from './swap.types';

export const logSwap = (
  address: string,
  from: SwapToken,
  to: SwapToken,
  network: Network,
  txDigest: string
) =>
  fetch(`/api/v1/log-quest?network=${network}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Request-Headers': 'Content-Type',
      'Access-Control-Request-Method': 'POST',
    },
    body: JSON.stringify({
      address,
      txDigest,
      kind: 'swap',
      data: {
        coinIn: {
          id:
            (from as CoinMetadata).type ??
            (from as FAMetadata).address.toString(),
          amount: from.value,
          symbol: from.symbol,
        },
        coinOut: {
          id:
            (from as CoinMetadata).type ??
            (from as FAMetadata).address.toString(),
          amount: to.value,
          symbol: to.symbol,
        },
      },
    } as Omit<Quest, 'timestamp'>),
  });

const getFaOptions = (fa: AccountAddress) =>
  fasByPool.reduce((acc, fas) => {
    if (fas.some((faItem) => faItem.equals(fa)))
      return [...acc, fas.find((faItem) => !faItem.equals(fa))!];
    return acc;
  }, [] as ReadonlyArray<AccountAddress>);

export const getPath = (faIn: AccountAddress, faOut: AccountAddress) => {
  const faInOptions = getFaOptions(faIn);

  if (faInOptions.some((fa) => fa?.equals(faOut))) return [faIn, faOut];

  const faOutOptions = getFaOptions(faOut);
  if (
    faInOptions.some((faInOption) =>
      faOutOptions.some((faOutOption) => faOutOption.equals(faInOption))
    )
  )
    return [
      faIn,
      faInOptions.find((faInOption) =>
        faOutOptions.some((faOutOption) => faOutOption.equals(faInOption))
      )!,
      faOut,
    ];

  const faInInnerOptions: ReadonlyArray<
    [AccountAddress, ReadonlyArray<AccountAddress>]
  > = faInOptions.map((faInOption) => [faInOption, getFaOptions(faInOption)]);

  if (
    faInInnerOptions.some(([, faInInnerOptionList]) =>
      faInInnerOptionList.some((faInOption) =>
        faOutOptions.some((faOutOption) => faOutOption.equals(faInOption))
      )
    )
  ) {
    const internalFas = faInInnerOptions.reduce(
      (acc, [targetFa, targetFaOptions]) => {
        const target4thLevel = targetFaOptions.find((faInOption) =>
          faOutOptions.some((faOutOption) => faOutOption.equals(faInOption))
        );

        if (target4thLevel)
          return [targetFa, target4thLevel] as [AccountAddress, AccountAddress];

        return acc;
      },
      [] as unknown as [AccountAddress, AccountAddress]
    );

    return [faIn, ...internalFas, faOut];
  }
  return [];
};