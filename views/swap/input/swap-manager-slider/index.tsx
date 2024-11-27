import { Box } from '@interest-protocol/ui-kit';
import dynamic from 'next/dynamic';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { FixedPointMath } from '@/lib';
import { useCoins } from '@/lib/coins-manager/coins-manager.hooks';
import { isAptos, ZERO_BIG_NUMBER } from '@/utils';

const Slider = dynamic(
  import('@interest-protocol/ui-kit').then(({ Slider }) => Slider),
  { ssr: false }
);

const SwapFormFieldSlider: FC = () => {
  const { coinsMap } = useCoins();
  const { control, setValue, getValues } = useFormContext();

  useWatch({ control, name: 'slider' });

  const type = useWatch({ control, name: 'from.type' });
  const swapping = useWatch({ control, name: 'swapping' });

  const safeRemoval =
    type && isAptos(type)
      ? FixedPointMath.toBigNumber(1, getValues('from.decimals'))
      : ZERO_BIG_NUMBER;

  const balance = coinsMap[type]
    ? coinsMap[type].balance.gt(safeRemoval)
      ? coinsMap[type].balance.minus(safeRemoval)
      : ZERO_BIG_NUMBER
    : ZERO_BIG_NUMBER;

  const fromValue = getValues('from.value') ?? ZERO_BIG_NUMBER;

  const initial =
    fromValue &&
    balance.gt(ZERO_BIG_NUMBER) &&
    Number(fromValue) &&
    !balance.isZero?.()
      ? balance.gt(
          FixedPointMath.toBigNumber(fromValue, coinsMap[type]?.decimals)
        )
        ? +FixedPointMath.toBigNumber(
            Number(fromValue) * 100,
            coinsMap[type]?.decimals
          )
            .div(balance)
            .decimalPlaces(0, 1)
            .toString()
        : 100
      : 0;

  const handleSliderChange = (value: number) => {
    if (!balance || balance.lte(ZERO_BIG_NUMBER)) return;

    const valueBN = balance.times(value / 100);
    setValue('from.valueBN', valueBN);
    setValue(
      'from.value',
      String(FixedPointMath.toNumber(valueBN, coinsMap[type]?.decimals))
    );

    setValue('focus', false);
  };

  return (
    <Box mx="s">
      <Slider
        min={0}
        max={100}
        initial={initial}
        disabled={!balance || balance.isZero?.() || swapping}
        onChange={handleSliderChange}
      />
    </Box>
  );
};

export default SwapFormFieldSlider;
