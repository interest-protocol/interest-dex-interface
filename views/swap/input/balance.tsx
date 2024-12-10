import {
  Box,
  Button,
  ProgressIndicator,
  Typography,
} from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import SubtractBox from '@/components/svg/subtract-box';
import { FixedPointMath } from '@/lib';
import { useCoins } from '@/lib/coins-manager/coins-manager.hooks';
import { isAptos, ZERO_BIG_NUMBER } from '@/utils';

import { InputProps } from './input.types';

const Balance: FC<InputProps> = ({ label }) => {
  const { coinsMap, loading } = useCoins();
  const { control, setValue, getValues } = useFormContext();

  const type = useWatch({ control, name: `${label}.type` });
  const symbol = useWatch({ control, name: `${label}.symbol` });
  const decimals = useWatch({ control, name: `${label}.decimals` });

  if (!type)
    return (
      <Box
        p="2xs"
        gap="0.5rem"
        display="flex"
        color="outline"
        alignItems="center"
      >
        <Box width="1rem" height="1rem">
          <SubtractBox
            maxHeight="100%"
            maxWidth="100%"
            width="100%"
            height="100%"
          />
        </Box>
        <Typography size="small" variant="body" fontSize="s">
          0
        </Typography>
      </Box>
    );

  const balance = coinsMap[type]?.balance ?? ZERO_BIG_NUMBER;

  const handleMax = () => {
    if (label === 'to') return;

    const value = balance.minus(
      FixedPointMath.toBigNumber(isAptos(type) ? 1 : 0)
    );

    if (isAptos(type) && !value.isPositive()) {
      setValue('from.valueBN', ZERO_BIG_NUMBER);
      setValue('from.value', '0');
      return;
    }

    if (getValues('focus')) setValue('focus', false);

    setValue('slider', {});

    setValue(
      `${label}.value`,
      FixedPointMath.toNumber(value, decimals).toString()
    );

    setValue('focus', false);

    setValue(`${label}.valueBN`, value);
  };

  if (label === 'to')
    return (
      <Box display="flex" gap="xs">
        <Box display={['none', 'block']} width="1rem" height="1rem">
          <SubtractBox
            maxHeight="100%"
            maxWidth="100%"
            width="100%"
            height="100%"
          />
        </Box>
        <Typography
          size="small"
          fontSize="s"
          variant="body"
          whiteSpace="nowrap"
        >
          {symbol
            ? `${FixedPointMath.toNumber(balance, decimals).toString()} ${symbol}`
            : '0'}
        </Typography>
        {loading && (
          <Box
            mx="xs"
            mt="-1.7rem"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Box position="absolute" justifySelf="flex-end">
              <ProgressIndicator variant="loading" size={12} />
            </Box>
          </Box>
        )}
      </Box>
    );

  return (
    <Button
      p="2xs"
      gap="0.5rem"
      color="outline"
      variant="outline"
      alignItems="center"
      onClick={handleMax}
      borderColor="transparent"
      nHover={{ bg: 'unset', borderColor: 'primary' }}
    >
      <Box display={['none', 'block']} width="1rem" height="1rem">
        <SubtractBox
          maxHeight="100%"
          maxWidth="100%"
          width="100%"
          height="100%"
        />
      </Box>
      <Typography size="small" variant="body" fontSize="s" whiteSpace="nowrap">
        {symbol
          ? `${FixedPointMath.toNumber(balance, decimals).toString()} ${symbol}`
          : '0'}
      </Typography>
      {loading && (
        <Box
          mx="xs"
          mt="-1.2rem"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Box position="absolute" justifySelf="flex-end">
            <ProgressIndicator variant="loading" size={12} />
          </Box>
        </Box>
      )}
    </Button>
  );
};

export default Balance;
