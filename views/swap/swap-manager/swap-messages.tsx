import BigNumber from 'bignumber.js';
import { propOr } from 'ramda';
import { FC, useState } from 'react';
import { useEffect } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import toast from 'react-hot-toast';

import { FixedPointMath } from '@/lib';
import { useCoins } from '@/lib/coins-manager/coins-manager.hooks';
import { isAptos, ZERO_BIG_NUMBER } from '@/utils';

import { SwapMessagesEnum } from '../swap.data';
import { SwapMessagesProps } from './swap-manager.types';

export const SwapMessages: FC<SwapMessagesProps> = ({
  control,
  hasNoMarket,
}) => {
  const { setValue } = useFormContext();
  const { coinsMap } = useCoins();
  const to = useWatch({ control: control, name: 'to' });
  const from = useWatch({ control: control, name: 'from' });
  const [toastState, setToastState] = useState<boolean>(false);
  const swapping = useWatch({ control: control, name: 'swapping' });
  const error = useWatch({ control: control, name: 'error' });

  const isFetchingSwapAmount = useWatch({
    control,
    name: 'to.isFetchingSwap',
  });

  const fromValue = +(propOr('0', 'value', from) as string);
  const toValue = +(propOr('0', 'value', to) as string);

  const isGreaterThanBalance =
    FixedPointMath.toNumber(
      coinsMap[from.type]?.balance ?? ZERO_BIG_NUMBER,
      from.decimals
    ) < Number(fromValue);

  const hasAtLeastOneMove =
    isAptos(from.type) &&
    FixedPointMath.toNumber(
      coinsMap[from.type]?.balance.minus(BigNumber(100000000)) ??
        ZERO_BIG_NUMBER,
      from.decimals
    ) < Number(fromValue);

  useEffect(() => {
    setValue(
      'readyToSwap',
      !(error && fromValue > 0) &&
        !(error && toValue > 0) &&
        !isFetchingSwapAmount &&
        !(!!fromValue && !isFetchingSwapAmount) &&
        !(propOr('', 'type', from) === propOr('', 'type', to))
    );
  }, [error, fromValue, toValue, isFetchingSwapAmount, from, to]);

  useEffect(() => {
    if (isFetchingSwapAmount && !toastState) setToastState(true);
  }, [isFetchingSwapAmount]);

  useEffect(() => {
    if (toastState) {
      setValue('swapping', true);
      toast.loading('Fetching prices');
    }
  }, [toastState]);

  useEffect(() => {
    if (!isFetchingSwapAmount && toastState) {
      setValue('swapping', false);
      setToastState(false);
      toast.dismiss();
    }
  }, [isFetchingSwapAmount]);

  useEffect(() => {
    if (!from?.type || !to?.type) return;

    if (swapping) return;

    if (hasNoMarket) {
      setValue('error', SwapMessagesEnum.noMarket);
      return;
    }

    if (from?.type == to?.type) {
      setValue('error', SwapMessagesEnum.sameCoin);
      return;
    }

    if (hasAtLeastOneMove) {
      setValue('error', SwapMessagesEnum.leastOneMove);
      return;
    }

    if (isGreaterThanBalance) {
      setValue('error', SwapMessagesEnum.greaterThanBalance);
      return;
    }

    setValue('error', null);
  }, [error, from, to, hasNoMarket]);

  return null;
};
