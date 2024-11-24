import BigNumber from 'bignumber.js';
import { FC, useEffect } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { useDebounce } from 'use-debounce';

import { TREASURY } from '@/constants';
import { COIN_TYPE_TO_FA } from '@/constants/coin-fa';
import { EXCHANGE_FEE_BPS } from '@/constants/fees';
import { useInterestDex } from '@/hooks/use-interest-dex';
import { FixedPointMath } from '@/lib';
import { TokenStandard } from '@/lib/coins-manager/coins-manager.types';
import { ZERO_BIG_NUMBER } from '@/utils';

import { SwapForm } from '../swap.types';
import { getPath } from '../swap.utils';

const SwapManager: FC = () => {
  const dex = useInterestDex();
  const { control, setValue, getValues } = useFormContext<SwapForm>();

  const origin = useWatch({ control, name: 'origin' });
  const [value] = useDebounce(useWatch({ control, name: 'from.value' }), 800);

  useEffect(() => {
    setValue('error', null);

    if (!Number(value)) {
      setValue(`${origin === 'from' ? 'to' : 'from'}.value`, '0');
      setValue(`${origin === 'from' ? 'to' : 'from'}.valueBN`, ZERO_BIG_NUMBER);
      return;
    }

    if (!getValues(`${origin === 'from' ? 'to' : 'from'}.symbol`)) return;

    const to = getValues('to');
    const from = getValues('from');

    console.log({ EXCHANGE_FEE_BPS });

    fetch(
      `https://testnet.mosaic.ag/porto/v1/quote?srcAsset=${from.type}&dstAsset=${to.type}&amount=${from.valueBN.toFixed(0)}&feeInBps=${EXCHANGE_FEE_BPS}&feeReceiver=${TREASURY}&slippage=${getValues('settings.slippage')}`,
      {
        headers: {
          'x-api-key': 'tYPtSqDun-w9Yrric2baUAckKtzZh9U0',
        },
      }
    )
      .then((res) => res.json?.())
      .then(console.log);

    const tokenIn = (
      from.standard === TokenStandard.COIN
        ? COIN_TYPE_TO_FA[from.type]
        : from.type
    ).toString();
    const tokenOut = (
      to.standard === TokenStandard.COIN ? COIN_TYPE_TO_FA[to.type] : to.type
    ).toString();

    const path = getPath(tokenIn, tokenOut).map((address) =>
      address.toString()
    );

    const amount = BigInt(
      FixedPointMath.toBigNumber(value, from.decimals)
        .decimalPlaces(0, 1)
        .toString()
    );

    origin === 'from'
      ? dex
          .quotePathAmountOut({
            path,
            amount,
          })
          .then(({ amountOut }) => {
            setValue('path', path);
            setValue('to.valueBN', BigNumber(amountOut!.toString()));
            setValue(
              'to.value',
              String(
                FixedPointMath.toNumber(
                  BigNumber(amountOut!.toString()),
                  to.decimals
                )
              )
            );
            setValue('focus', false);
          })
          .catch((e) => {
            console.warn(e);
            setValue('error', 'Failed to quote. Reduce the Swapping amount.');
          })
      : dex
          .quotePathAmountIn({
            path,
            amount,
          })
          .then(({ amountIn }) => {
            setValue('path', path);
            setValue('from.valueBN', BigNumber(amountIn!.toString()));
            setValue('focus', false);
            setValue(
              'from.value',
              String(
                FixedPointMath.toNumber(
                  BigNumber(amountIn!.toString()),
                  from.decimals
                )
              )
            );
          })
          .catch((e) => {
            console.warn(e);
            setValue('error', 'Failed to quote. Reduce the Swapping amount.');
          });
  }, [value]);

  return null;
};

export default SwapManager;
