import BigNumber from 'bignumber.js';
import { FC, useEffect, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { useDebounce } from 'use-debounce';

import { COIN_TYPE_TO_FA } from '@/constants/coin-fa';
import { useInterestDex } from '@/hooks/use-interest-dex';
import { FixedPointMath } from '@/lib';
import { TokenStandard } from '@/lib/coins-manager/coins-manager.types';
import { ZERO_BIG_NUMBER } from '@/utils';

import { SwapForm } from '../swap.types';
import { getPath } from '../swap.utils';
import { SwapMessages } from './swap-messages';

const SwapManager: FC = () => {
  const dex = useInterestDex();
  const { control, setValue, getValues } = useFormContext<SwapForm>();

  const origin = useWatch({ control, name: 'origin' });
  const [fromValue] = useDebounce(
    useWatch({ control, name: 'from.value' }),
    800
  );
  const [toValue] = useDebounce(useWatch({ control, name: 'to.value' }), 800);

  const [hasNoMarket, setHasNoMarket] = useState(false);

  useEffect(() => {
    setValue('error', null);

    if (
      (origin === 'from' && !Number(fromValue)) ||
      (origin === 'to' && !Number(toValue))
    ) {
      setValue(`${origin === 'from' ? 'to' : 'from'}.value`, '0');
      setValue(`${origin === 'from' ? 'to' : 'from'}.valueBN`, ZERO_BIG_NUMBER);
      setHasNoMarket(false);
      return;
    }

    if (!getValues(`${origin === 'from' ? 'to' : 'from'}.symbol`)) return;

    const to = getValues('to');
    const from = getValues('from');

    const tokenIn = (
      from.standard === TokenStandard.COIN
        ? COIN_TYPE_TO_FA[from.type]
        : from.type
    )?.toString();

    const tokenOut = (
      to.standard === TokenStandard.COIN ? COIN_TYPE_TO_FA[to.type] : to.type
    )?.toString();

    if (!tokenIn || !tokenOut) return;

    const path = getPath(tokenIn, tokenOut).map((address) =>
      address.toString()
    );

    const amount = BigInt(
      FixedPointMath.toBigNumber(
        origin === 'from' ? fromValue : toValue,
        origin === 'from' ? from.decimals : to.decimals
      )
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

            const receivedAmountOut = String(
              FixedPointMath.toNumber(
                BigNumber(amountOut!.toString()),
                to.decimals
              )
            );

            if (receivedAmountOut === '0') setHasNoMarket(true);
            else {
              setHasNoMarket(false);
              setValue('to.value', receivedAmountOut);
              setValue('to.valueBN', BigNumber(amountOut!.toString()));
              setValue('focus', false);
            }
          })
          .catch((e) => {
            console.warn(e);
          })
      : dex
          .quotePathAmountIn({
            path,
            amount,
          })
          .then(({ amountIn }) => {
            setValue('path', path);

            const receivedAmountIn = String(
              FixedPointMath.toNumber(
                BigNumber(amountIn!.toString()),
                from.decimals
              )
            );

            if (receivedAmountIn === '0') setHasNoMarket(true);
            else {
              setHasNoMarket(false);
              setValue('from.value', receivedAmountIn);
              setValue('from.valueBN', BigNumber(amountIn!.toString()));
              setValue('focus', false);
            }
          })
          .catch((e) => {
            console.warn(e);
          });
  }, [fromValue, toValue]);

  return (
    <>
      <SwapMessages control={control} hasNoMarket={hasNoMarket} />
    </>
  );
};

export default SwapManager;
